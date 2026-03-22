import { useContext } from "react"
import { useCallback, useRef } from 'react';

import { TranslateContext } from "./TranslateProvider"

const useTranlateContext = () => {
    const context = useContext(TranslateContext)

    if (context === undefined) {
        throw new Error('i18n hook must be used within an TranslateProvider');
    }

    return context
}

export const useTranslate = () => {
    const context = useTranlateContext()

    return context.gettext
}

export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    return useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }

            timerRef.current = setTimeout(() => {
                callback(...args)
            }, delay)
        }, [callback, delay])
}
