import { useUnit } from "effector-react"
import { $translate, getTranslateFx } from "./store"
import { useEffect } from "react"

export const useTranslate = (clock: React.DependencyList = []) => {
    const translate = useUnit($translate)

    useEffect(() => {
        getTranslateFx(translate)
    }, clock)
}
