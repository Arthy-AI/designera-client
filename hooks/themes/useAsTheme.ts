import {useState, useEffect} from "react";
import {imagesGlobal, imagesGlobalStore} from "../../globals/images/images";
export default function useAsTheme() {
  const [themes, setThemes] = useState([] as any[])

  useEffect(() => {
    setThemes(imagesGlobalStore.getState().themes)

    imagesGlobalStore.subscribe(() => {
      setThemes(imagesGlobalStore.getState().themes)
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

  return {
    themes,
    addImage,
    removeImage
  }
}