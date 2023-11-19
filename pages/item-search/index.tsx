import { useRouter } from "next/router";
import Head from "next/head";
import React, { DependencyList, MouseEventHandler, useEffect, useRef, useState } from "react";
import { authGlobalInitiate } from "../../globals/auth/functions/authGlobalInitiate";
import { useAuthGlobalDispatch } from "../../globals/auth/authHooks";
import useAuth from "../../hooks/auth/useAuth";
import { SampleProfileGalleryImages } from "../../components/images/gallery/SampleProfileGalleryImages";
import { DesigneraTitleLarge } from "../../assets/svg/DesigneraTitleLarge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCircleDown,
    faHeart,
    faSearch,
    faWandMagicSparkles,
    faTag
} from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components/header/Header";
import ReactCrop, { centerCrop, convertToPixelCrop, type Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import { useAxios } from "../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import Gallery from "react-photo-gallery";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GetMeta } from "../../constants/GetMeta";
import zIndex from "@mui/material/styles/zIndex";
import { kMaxLength } from "buffer";
import { color } from "@chakra-ui/react";

const TO_RADIANS = Math.PI / 180

const MOCK_DATA = [
    {
        "position": 1,
        "title": "Homy Grigio Reading Chair Living Room Chairs Accent Chairs Set of 2 & 1 for Living Room Modern Teen Chairs for Bedroom Comfy Lounge Chairs Side Arm",
        "link": "https://www.amazon.com/Homy-Grigio-Leather-Chairs-Bedroom/dp/B0BLXM8ZL5",
        "source": "Amazon.com",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRm4oMDPHDSWBDQhB5-csYIdmVde_ZfnfUYnfzlJJ9w7zjXG34H4SL9TXI2H8XWInsqPagyhBQjtImrHgLv9Bwvw_d2JvfjMfz3ox9yR82MKQ7yrQ",
        "price": {
            "value": "$59.99*",
            "extracted_value": 59.99,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSgz1u-EUQ-s8aH6UzFMJa_KSJ5F_8WtBKWsCh0lMHXpbXrZ_Mq"
    },
    {
        "position": 2,
        "title": "Westin 5\" W Armchair Joss & Main Leather Type: Black Faux Leather",
        "link": "https://www.wayfair.com/furniture/pdp/joss-main-westin-5-w-armchair-w005272794.html",
        "source": "Wayfair",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcR19kk42D38DZemMrSI_Iso0DE0uvF9UtpF_hhqgTgoTIq4TXlZyRXx0ie27IwIUd5Cm5USqzY-BRMb5JWqUvGZMD039txbp6JmC1OO_x0u9dk_1WE",
        "price": {
            "value": "$729.99*",
            "extracted_value": 729.99,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg5rK2B-Q5ZjAGXkM2VeGOtGPOU6FLqFqRTRY_5i58uQEWKi3S"
    },
    {
        "position": 3,
        "title": "Vail Lounge Chair in Black Leather",
        "link": "https://denvermodern.com/products/vail-lounge-chair",
        "source": "Denver Modern",
        "source_icon": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcSWdMOrIAiElgsqONefZgL4qL0eRuHlNFdTJYvMIxznNzsQanEt40edtsSTfM_1gECHlRnC5g10cACQzNKNQoPwX3ZwqFG2PyOzSPR6tW0PIvmJ86us",
        "price": {
            "value": "$1895.00*",
            "extracted_value": 1895,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTIlaGXpaPefiGkVAHERsTcByFQBFVonibEVvYzAutIi0MkJcWg"
    },
    {
        "position": 4,
        "title": "Alana Upholstered Armchair",
        "link": "https://www.allmodern.com/furniture/pdp/alana-upholstered-armchair-a001058922.html",
        "source": "AllModern",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcQNYEGrZh0hNqTLIZPlF7GbeuxroKLGAY45hNzn5RNij4D44Fz8fcREokkYTEKqyKeoRwuBD8GOKmVjaikznWnTveMg6fTtIOKTztgzB40KottQIrA1pQ",
        "price": {
            "value": "$1470.00*",
            "extracted_value": 1470,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLja8kZKrSfOS0Cb3Bt0cgQO19nzey9oeiqjNTkfWR4L1mYLJd"
    },
    {
        "position": 5,
        "title": "Acme Furniture ACME Oralia Accent Chair, Saturn Top Grain Leather",
        "link": "https://www.bisonoffice.com/acme-oralia-accent-chair-saturn-top-grain-leather/BG3127408/p/?bo=19027",
        "source": "BisonOffice.com",
        "source_icon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTi2qsCslBWyVTshZqRlfRx0guDov_Z44xUTJSlEuq2ps2kSOaZm12Gga24XPTh3trVoG0mHqivOv_JL0ocikl_BBnw3Q-Duok7P1Q2mTD5lfKjBlm91XoF",
        "price": {
            "value": "$1103.10*",
            "extracted_value": 1103.1,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRYmu0E7iuXDilf79WuwW4QuojyzPScwYxobUPRjrm42LiZeqp7"
    },
    {
        "position": 6,
        "title": "Mercana Leonidas Accent Chair in Brown/Black, Contemporary & Modern | Bellacor | 69462",
        "link": "https://www.bellacor.com/productdetail/mercana-69462-leonidas-brown-and-black-accent-chair-2369264.html",
        "source": "Bellacor",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRXwwf-nX9ij865vcssSomxGucjpsQ40EXcXjmhOqqUCngWYQaO1R9mqMM6yFGrDggOH434zb6nnXW1tY4vNo_5J9jpx8i1IMAVa1xPO5pyMsYRjscl",
        "price": {
            "value": "$787.20*",
            "extracted_value": 787.2,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSsvdflenr2HtVImrXx7wn9ME3mXd1bSOwwMD7O_bnM6Ac1cdj"
    },
    {
        "position": 7,
        "title": "Della Chair",
        "link": "https://www.scoutandnimble.com/products/della-chair",
        "source": "Scout & Nimble",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRtcYr8tPTCswDmiUCf5ZbZSKFpSEMgXTF7EcjNseFsrzgRpyL-cBNxjHpPNWwpOrEqtX3yWa1Xim_v5q3XDOhJJkB9ZpuK0NLDJAhjaBdcGeJUcLuoMhLwZr81",
        "price": {
            "value": "$949.00*",
            "extracted_value": 949,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQh0E3itqmCRPqGq2AoUZE9kF60lNn5KGtC9b_9u42x6KLrI12X"
    },
    {
        "position": 8,
        "title": "Palermo Accent Chair",
        "link": "https://www.bassmanblainelaguna.com/categories/18303/occasional-chairs/products/53007527/palermo-accent-chair",
        "source": "Bassman Blaine Laguna Design Center",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcQHHk_Rd7Gt1tVg0YBBvTw1kD1p9HMfCwT0lDX6bCaEd6dmfaEC7cUaKsotm7ADFHWjI_gH3eIaPjeOLbQVfl2Dt4Pp08yGGuCTgyZbvh9J8eArkc_DHDiwJhJrXOVKZdk",
        "price": {
            "value": "$3599.00*",
            "extracted_value": 3599,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrDeCzVr4DbnGeVa5qEoMpApUXIbk0-4dOsUiSNhF6Ggg-fyv"
    },
    {
        "position": 9,
        "title": "Nordic Relax Living Room Chair Single Lounge White Adults Design Living Room Chairs Floor Modern",
        "link": "https://s.click.aliexpress.com/deep_link.htm?aff_short_key=UneMJZVf&dl_target_url=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F3256805699167208.html%3F_randl_currency%3DUSD%26_randl_shipto%3DUS%26src%3Dgoogle",
        "source": "AliExpress",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRi1yREW8HmBeYTRXtsP0KH2bIFXcbDlVLEPCNM46IDGJZtdngQVzL5CeVvkrid7dZ_T6dOzK89j3VieC1AR5zsaKzKOkKVv6DBAPygXKHf7-BWj1Zf1qPjyvoB",
        "price": {
            "value": "$366.06*",
            "extracted_value": 366.06,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKo7bDKlhQS9kEcdxB9FuZmVyi-BP8CR9Sl2WbdqBP0Tz0nTpR"
    },
    {
        "position": 10,
        "title": "FERPIT Ergonomically Upholstered Sling Accent Chair Armchair with Metal Frame and Removeable Seat Cushion",
        "link": "https://us.shein.com/UNIKOME-Ergonomically-Upholstered-Sling-Accent-Chair-Armchair-with-Metal-Frame-and-Removeable-Seat-Cushion-p-18579724-cat-5171.html",
        "source": "Shein",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcT0kK2_PXDSFf1pITZnPBy_gSLnjoBhzeDAyNco5a3oaaNjMmDO7QTmC7vbp5akOpuRFzQDVALPBjWhs9P_jkxzkmvPrEtnyUqFhVHl_PwoopA",
        "price": {
            "value": "$75.89*",
            "extracted_value": 75.89,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTs-6UzkzOKrhM6nqhWg5K9R_Xi8svBWU_WRR-5gBprSEgKW4LI"
    },
    {
        "position": 11,
        "title": "Modern Accent Chair Single Sofa Chair Seat PU Leather&Houndstooth Upholstered",
        "link": "https://www.homary.com/item/modern-accent-chair-single-sofa-chair-seat-pu-leatherhoundstooth-upholstered-27734.html",
        "source": "Homary",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcTNY2F_6pOg2RQXwa4sqOTq9Qf2liOmOk0Sm576PcNmr-lTnKSbNoNh0aSr9BqkwlO6lhnLiuYrVNLYV6UEIlPqjmCiy8tMi1jWX9Gfs1mDjqeItg",
        "price": {
            "value": "$506.99*",
            "extracted_value": 506.99,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSsRMo6_tilN_bGur04hZIHEySqz5lnu1C_D9mRNefENHF8Xa_q"
    },
    {
        "position": 12,
        "title": "Leather Sierra Chair Standard",
        "link": "https://www.crofthouse.com/products/leather-sierra-chair",
        "source": "Croft House",
        "source_icon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcRE7bP0agmjZvjOqh-WmVCT-Y3FGNimXq2pBiJPksFu-xa6hirnwrCSaqCu4cy2uXOsNs-WWcg2Rl1rDsMuXD_nYKA05EuVGIwefH592mqxqS1C0aJKmpM",
        "price": {
            "value": "$2350.00*",
            "extracted_value": 2350,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQtc3lEXmX4osEYMkhYOUd3Nz0JhJrs0zbfJzWSgN6OAz7OWADR"
    },
    {
        "position": 13,
        "title": "Khai Lounge Chair Tan",
        "link": "https://www.modani.com/khai-lounge-chair-tan",
        "source": "Modani Furniture",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRMfGeRFbdl9P6VAWUSGXrZz47bv7udW5-e49TNqe1nVfqeHS72Sla4i5ap3CN7G7Zwr0oQbGPeBNgp0tqYcXom9JHXN41HQcIFOcShIbOGPWKWkg",
        "price": {
            "value": "$890.00*",
            "extracted_value": 890,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-HCc0gnQk7ypd6OV-Orw5FbnSi_mgSyhTr706TQZoVcQV4Pl"
    },
    {
        "position": 14,
        "title": "Common Chair",
        "link": "https://codastudio.com/products/common-chair",
        "source": "CODA Studio",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcSkbypWYpt85LLUrX3Lc2lQoqvx2hK4b19wmluhFSNgSxOiA6GRFTPuvnMBesjCZ9xbWu2zig64SwpI4oBUEB8wZ0JGML4PV2C-tzIyp9hLFXRLqA",
        "price": {
            "value": "$2005.00*",
            "extracted_value": 2005,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRRBkPRaLT59L4Cw66tFaVCaqQ-hl4muETjhXZ1eCz8VOICPYA2"
    },
    {
        "position": 15,
        "title": "Palermo Accent Chair MX - Rug & Home Chestnut",
        "link": "https://rugandhome.com/products/palermo-accent-chair-mx",
        "source": "Rug & Home",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRRIQuGqtS2wuYKfyZ4pqDseBOHokY_z-yP7D0eMWh5mfQQNDK7GM79M35a-WS17kby_rQVCRDemuCkEmruqpaFnjZh0p6-iVPOWmxePzN8F2KRCg",
        "price": {
            "value": "$2099.37*",
            "extracted_value": 2099.37,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmHO-vNZ8iuFWGmtd8xA5pr_nxBtpxUP5x3RwZdvcr6Bmm_MW"
    },
    {
        "position": 16,
        "title": "Denver Modern",
        "link": "https://www.kcidy.com/denver-modern",
        "source": "kcidy design",
        "source_icon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcRjMqsgSrCf2FWZMVT9mrLFLUVuce3GVPlmhDl6BvSBPmM5aPakUOpVhJb7cM-gwC-qB7cIAo-aVzJ-aPTAOUkvaZhC73WN2krEPh5zzWBtyOx-",
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ9PUlyFdhaIh2jziLmUVLdoQB5je54sjsratAIK-GWbtwW95Dy"
    },
    {
        "position": 17,
        "title": "Shop Denver Modern Vail Lounge Chair, Black Leather (VLL-LR01-LR03-3WT-000) | FloorFound.store",
        "link": "https://floorfound.store/vail-lounge-chair-black-leather-vll-lr01-lr03-3wt-000/",
        "source": "FloorFound.store",
        "source_icon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcRnVA50F7BHvcDZ7sJZb1aXp24nEfL6wasJlBKbZjEVFCPUrq6urnQohrxocbRAFxiI3iTvY2pgIZYZ4y-2bsmzTgmPWmSREa0G8rmrz9289Ge2paGl",
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT6AG5xPakIMsQgTrXnuCk40FtfUPLaUeorUMZKGtvDBZyxM9na"
    },
    {
        "position": 18,
        "title": "Sleek Minimalist Chair - Metal - Wood - Yellow - Beige - 5 Colors",
        "link": "https://www.theapollobox.com/product/sku2898104/sleek-minimalist-chair--metal--wood--yellow--beige--5-colors",
        "source": "Apollo Box",
        "source_icon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcT4DqfcKfgj02yFIZoE6U_AsQ5-sXgxqcDqij-zLQSu0-HdbZWDEzuzImYZAun8C4R0FwrQwEel1LRPUfLX8KOQqqbGlP6Iqwsq-BsRuRz_jmnqwKPJlEp2BQ",
        "price": {
            "value": "$446.97*",
            "extracted_value": 446.97,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ULvl4bP_6CFXQamVP8cKJKnKUY5EJ5xszhx9SPfWnlgxx1L2"
    },
    {
        "position": 19,
        "title": "Taryn Chair - Palermo Drift - Four Hands",
        "link": "https://www.artesanosdesign.com/products/taryn-chair-palermo-drift",
        "source": "Artesanos Design Collection",
        "source_icon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcSkiIbIlC-yhylgS2MmoINE3UwdzYZLq1FpI_zXMQgUZZRMjqV1IsGJZHydqIcF-MYyIUxAPKiq1yMHFyjq9IQVRkzFKb1nGCGzaLJU80EtzrmggqyPvaHNoDfhIg",
        "price": {
            "value": "$1599.20*",
            "extracted_value": 1599.2,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ6dztaTlooC1ZIAX7qpeGe0eEEDk03tW7_svA0dl6gv-JQ0HmI"
    },
    {
        "position": 20,
        "title": "Kenton Genuine Leather Occasional Chair in Cognac",
        "link": "https://barbersinteriors.com/en-us/products/kenton-genuine-leather-occasional-chair-in-cognac",
        "source": "Barbers Interiors",
        "source_icon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTNzghenV7AtVLNEIVxOcewieBQW4wPoVoCFDkz692IY1ZN9UQoTktsHC5irU9xgsQaKp2pggDNZ_7928yWD3f8HYAffQTnn9Rf1TctZoaO7S2dvGZ8V1bm2Q",
        "price": {
            "value": "$1135.00*",
            "extracted_value": 1135,
            "currency": "$"
        },
        "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTvZSvnzpdvRP-oyCAVKRzUWjB0gMO6862ajE3utmmlq1HA6oET"
    }
]


export default function ItemSearch() {
    const router = useRouter()
    const dispatch = useAuthGlobalDispatch()
    const { userData } = useAuth()
    const { POST } = useAxios()
    const [profileGalleryTab, setProfileGalleryTab] = useState({
        tab: "Images",
        trigger: Date.now()
    })
    const [selectedPhoto, setSelectedPhoto] = useState({} as any);
    const [results, setResults] = useState([] as any);
    const [images, setImages] = useState([] as any);
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [boundingBoxes, setBoundingBoxes] = useState([] as any);
    const [currentDimensions, setCurrentDimensions] = useState({} as { width: number, height: number });

    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
    const calculateColumns = (containerWidth: number) => {
        if (containerWidth < 600) {
            return 2;
        } else if (containerWidth < 900) {
            return 3;
        } else if (containerWidth < 1200) {
            return 4;
        } else {
            return 5;
        }
    };

    useEffect(() => {
        let tempProfileGalleryTab = profileGalleryTab
        tempProfileGalleryTab.trigger = Date.now()
        setProfileGalleryTab({ ...tempProfileGalleryTab })
    }, [userData]);

    useEffect(() => {
        if (!localStorage.getItem('token')) router.push("/")
        dispatch(authGlobalInitiate({}))
    }, []);

    useEffect(() => {
        async function formatImages() {
            let data = []
            for await (let image of images) {
                let photo = await GetMeta(image.thumbnail) as HTMLImageElement
                data.push({
                    src: image.thumbnail,
                    width: photo.width,
                    height: photo.height,
                    data: {
                        ...image
                    }
                })
            }

            setResults([...data])
        }

        formatImages()
    }, [images])

    function changeTab(tab: string) {
        let tempProfileGalleryTab = profileGalleryTab
        tempProfileGalleryTab.tab = tab
        setProfileGalleryTab({ ...tempProfileGalleryTab })
    }

    function selectPhoto(photo: any) {
        setSelectedPhoto(photo)
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    async function imageSearch() {
        if (!previewCanvasRef.current) {
            toast.error('Crop canvas does not exist.')
        }

        previewCanvasRef.current?.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }

            let formData = new FormData()
            formData.append("file", blob)

            setIsSearching(true)
            const data = await POST("image/search-item", formData)
            // const data = MOCK_DATA
            // await new Promise(resolve => setTimeout(resolve, 500))
            setImages(data);
            setIsSearching(false)
        })
    }

    async function detectObjects() {
        const labels = await POST(`image/detect-labels/${selectedPhoto.data.id}`, {})
        // const labels = [
        //     {
        //         "name": "Plant",
        //         "boundingBox": {
        //             "height": 0.1949595808982849,
        //             "width": 0.13668596744537354,
        //             "left": 0.07165519148111343,
        //             "top": 0.3522094190120697
        //         }
        //     },
        //     {
        //         "name": "Plant",
        //         "boundingBox": {
        //             "height": 0.18720218539237976,
        //             "width": 0.06649597734212875,
        //             "left": 0.4434480369091034,
        //             "top": 0.48148664832115173
        //         }
        //     },
        //     {
        //         "name": "Chair",
        //         "boundingBox": {
        //             "height": 0.29730817675590515,
        //             "width": 0.14473582804203033,
        //             "left": 0.000007279028523043962,
        //             "top": 0.513412356376648
        //         }
        //     },
        //     {
        //         "name": "Chair",
        //         "boundingBox": {
        //             "height": 0.25633299350738525,
        //             "width": 0.13786061108112335,
        //             "left": 0.30423620343208313,
        //             "top": 0.44493961334228516
        //         }
        //     }
        // ]
        let data = [] as any;

        for await (let item of labels as any[]) {
            let dataObject = {
                name: item.name,
                boundingBox: {} as any
            }

            Object.keys(item.boundingBox).forEach((key, i) => {
                dataObject.boundingBox[key] = ["top", "height"].includes(key) ? imgRef.current?.height as number * item.boundingBox[key] : imgRef.current?.width as number * item.boundingBox[key]
            })

            data.push(dataObject)
        }

        setBoundingBoxes(data.sort(
            (a: any, b: any) => ((
                (b.boundingBox["height"] * b.boundingBox["width"]) -
                (a.boundingBox["height"] * a.boundingBox["width"])
            ))
        ).map((v: any, index: number) => {
            v.zIndex = index
            return v;
        }))
    }

    useEffect(() => {
        if (Object.keys(selectedPhoto).length < 1) return;

        async function photoSelection() {
            await new Promise((r) => setTimeout(r, 500))
            setCurrentDimensions({
                height: imgRef.current?.height as number,
                width: imgRef.current?.width as number
            })

            let data = [] as any

            for await (let item of selectedPhoto.data.detectedItems) {
                let dataObject = {
                    name: item.name,
                    boundingBox: {} as any
                }

                Object.keys(item.boundingBox).forEach((key, i) => {
                    dataObject.boundingBox[key] = ["top", "height"].includes(key) ? imgRef.current?.height as number * item.boundingBox[key] : imgRef.current?.width as number * item.boundingBox[key]
                })

                data.push(dataObject)
            }

            setBoundingBoxes(data.sort(
                (a: any, b: any) => ((
                    (b.boundingBox["height"] * b.boundingBox["width"]) -
                    (a.boundingBox["height"] * a.boundingBox["width"])
                ))
            ).map((v: any, index: number) => {
                v.zIndex = index
                return v;
            }))
        }

        photoSelection()
    }, [selectedPhoto])


    const onClickImage = (zIndex: number) => {
        setActiveImageIndex(zIndex)
    }

    return (
        <main className="flex flex-col lg:flex-row bg-[#2a2a2a] overflow-hidden">
            <Head>
                <title>Designera | Create AI-Powered Design Ideas in Seconds</title>
                <meta name="description"
                    content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://designera.app/" />
                <meta property="og:title"
                    content="Designera | Create AI-Powered Design Ideas in Seconds" />
                <meta property="og:description"
                    content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you." />
                <meta property="og:image"
                    content="/assets/site/icon.png"></meta>
                <link rel="shortcut icon" href="/assets/site/favicon.ico" />
                <meta name="theme-color" content="#FF9900" />
            </Head>
            <Header />
            <div className={"flex flex-col w-full lg:w-1/3"}>
                <div className={"h-screen flex pt-12"}>
                    <div className={"flex flex-col items-center pl-5 pt-4 pb-5 pr-2"}
                    style={{
                        minWidth: 375,
                    }}
                    >
                        <div
                            className={"w-full flex flex-col gap-2 bg-[#212121] designera-rounded text-white"}
                        >
                            <div className="flex p-3 justify-between items-center">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        router.push("/");
                                    }}
                                >
                                    <button className="p-2 block bg-[#5D5D5D] rounded-full">
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            color="#D9D9D9"
                                            size="xl"
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </button>
                                </div>
                                <div className="group-items center-div text-[#979797] text-xl">
                                    <span>Where to buy?</span>
                                </div>
                                <div className="flex gap-2">
                                    {Object.keys(selectedPhoto).length > 0 && !selectedPhoto?.data?.hasDetectedLabels
                                        // </div>&& (
                                        //<button
                                        //    onClick={() => detectObjects()}
                                        //    className="p-2 bg-[#5D5D5D] rounded-full text-sm"
                                        //>
                                        //</div>    Detect Objects
                                        //</button>
                                        //)
                                    }
                                    <button
                                        onClick={() => imageSearch()}
                                        className="p-2.5 bg-[#5D5D5D] rounded-full flex justify-center items-center"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            color="#D9D9D9"
                                            style={{
                                                width: 18,
                                                height: 18,
                                                color: "#D9D9D9",
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"w-full flex flex-col p-3 bg-[#212121]"}
                            style={{
                                overflow: 'visible',
                                padding: '10px',
                                margin: '-10px',
                            }}>
                            <div className="flex justify-center items-center" style={{ minHeight: 60 }}>
                                {selectedPhoto?.src ? (
                                    <ReactCrop
                                        className="ReactCrop--no-animate ReactCrop--circular-crop designera-rounded-3"
                                        crop={crop}
                                        maxWidth={500}
                                        maxHeight={500}
                                        minHeight={40}
                                        minWidth={40}
                                        onChange={(_, percentCrop) => setCrop(_)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                    >
                                        <div>
                                            <div className={"absolute select-none"} style={{
                                                width: currentDimensions.width,
                                                height: currentDimensions.height,
                                            }}>{
                                                    boundingBoxes.map((v: any, i: number) => {
                                                        // console.log(v)
                                                        return (
                                                            <>
                                                                <ReactTooltip
                                                                    anchorId={String(i)}
                                                                    place="top"
                                                                    content={v.name}
                                                                    delayShow={500}
                                                                />
                                                                <div
                                                                //    id={String(i)}
                                                                //    key={i}
                                                                //    className={"absolute"}
                                                                //    style={{
                                                                //        top: v.boundingBox.top,
                                                                //        left: v.boundingBox.left,
                                                                //        height: v.boundingBox.height,
                                                                //        width: v.boundingBox.width,
                                                                //        pointerEvents: activeImageIndex === v.zIndex ? "none" : "auto", // Disable pointer events when active
                                                                //        zIndex: activeImageIndex === v.zIndex ? v.zIndex : "auto", // Apply zIndex when active
                                                                //        border: activeImageIndex === v.zIndex ? "2px solid rgba(255, 255, 255, 0.6)" : "none", // Apply border when active
                                                                //        borderRadius: activeImageIndex === v.zIndex ? 5 : 0, // Apply border-radius when active
                                                                //        transformOrigin: "center", // Set the transform origin to the center
                                                                //        transform: activeImageIndex === v.zIndex ? "scale(1)" : "scale(0.8)", // Apply initial scale (adjust as needed)
                                                                //        transition: "transform 0.3s ease-in-out", // Add a transition for smooth animation
                                                                //   }}
                                                                ></div>
                                                                <div
                                                                    onClick={() => onClickImage(v.zIndex)}
                                                                    style={{
                                                                        left: v.boundingBox.left + v.boundingBox.width / 2 - (15 / 2),
                                                                        top: v.boundingBox.top + v.boundingBox.height / 2 - (15 / 2),
                                                                        width: '15px',
                                                                        height: '15px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: 'white',
                                                                        zIndex: v.zIndex,
                                                                        opacity: 0.85,
                                                                        outline: '6px solid rgba(255, 255, 255, 0.25)',
                                                                        animation: 'pulse 2s ease',

                                                                    }}
                                                                    className={'absolute cursor-pointer'}
                                                                />
                                                            </>
                                                        )
                                                    })
                                                }</div>
                                            <img crossOrigin="anonymous" ref={imgRef}
                                                className={"block object-cover"}
                                                src={selectedPhoto?.src} alt={"cropImage"} />
                                        </div>
                                    </ReactCrop>
                                ) : (
                                    <div>
                                        <p style={{ color: 'white' }}>Select an Image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={"h-full w-full pt-2 designera-rounded bg-[#1d1d1d]"}>
                            <div className={"flex flex-row justify-center items-center gap-4"}>
                                <span className={"cursor-pointer font-semibold"}
                                    style={{ color: profileGalleryTab.tab == "Images" ? "white" : "#333333" }}
                                    onClick={() => {
                                        changeTab("Images")
                                    }}>
                                    Images
                                </span>
                                <span className={"cursor-pointer font-semibold"}
                                    style={{ color: profileGalleryTab.tab == "Likes" ? "white" : "#333333" }}
                                    onClick={() => {
                                        changeTab("Likes")
                                    }}>
                                    Likes
                                </span>
                                <span className={"cursor-pointer font-semibold"}
                                    style={{ color: profileGalleryTab.tab == "Publishes" ? "white" : "#333333" }}
                                    onClick={() => {
                                        changeTab("Publishes")
                                    }}>
                                    Publishes
                                </span>
                            </div>
                            <hr className={"bg-stone-400 border-none h-[1px]"} />
                            <div className="pb-2"></div>
                            <div className={"flex flex-row flex-wrap p-2 pt-0 gap-2 justify-left"}
                                style={{
                                    minHeight: 80,
                                    maxHeight: 1080,
                                }}>
                                <SampleProfileGalleryImages tab={profileGalleryTab.tab}
                                    trigger={profileGalleryTab.trigger} large
                                    onClick={selectPhoto} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col w-full lg:w-2/3 pl-5 pt-16 pb-5 pr-5"}>
                {isSearching && (
                    <div
                        className={'animate-pulse w-full h-screen grid grid-cols-5 gap-8'}>
                        {[...Array(20)].map((v, i) => (
                            <div key={i}
                                className={`w-full h-full odd:bg-neutral-700 bg-neutral-700 rounded-xl`}></div>
                        ))}
                    </div>
                )}
                {results.length > 0 && (
                    <Gallery
                        photos={results}
                        direction={"column"}
                        margin={12}
                        columns={calculateColumns}
                        renderImage={({ index, left, top, photo }) => (
                            <div
                                onClick={() => {
                                    console.log(photo.src);
                                    window.open(results[index].data.link, '_blank');
                                }}
                                className={"cursor-pointer group/bg"}
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: left,
                                    top: top,
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    height: photo.height,
                                    width: photo.width
                                }}
                            >
                                <div className={'w-full h-full'}>
                                    <img src={photo.src}
                                        className={'w-full h-full object-cover transition-transform group-hover/bg:scale-110 duration-500'}
                                        alt={results[index].data.title} />
                                </div>
                                {
                                    results[index].data.price && (
                                        <div
                                            className={'absolute top-3 left-3 rounded-xl bg-black group/price hover:bg-white transition-colors duration-300'}>
                                            <div className={'flex flex-row items-center gap-x-1 px-2 py-1'}>
                                                <FontAwesomeIcon icon={faTag}
                                                    className={'w-4 h-4 text-white group-hover/price:text-black transition-colors duration-300'} />
                                                <p className={'text-white text-xs transition-colors duration-300 group-hover/price:text-black'}>{results[index].data?.price.value}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div
                                    className={'flex flex-row gap-x-2 px-4 justify-between items-center w-full min-h-[3rem] bg-white absolute bottom-0 '}>
                                    <img src={results[index].data?.source_icon ?? ''}
                                        className={'flex-shrink-0 w-5 h-5'} />
                                    <p className={"flex-1 text-center line-clamp-2 text-xs"}>{results[index].data.title}</p>
                                </div>
                            </div>
                        )}
                    />
                )}
            </div>

            <Toaster containerStyle={{ zIndex: 999999 }}
                toastOptions={{ style: { backgroundColor: "#2b2b2b", color: "#fff" } }} />

            <div className={"h-0 w-0"}>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: completedCrop?.width,
                        height: completedCrop?.height,
                    }}
                />
            </div>
        </main >
    );
}

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList,
) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps as any)
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
    }, deps)
}

export async function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
) {
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    const rotateRads = rotate * TO_RADIANS
    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2

    ctx.save()

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY)
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
    // 3) Rotate around the origin
    ctx.rotate(rotateRads)
    // 2) Scale the image
    ctx.scale(scale, scale)
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    )

    ctx.restore()
}
