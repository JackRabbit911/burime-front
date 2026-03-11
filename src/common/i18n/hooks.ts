import { useContext, useEffect } from "react"
import { getTranslateUri } from "./config"
import { TranslateContext } from "./TranslateProvider"
import type { TranslateType } from "./types"
import { updateTranslate } from "./utils"

export const useGetText = () => {
    const context = useContext(TranslateContext)

    if (context === undefined) {
        throw new Error('useGetText must be used within an TranslateProvider');
    }

    return context.gettext
}

export const useTranslate = (clock: React.DependencyList = []) => {
    const context = useContext(TranslateContext)

    if (context === undefined) {
        throw new Error('useTranslate must be used within an TranslateProvider');
    }

    useEffect(() => {
        const keys = Object.keys(context.translate)
        const diff = context.translateKeys.current.filter(x => !keys.includes(x));

        if (diff.length > 0) {
            fetch(getTranslateUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filter: context.translateKeys.current })
            }).then((response) => response.json())
                .then((data) => data.result)
                .then((result: TranslateType) => {
                    updateTranslate(context, result)
                })
        }
    }, clock)

    return context.gettext
}
