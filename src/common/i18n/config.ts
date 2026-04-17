import {
    fetchTranslate,
    // fetchAllMap,
} from "./utils"

import type { TranslateType } from "./types"
import { host } from "common/constants"

const SUPPORTED_LANGS = {
    ru: 'Русский',
    en: 'English',
    de: 'Deutsch',
}
const DEFAULT_LANG = null
const LANG_INDEX = 0

export const defaultTranslateKeys = [
    'Title is required', 'Loading', 'Edit author', 'Edit branch',
]

export const getTranslateUri = `${host}/api/gettranslate`
export const limit = null //cache limit in pairs key-valaue
export const delay = 200 //debounse delay im ms

const detectLangMethod = {
    uri: detectLangByUri(),
    config: detectLangByConfig(),
    subdomain: detectLangBySubdomain(),
    attribute: detectLangByAttribute(),
}

const DETECT_LANG_METHOD = detectLangMethod.subdomain

//fetch translate by array keys
export const getTranslate = (lang: string, keys: string[] | null): Promise<TranslateType> => fetchTranslate(lang, keys)

//fetch all translates
// export const getTranslate = (lang: string, keys: null): Promise<TranslateType> => fetchAllMap(lang, keys)


/********* NOT FOR CHANGE *********/
export const detectLang = (): string => {
    const lang = DETECT_LANG_METHOD || DEFAULT_LANG || 'en'//navigator.language.split('-')[0] || 'en'
    setLangAttribute(lang)
    return lang
}

function detectLangByUri(): string | null {
    const segments = window.location.pathname.split('/').filter(Boolean)
    const langs = Object.keys(SUPPORTED_LANGS).filter((value) => value !== DEFAULT_LANG)
    return langs.includes(segments[LANG_INDEX]) ? segments[LANG_INDEX] : null
}

function detectLangByConfig(): string | null {
    const config = window.APP_CONFIG
    const defaultLang = config?.defaultLang
    const lang = defaultLang || null
    
    return lang
}

function detectLangBySubdomain(): string | null {
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    const langs = Object.keys(SUPPORTED_LANGS)
    const lang = parts[LANG_INDEX]

    if (langs.includes(lang)) {
        return lang
    }

    return null
}

function detectLangByAttribute(): string | null {
    return document.querySelector('html')?.getAttribute('lang') || null
}

function setLangAttribute(lang: string) {
    document.querySelector('html')?.setAttribute('lang', lang)
}
