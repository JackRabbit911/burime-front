import { createContext, useState } from "react";
import type { Argv, ChildrenProps, TranslateContextType, TranslateType } from "./types";

export const translateKeys: string[] = []
export const TranslateContext = createContext<TranslateContextType | undefined>(undefined)

const sprintf = (str: string, ...argv: any[]): string => !argv.length ? str :
  sprintf(str = str.replace("%", argv.shift()), ...argv);

const TranslateProvider = ({ children }: ChildrenProps) => {
  const [translate, setTranslate] = useState<TranslateType>({})

  const gettext = (key: string, ...argv: Argv) => {
    if (!translate[key] && !translateKeys.includes(key)) {
            translateKeys.push(key)
        }

    return translate[key]
      ? sprintf(translate[key], ...argv)
      : sprintf(key, ...argv)
  }

  return (
    <TranslateContext.Provider value={{ gettext, translate, setTranslate }}>
      {children}
    </TranslateContext.Provider>
  )
}

export default TranslateProvider
