type StrNum = string|number;
export type Argv = StrNum[];
export type GetText = (value: string, ...argv: Argv) => string;

export type TranslateType = {
  [key: string]: string;
}

export type ChildrenProps = {
  children?: React.ReactNode;
}

export type GetTextProp = {
  __: GetText;
}

export type TranslateContextType = {
  gettext: GetText;
}
