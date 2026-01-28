import { useUnit } from "effector-react";
import type { Help } from "./schema";
import { $hepls } from "./store";

type Props = {
  path: string;
}

const getHelp = (helps: Help[], path: string) =>
  helps.find((help: Help) => help.key === path)?.body || ''

const Helper = ({ path }: Props) => {
  const help = getHelp(useUnit($hepls), path)

  return !help ? (
    <div className="flex flex-col justify-center min-h-64">
      <div className="text-center w-full">
        <span className="text-xl">
          Ждите, помощь идёт
        </span>
        <span className="loading loading-dots loading-xs ms-1.5 mt-2.5"></span>
      </div>
    </div>
  ) : (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: help }} />
  )
}

export const helper = (props: Props) => <Helper { ...props } />
export default Helper
