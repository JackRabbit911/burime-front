import { useLocation } from "react-router";

import { getTitle } from "../utils";
import { t } from "common/i18n/utils";
import { useTranslate } from "common/i18n/hook";
import BreadCrumbs from "./BreadCrumbs";
import ajax from "common/ajax";
import { logoutUri } from "common/constants";

type Props = {
  children?: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const location = useLocation();
  const uriSegments = location.pathname.split('/').filter((v) => Boolean(v))
  const addr = uriSegments[0] ?? 'home'
  const id = uriSegments[1]

  const onLogOut = () => {
    ajax.get(logoutUri)
      .then((response) => response.data)
      .then((data) => {
        if (data.success) {
          window.location.href = "/"
        } else {
          console.error(data.error)
        }
      })
  }

  useTranslate([location])

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-2xl lg:w-4xl bg-base-100 p-4">
        <div className="flex flex-roe justify-between mb-4">
          <h1 className="text-2xl">{t(getTitle(addr, id))}!</h1>
          {addr === 'home' ?
            <button
              className="btn btn-outline btn-error"
              onClick={onLogOut}
            >
              {t('Log Out')}
            </button> :
            <BreadCrumbs pathname={location.pathname} />
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default Wrapper
