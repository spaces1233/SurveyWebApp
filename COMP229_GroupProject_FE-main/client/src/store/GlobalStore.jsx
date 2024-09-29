import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useGlobalStore = create(
  persist(
    (set, get) => ({
      isAuth: false,
      token: null,
      login: ({token}) => set({isAuth: true, token}),
      logout: () => set({isAuth: false, token : null}),
      updateToken:({token}) => set({token}),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGlobalStore
