type StrNum = string|number;
export type Argv = StrNum[];
export type GetText = (value: string, ...argv: Argv) => string;

export type TranslateType = {
  [key: string]: string | null;
}

export type TranslateContextType = {
  gettext: GetText;
  translate: TranslateType;
  setTranslate: React.Dispatch<React.SetStateAction<TranslateType>>;
}

export type ChildrenProps = {
  children?: React.ReactNode;
}
