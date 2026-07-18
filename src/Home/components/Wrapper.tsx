import { useLocation } from "react-router";

import LogOut from "./LogOut";
import { getTitle } from "../utils";
import BreadCrumbs from "./BreadCrumbs";
import { useTranslate } from "common/i18n/hooks";

type Props = {
  children?: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const location = useLocation();
  const uriSegments = location.pathname.split('/').filter((v) => Boolean(v))
  const addr = uriSegments[0] ?? 'home'
  const id = uriSegments[1]
  const __ = useTranslate()

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-2xl lg:w-4xl bg-base-100 p-4">
        <div className="flex flex-roe justify-between mb-4">
          <h1 className="text-2xl">{__(getTitle(addr, id))}</h1>
          {addr === 'home' ?
            <LogOut __={__} /> :
            <BreadCrumbs
              __={__}
              pathname={location.pathname}
            />
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default Wrapper
