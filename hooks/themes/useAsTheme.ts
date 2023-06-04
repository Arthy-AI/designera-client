import {useState, useEffect} from "react";
import {imagesGlobal, imagesGlobalStore} from "../../globals/images/images";

export default function useAsTheme() {
  const [themes, setThemes] = useState([] as any[])
  const [themesSectionShow, setThemesSectionShow] = useState(false)

  useEffect(() => {
    setThemes(imagesGlobalStore.getState().themes)
    setThemesSectionShow(imagesGlobalStore.getState().themesSectionShow)

    imagesGlobalStore.subscribe(() => {
      setThemes(imagesGlobalStore.getState().themes)
      setThemesSectionShow(imagesGlobalStore.getState().themesSectionShow)
    })
  }, []);

  function addImage(image: any) {
    imagesGlobalStore.dispatch(imagesGlobal.actions.addTheme({
      image
    }))
  }

  function removeImage(index: number) {
    imagesGlobalStore.dispatch(imagesGlobal.actions.removeTheme({
      index
    }))
  }

  function removeImageById(id: string) {
    imagesGlobalStore.dispatch(imagesGlobal.actions.removeTheme({
      index: themes.findIndex((v) => v.id == id)
    }))
  }

  function themesSectionToggle(show?: boolean) {
    imagesGlobalStore.dispatch(imagesGlobal.actions.themesSectionToggle({
      show
    }))
  }

  return {
    themes,
    themesSectionShow,
    addImage,
    removeImage,
    themesSectionToggle,
    removeImageById
  }
}