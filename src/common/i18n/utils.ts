import { limit } from "./config";
import type { TranslateContextType, TranslateType } from "./types";

export const sprintf = (str: string, ...argv: any[]): string => !argv.length ? str : 
    sprintf(str = str.replace("%", argv.shift()), ...argv);

export const updateTranslate = (
    context: TranslateContextType,
    result: TranslateType,
) => {
    const keys = Object.keys(context.translate)

    if (limit) {
        const n = keys.length + Object.keys(result).length - limit

        if (n > 0) {
            keys.slice(0, n).forEach(key => delete context.translate[key]);
        }
    }

    context.setTranslate({ ...context.translate, ...result })
    context.translateKeys.current.length = 0
    result = {}
}

export const detectLang = (): string => (
    document.querySelector('html')?.getAttribute('lang') || navigator.language.split('-')[0]
)
