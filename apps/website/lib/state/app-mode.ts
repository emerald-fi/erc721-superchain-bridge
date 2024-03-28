import { atom, useAtom, WritableAtom } from "jotai"

export type AppMode = "mainnet" | "testnet"

let strAtom: WritableAtom<AppMode, AppMode>
if (typeof window !== "undefined") {
  strAtom = atom(
    window?.localStorage.getItem("app-mode") || ("mainnet" as AppMode)
  ) as WritableAtom<AppMode, AppMode>
} else {
  strAtom = atom("mainnet") as WritableAtom<AppMode, AppMode>
}

export const appModeAtom = atom(
  (get) => get(strAtom),
  (get, set, newStr: AppMode) => {
    set(strAtom, newStr)
    localStorage.setItem("app-mode", newStr)
  }
)

export const useAppMode = () => {
  const [appMode, setAppMode] = useAtom(appModeAtom)
  return { appMode, setAppMode }
}
