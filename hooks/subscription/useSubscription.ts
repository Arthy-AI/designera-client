import {useState, useEffect} from "react";
import {subscriptionGlobal, subscriptionGlobalStore} from "../../globals/subscription/subscription";
export default function useSubscription() {
  const [data, setData] = useState({} as any)

  useEffect(() => {
    setData(subscriptionGlobalStore.getState())

    subscriptionGlobalStore.subscribe(() => {
      setData(subscriptionGlobalStore.getState())
    })
  }, []);

  function toggleModal(status: boolean) {
    subscriptionGlobalStore.dispatch(subscriptionGlobal.actions.toggleModal({
      status
    }))
  }

  function changeSelection(index: number) {
    subscriptionGlobalStore.dispatch(subscriptionGlobal.actions.changeSelection({
      index
    }))
  }

  return {
    data,
    toggleModal,
    changeSelection
  }
}