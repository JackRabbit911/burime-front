import { useContext, useEffect } from "react"
import { TranslateContext, translateKeys } from "./TranslateProvider"
import { getTranslateUri, limit } from "./config"

export const useGetText = () => {
    const context = useContext(TranslateContext)

    if (context === undefined) {
        throw new Error('useTranslateContext must be used within an TranslateProvider');
    }

    return context.gettext
}

export const useTranslate = () => {
    const context = useContext(TranslateContext)

    if (context === undefined) {
        throw new Error('useTranslate must be used within an TranslateProvider');
    }

    useEffect(() => {
        if (translateKeys.length > 0) {
            fetch(getTranslateUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filter: translateKeys })
            }).then((response) => response.json())
                .then((data) => data.result)
                .then((result) => {
                    if (limit) {
                        const keys = Object.keys(context.translate)
                        const n = keys.length + Object.keys(result).length - limit
    
                        if (n > 0) {
                            keys.slice(0, n).forEach(key => delete context.translate[key]);
                        }
                    }

                    context.setTranslate({ ...context.translate, ...result })
                    translateKeys.length = 0
                    result = {}
                })
        }
    }, [])

    return context.gettext
}
