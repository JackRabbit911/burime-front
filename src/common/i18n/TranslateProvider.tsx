import { createContext, useRef, useState } from "react";
import type { Argv, ChildrenProps, TranslateContextType, TranslateType } from "./types";
import { sprintf } from "./utils";

export const TranslateContext = createContext<TranslateContextType | undefined>(undefined)

const TranslateProvider = ({ children }: ChildrenProps) => {
  const [translate, setTranslate] = useState<TranslateType>({})
  const translateKeys = useRef<string[]>([])

  const gettext = (key: string, ...argv: Argv) => {
    if (Object.hasOwn(translate, key)) {
      return sprintf(translate[key], ...argv)
    }

    if (!translate[key] && !translateKeys.current.includes(key)) {
      translateKeys.current.push(key)
    }

    return sprintf(key, ...argv)
  }

  return (
    <TranslateContext.Provider value={{ gettext, translateKeys, translate, setTranslate }}>
      {children}
    </TranslateContext.Provider>
  )
}

export default TranslateProvider
