import { host } from "common/ajax"
import {
    fetchTranslate,
    // fetchAllMap,
    // detectLangByUri,
    detectLangByAttribute,
} from "./utils"

import type { TranslateType } from "./types"

export const SUPPORTED_LANGS = {
    ru: 'Русский',
    en: 'English',
    de: 'Deutsch',
}
export const DEFAULT_LANG = 'ru'

export const defaultTranslateKeys = [
    'Title is required', 'Loading', 'Edit author', 'Edit branch',
]

export const getTranslateUri = `${host}/api/gettranslate`
export const limit = null //cache limit in pairs key-valaue
export const delay = 200 //debounse delay im ms

export const detectLang = (): string => detectLangByAttribute()
// export const detectLang = (): string => detectLangByUri()

//fetch translate by array keys
export const getTranslate = (lang: string, keys: string[] | null): Promise<TranslateType> => fetchTranslate(lang, keys)
