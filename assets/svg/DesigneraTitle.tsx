import React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface SVGElement extends ReactProps {
    height?: number;
    width?: number;
}

export const DesigneraTitle = ({children, width, height, ...props}: SVGElement) => {
    return (
        (
            <svg width={width ? width.toString() : "63"} height={height ? height.toString() : "13"}
                 viewBox={`0 0 ${width ? width.toString() : "63"} ${height ? height.toString() : "13"}`} fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.875 0.899999C5.499 0.899999 6.05367 1.017 6.539 1.251C7.02433 1.485 7.43167 1.81433 7.761 2.239C8.099 2.655 8.35033 3.14033 8.515 3.695C8.68833 4.241 8.775 4.826 8.775 5.45C8.775 6.29067 8.62333 7.05767 8.32 7.751C8.01667 8.43567 7.57467 8.98167 6.994 9.389C6.422 9.79633 5.71567 10 4.875 10H1.768C1.54267 10 1.352 9.92633 1.196 9.779C1.04867 9.623 0.975 9.43233 0.975 9.207V1.693C0.975 1.46767 1.04867 1.28133 1.196 1.134C1.352 0.977999 1.54267 0.899999 1.768 0.899999H4.875ZM4.745 8.505C5.291 8.505 5.73733 8.36633 6.084 8.089C6.43067 7.803 6.682 7.43033 6.838 6.971C7.00267 6.503 7.085 5.996 7.085 5.45C7.085 5.04267 7.03733 4.657 6.942 4.293C6.85533 3.92033 6.71667 3.59533 6.526 3.318C6.33533 3.032 6.09267 2.80667 5.798 2.642C5.50333 2.47733 5.15233 2.395 4.745 2.395H2.47L2.6 2.278V8.648L2.522 8.505H4.745ZM13.5155 10.13C12.7789 10.13 12.1375 9.97833 11.5915 9.675C11.0542 9.363 10.6382 8.94267 10.3435 8.414C10.0575 7.88533 9.91453 7.28733 9.91453 6.62C9.91453 5.84 10.0705 5.177 10.3825 4.631C10.7032 4.07633 11.1192 3.65167 11.6305 3.357C12.1419 3.06233 12.6835 2.915 13.2555 2.915C13.6975 2.915 14.1135 3.006 14.5035 3.188C14.9022 3.37 15.2532 3.62133 15.5565 3.942C15.8599 4.254 16.0982 4.618 16.2715 5.034C16.4535 5.45 16.5445 5.892 16.5445 6.36C16.5359 6.568 16.4535 6.737 16.2975 6.867C16.1415 6.997 15.9595 7.062 15.7515 7.062H10.7855L10.3955 5.762H15.1665L14.8805 6.022V5.671C14.8632 5.41967 14.7722 5.19433 14.6075 4.995C14.4515 4.79567 14.2522 4.63967 14.0095 4.527C13.7755 4.40567 13.5242 4.345 13.2555 4.345C12.9955 4.345 12.7529 4.37967 12.5275 4.449C12.3022 4.51833 12.1072 4.63533 11.9425 4.8C11.7779 4.96467 11.6479 5.18567 11.5525 5.463C11.4572 5.74033 11.4095 6.09133 11.4095 6.516C11.4095 6.984 11.5049 7.38267 11.6955 7.712C11.8949 8.03267 12.1462 8.27967 12.4495 8.453C12.7615 8.61767 13.0909 8.7 13.4375 8.7C13.7582 8.7 14.0139 8.674 14.2045 8.622C14.3952 8.57 14.5469 8.50933 14.6595 8.44C14.7809 8.362 14.8892 8.297 14.9845 8.245C15.1405 8.167 15.2879 8.128 15.4265 8.128C15.6172 8.128 15.7732 8.193 15.8945 8.323C16.0245 8.453 16.0895 8.60467 16.0895 8.778C16.0895 9.012 15.9682 9.22433 15.7255 9.415C15.5002 9.60567 15.1839 9.77467 14.7765 9.922C14.3692 10.0607 13.9489 10.13 13.5155 10.13ZM17.5045 8.921C17.4178 8.79967 17.3788 8.64367 17.3875 8.453C17.3962 8.26233 17.5088 8.09767 17.7255 7.959C17.8642 7.87233 18.0115 7.83767 18.1675 7.855C18.3235 7.86367 18.4752 7.94167 18.6225 8.089C18.8738 8.34033 19.1382 8.53533 19.4155 8.674C19.6928 8.81267 20.0395 8.882 20.4555 8.882C20.5855 8.87333 20.7285 8.856 20.8845 8.83C21.0405 8.79533 21.1748 8.726 21.2875 8.622C21.4088 8.50933 21.4695 8.34033 21.4695 8.115C21.4695 7.92433 21.4045 7.77267 21.2745 7.66C21.1445 7.54733 20.9712 7.452 20.7545 7.374C20.5465 7.296 20.3125 7.22233 20.0525 7.153C19.7838 7.075 19.5065 6.98833 19.2205 6.893C18.9432 6.79767 18.6875 6.67633 18.4535 6.529C18.2195 6.373 18.0288 6.16933 17.8815 5.918C17.7342 5.66667 17.6605 5.35033 17.6605 4.969C17.6605 4.53567 17.7818 4.16733 18.0245 3.864C18.2672 3.56067 18.5792 3.32667 18.9605 3.162C19.3505 2.99733 19.7578 2.915 20.1825 2.915C20.4512 2.915 20.7328 2.94967 21.0275 3.019C21.3222 3.07967 21.6038 3.18367 21.8725 3.331C22.1412 3.46967 22.3665 3.656 22.5485 3.89C22.6438 4.02 22.7002 4.176 22.7175 4.358C22.7348 4.54 22.6525 4.70467 22.4705 4.852C22.3405 4.956 22.1888 5.00367 22.0155 4.995C21.8422 4.97767 21.6992 4.917 21.5865 4.813C21.4392 4.62233 21.2398 4.47067 20.9885 4.358C20.7458 4.24533 20.4642 4.189 20.1435 4.189C20.0135 4.189 19.8705 4.20633 19.7145 4.241C19.5672 4.267 19.4372 4.332 19.3245 4.436C19.2118 4.53133 19.1555 4.68733 19.1555 4.904C19.1555 5.10333 19.2205 5.26367 19.3505 5.385C19.4805 5.49767 19.6538 5.593 19.8705 5.671C20.0958 5.74033 20.3342 5.80967 20.5855 5.879C20.8455 5.94833 21.1098 6.03067 21.3785 6.126C21.6472 6.22133 21.8942 6.347 22.1195 6.503C22.3448 6.659 22.5268 6.86267 22.6655 7.114C22.8042 7.35667 22.8735 7.66867 22.8735 8.05C22.8735 8.492 22.7435 8.869 22.4835 9.181C22.2235 9.493 21.8985 9.73133 21.5085 9.896C21.1185 10.052 20.7198 10.13 20.3125 10.13C19.8012 10.13 19.2898 10.0433 18.7785 9.87C18.2672 9.688 17.8425 9.37167 17.5045 8.921ZM25.648 9.207C25.648 9.43233 25.5743 9.623 25.427 9.779C25.2797 9.92633 25.0933 10 24.868 10C24.6427 10 24.4563 9.92633 24.309 9.779C24.1617 9.623 24.088 9.43233 24.088 9.207V3.838C24.088 3.61267 24.1617 3.42633 24.309 3.279C24.4563 3.123 24.6427 3.045 24.868 3.045C25.0933 3.045 25.2797 3.123 25.427 3.279C25.5743 3.42633 25.648 3.61267 25.648 3.838V9.207ZM24.855 2.2C24.5603 2.2 24.3523 2.15233 24.231 2.057C24.1097 1.96167 24.049 1.79267 24.049 1.55V1.303C24.049 1.05167 24.114 0.882667 24.244 0.796C24.3827 0.700666 24.5907 0.652999 24.868 0.652999C25.1713 0.652999 25.3837 0.700666 25.505 0.796C25.6263 0.891333 25.687 1.06033 25.687 1.303V1.55C25.687 1.80133 25.622 1.97467 25.492 2.07C25.362 2.15667 25.1497 2.2 24.855 2.2ZM30.1373 2.915C30.5013 2.915 30.8349 2.97133 31.1383 3.084C31.4416 3.19667 31.7016 3.33967 31.9183 3.513C32.1436 3.68633 32.3169 3.864 32.4383 4.046C32.5683 4.21933 32.6333 4.36667 32.6333 4.488L32.2953 4.657V3.708C32.2953 3.48267 32.3689 3.29633 32.5163 3.149C32.6636 2.993 32.8499 2.915 33.0753 2.915C33.3006 2.915 33.4869 2.98867 33.6343 3.136C33.7816 3.28333 33.8553 3.474 33.8553 3.708V9.493C33.8553 10.247 33.6906 10.8493 33.3613 11.3C33.0406 11.7593 32.6159 12.0887 32.0873 12.288C31.5586 12.496 30.9909 12.6 30.3843 12.6C30.2109 12.6 29.9856 12.5783 29.7083 12.535C29.4309 12.4917 29.1666 12.4397 28.9153 12.379C28.6639 12.3183 28.4733 12.262 28.3433 12.21C28.0833 12.0973 27.9013 11.9543 27.7973 11.781C27.7019 11.6163 27.6846 11.4387 27.7453 11.248C27.8233 10.9967 27.9489 10.8233 28.1222 10.728C28.2956 10.6413 28.4776 10.6327 28.6683 10.702C28.7549 10.728 28.8979 10.78 29.0973 10.858C29.2966 10.936 29.5133 11.0053 29.7472 11.066C29.9899 11.1353 30.2023 11.17 30.3843 11.17C31.0343 11.17 31.5153 11.04 31.8273 10.78C32.1393 10.52 32.2953 10.1603 32.2953 9.701V8.57L32.4513 8.687C32.4513 8.79967 32.3906 8.93833 32.2693 9.103C32.1566 9.259 31.9963 9.415 31.7883 9.571C31.5889 9.727 31.3506 9.86133 31.0733 9.974C30.7959 10.078 30.5013 10.13 30.1893 10.13C29.5739 10.13 29.0193 9.97833 28.5253 9.675C28.0313 9.363 27.6413 8.93833 27.3553 8.401C27.0693 7.855 26.9263 7.231 26.9263 6.529C26.9263 5.81833 27.0693 5.19433 27.3553 4.657C27.6413 4.111 28.0269 3.68633 28.5123 3.383C28.9976 3.071 29.5393 2.915 30.1373 2.915ZM30.3843 4.345C29.9943 4.345 29.6519 4.44033 29.3573 4.631C29.0626 4.82167 28.8329 5.08167 28.6683 5.411C28.5036 5.74033 28.4213 6.113 28.4213 6.529C28.4213 6.93633 28.5036 7.30467 28.6683 7.634C28.8329 7.96333 29.0626 8.22333 29.3573 8.414C29.6519 8.60467 29.9943 8.7 30.3843 8.7C30.7829 8.7 31.1296 8.60467 31.4243 8.414C31.7189 8.22333 31.9486 7.96333 32.1133 7.634C32.2779 7.30467 32.3603 6.93633 32.3603 6.529C32.3603 6.113 32.2779 5.74033 32.1133 5.411C31.9486 5.08167 31.7189 4.82167 31.4243 4.631C31.1296 4.44033 30.7829 4.345 30.3843 4.345ZM39.2593 2.915C39.9006 2.915 40.386 3.04933 40.7153 3.318C41.0533 3.58667 41.283 3.94633 41.4043 4.397C41.5343 4.839 41.5993 5.333 41.5993 5.879V9.207C41.5993 9.43233 41.5256 9.623 41.3783 9.779C41.231 9.92633 41.0446 10 40.8193 10C40.594 10 40.4076 9.92633 40.2603 9.779C40.113 9.623 40.0393 9.43233 40.0393 9.207V5.879C40.0393 5.593 40.0003 5.33733 39.9223 5.112C39.853 4.878 39.723 4.69167 39.5323 4.553C39.3416 4.41433 39.0686 4.345 38.7133 4.345C38.3666 4.345 38.072 4.41433 37.8293 4.553C37.5953 4.69167 37.4133 4.878 37.2833 5.112C37.162 5.33733 37.1013 5.593 37.1013 5.879V9.207C37.1013 9.43233 37.0276 9.623 36.8803 9.779C36.733 9.92633 36.5466 10 36.3213 10C36.096 10 35.9096 9.92633 35.7623 9.779C35.615 9.623 35.5413 9.43233 35.5413 9.207V3.838C35.5413 3.61267 35.615 3.42633 35.7623 3.279C35.9096 3.123 36.096 3.045 36.3213 3.045C36.5466 3.045 36.733 3.123 36.8803 3.279C37.0276 3.42633 37.1013 3.61267 37.1013 3.838V4.397L36.9063 4.358C36.9843 4.21067 37.097 4.05467 37.2443 3.89C37.3916 3.71667 37.565 3.55633 37.7643 3.409C37.9636 3.26167 38.189 3.14467 38.4403 3.058C38.6916 2.96267 38.9646 2.915 39.2593 2.915Z"
                    fill="white"/>
                <path
                    d="M46.5614 10.13C45.8248 10.13 45.1834 9.97833 44.6374 9.675C44.1001 9.363 43.6841 8.94267 43.3894 8.414C43.1034 7.88533 42.9604 7.28733 42.9604 6.62C42.9604 5.84 43.1164 5.177 43.4284 4.631C43.7491 4.07633 44.1651 3.65167 44.6764 3.357C45.1878 3.06233 45.7294 2.915 46.3014 2.915C46.7434 2.915 47.1594 3.006 47.5494 3.188C47.9481 3.37 48.2991 3.62133 48.6024 3.942C48.9058 4.254 49.1441 4.618 49.3174 5.034C49.4994 5.45 49.5904 5.892 49.5904 6.36C49.5818 6.568 49.4994 6.737 49.3434 6.867C49.1874 6.997 49.0054 7.062 48.7974 7.062H43.8314L43.4414 5.762H48.2124L47.9264 6.022V5.671C47.9091 5.41967 47.8181 5.19433 47.6534 4.995C47.4974 4.79567 47.2981 4.63967 47.0554 4.527C46.8214 4.40567 46.5701 4.345 46.3014 4.345C46.0414 4.345 45.7988 4.37967 45.5734 4.449C45.3481 4.51833 45.1531 4.63533 44.9884 4.8C44.8238 4.96467 44.6938 5.18567 44.5984 5.463C44.5031 5.74033 44.4554 6.09133 44.4554 6.516C44.4554 6.984 44.5508 7.38267 44.7414 7.712C44.9408 8.03267 45.1921 8.27967 45.4954 8.453C45.8074 8.61767 46.1368 8.7 46.4834 8.7C46.8041 8.7 47.0598 8.674 47.2504 8.622C47.4411 8.57 47.5928 8.50933 47.7054 8.44C47.8268 8.362 47.9351 8.297 48.0304 8.245C48.1864 8.167 48.3338 8.128 48.4724 8.128C48.6631 8.128 48.8191 8.193 48.9404 8.323C49.0704 8.453 49.1354 8.60467 49.1354 8.778C49.1354 9.012 49.0141 9.22433 48.7714 9.415C48.5461 9.60567 48.2298 9.77467 47.8224 9.922C47.4151 10.0607 46.9948 10.13 46.5614 10.13ZM51.7334 10C51.5081 10 51.3217 9.92633 51.1744 9.779C51.0271 9.623 50.9534 9.43233 50.9534 9.207V3.838C50.9534 3.61267 51.0271 3.42633 51.1744 3.279C51.3217 3.123 51.5081 3.045 51.7334 3.045C51.9587 3.045 52.1451 3.123 52.2924 3.279C52.4397 3.42633 52.5134 3.61267 52.5134 3.838V5.06L52.4224 4.189C52.5177 3.981 52.6391 3.799 52.7864 3.643C52.9424 3.47833 53.1157 3.344 53.3064 3.24C53.4971 3.12733 53.7007 3.045 53.9174 2.993C54.1341 2.941 54.3507 2.915 54.5674 2.915C54.8274 2.915 55.0441 2.98867 55.2174 3.136C55.3994 3.28333 55.4904 3.45667 55.4904 3.656C55.4904 3.942 55.4167 4.15 55.2694 4.28C55.1221 4.40133 54.9617 4.462 54.7884 4.462C54.6237 4.462 54.4721 4.43167 54.3334 4.371C54.2034 4.31033 54.0517 4.28 53.8784 4.28C53.7224 4.28 53.5621 4.319 53.3974 4.397C53.2414 4.46633 53.0941 4.579 52.9554 4.735C52.8254 4.891 52.7171 5.086 52.6304 5.32C52.5524 5.54533 52.5134 5.814 52.5134 6.126V9.207C52.5134 9.43233 52.4397 9.623 52.2924 9.779C52.1451 9.92633 51.9587 10 51.7334 10ZM62.1318 2.915C62.3571 2.915 62.5434 2.98867 62.6908 3.136C62.8381 3.28333 62.9118 3.474 62.9118 3.708V9.207C62.9118 9.43233 62.8381 9.623 62.6908 9.779C62.5434 9.92633 62.3571 10 62.1318 10C61.9064 10 61.7201 9.92633 61.5728 9.779C61.4254 9.623 61.3518 9.43233 61.3518 9.207V8.57L61.6378 8.687C61.6378 8.79967 61.5771 8.93833 61.4558 9.103C61.3344 9.259 61.1698 9.415 60.9618 9.571C60.7538 9.727 60.5068 9.86133 60.2208 9.974C59.9434 10.078 59.6401 10.13 59.3108 10.13C58.7128 10.13 58.1711 9.97833 57.6858 9.675C57.2004 9.363 56.8148 8.93833 56.5288 8.401C56.2514 7.855 56.1128 7.231 56.1128 6.529C56.1128 5.81833 56.2514 5.19433 56.5288 4.657C56.8148 4.111 57.1961 3.68633 57.6728 3.383C58.1494 3.071 58.6781 2.915 59.2588 2.915C59.6314 2.915 59.9738 2.97133 60.2858 3.084C60.5978 3.19667 60.8664 3.33967 61.0918 3.513C61.3258 3.68633 61.5034 3.864 61.6248 4.046C61.7548 4.21933 61.8198 4.36667 61.8198 4.488L61.3518 4.657V3.708C61.3518 3.48267 61.4254 3.29633 61.5728 3.149C61.7201 2.993 61.9064 2.915 62.1318 2.915ZM59.5058 8.7C59.8871 8.7 60.2208 8.60467 60.5068 8.414C60.7928 8.22333 61.0138 7.96333 61.1698 7.634C61.3344 7.30467 61.4168 6.93633 61.4168 6.529C61.4168 6.113 61.3344 5.74033 61.1698 5.411C61.0138 5.08167 60.7928 4.82167 60.5068 4.631C60.2208 4.44033 59.8871 4.345 59.5058 4.345C59.1331 4.345 58.8038 4.44033 58.5178 4.631C58.2318 4.82167 58.0064 5.08167 57.8418 5.411C57.6858 5.74033 57.6078 6.113 57.6078 6.529C57.6078 6.93633 57.6858 7.30467 57.8418 7.634C58.0064 7.96333 58.2318 8.22333 58.5178 8.414C58.8038 8.60467 59.1331 8.7 59.5058 8.7Z"
                    fill="#FF9900"/>
            </svg>
        )
    )
}

