import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Link, useLocation } from "react-router";

import { getTitle } from "../utils";
import { t } from "common/i18n/utils";
import { globalReset } from "common/store";
import { $translate, getTranslateFx } from "common/i18n/store";

type Props = {
  children?: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const location = useLocation();
  const uriSegments = location.pathname.split('/').filter((v) => Boolean(v))
  const addr = uriSegments[0] ?? 'home'
  const id = uriSegments[1]
  const translate = useUnit($translate)

  const onClick = () => {
    globalReset()
  }

  useEffect(() => {
    getTranslateFx(translate)
  }, [location])

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-2xl lg:w-4xl bg-base-100 p-4">
        <div className="flex flex-roe justify-between mb-4">
          <h1 className="text-2xl">{t(getTitle(addr, id))}</h1>
          {addr === 'home' ?
            <a href="/auth/logout" className="btn btn-outline btn-error">{t('Log Out')}</a> :
            <Link to=''>
              <button
                className="btn btn-outline"
                onClick={onClick}
              >
                {t('Personal account')}
              </button>
            </Link>
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default Wrapper
