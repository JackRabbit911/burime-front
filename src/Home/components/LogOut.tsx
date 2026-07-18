import { useUnit } from "effector-react"
import ajax from "common/ajax";
import { $csrf } from "common/store/csrf"
import { logoutUri, quitUri } from "common/constants";
import type { GetText } from "common/i18n/types";

type Props = {
  __: GetText;
}

const LogOut = ({ __ }: Props) => {
  const csrf = useUnit($csrf)

  const onLogOut = (url: string, csrf: string) => {
    ajax.delete(url, { data: { csrf } })
      .then((response) => response.data)
      .then((data) => {
        if (data.success) {
          window.location.href = "/"
        } else {
          console.error(data.error)
        }
      })
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-error">
        {__('Log Out')}
      </div>
      <ul tabIndex={0}
        className="dropdown-content menu bg-base-100 max-h-[70vh] overflow-y-auto rounded-box z-50 min-w-38 p-2 shadow-sm"
      >
        <li>
          <button onClick={() => onLogOut(logoutUri, csrf)}>
            {__('Of this device')}
          </button>
        </li>
        <li>
          <button onClick={() => onLogOut(quitUri, csrf)}>
            {__('Of all devices')}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default LogOut
