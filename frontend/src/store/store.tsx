import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accesstoken: string;
  refreshtoken: string;
  username: string;
  setaccesstoken: (accesstoken: string) => void;
  setrefreshtoken: (refreshtoken: string) => void;
  setusername: (username: string) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      accesstoken: "",
      refreshtoken: "",
      username: "",
      setaccesstoken: (accesstoken: string) =>
        set((state) => ({ accesstoken })),
      setrefreshtoken: (refreshtoken: string) =>
        set((state) => ({ refreshtoken })),
      setusername: (username: string) => set((state) => ({ username })),
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
