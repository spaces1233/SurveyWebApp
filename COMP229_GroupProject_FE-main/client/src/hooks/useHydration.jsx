import useGlobalStore from "@/store/GlobalStore";
import { useState, useEffect } from "react";

const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Note: This is just in case you want to take into account manual rehydration.
    // You can remove the following line if you don't need it.
    const unsubHydrate = useGlobalStore.persist.onHydrate(() =>
      setHydrated(false)
    );

    const unsubFinishHydration = useGlobalStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useGlobalStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

export default useHydration;
