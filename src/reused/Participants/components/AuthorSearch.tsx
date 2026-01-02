import { authorsFilterSearch } from "../schema";
import { getAuthorsFx } from "../store/authors";
import { useUnit } from "effector-react";
import { $authorsPayload, authorsPayloadReset, filterSet } from "../store/athorsPayload";
import { useState, type ChangeEventHandler } from "react";
import { t } from "../../../common/i18n/utils";

type Props = {
  filters:string[];
}

const AuthorSearch = ({ filters }: Props) => {
  const authorsPayload = useUnit($authorsPayload)
  const [error, setError] = useState<string | null>()

  const onSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    filterSet(e.target.value)
  }

  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const valid = authorsFilterSearch.safeParse(e.target.value)
    if (!valid.success) {
      setError(valid.error.issues[0].message)
    } else {
      setError(null)
    }
  }

  const onSearchBtn = () => {
    getAuthorsFx(authorsPayload)
  }

  const onReset = () => {
    authorsPayloadReset()
  }

  const inputClassName =
    !error ?
      "input join-item border-white" :
      "input join-item input-error"

  const alert = !error ? null : <div
    className="fieldset-label text-error"
  >{error}</div>

  return (
    
      <fieldset className="fieldset">
        <legend className="fieldset-legend flex justify-between w-full">
          <div>Search & filter</div>
          {alert}
        </legend>
        <div className="flex gap-2">

          <div className="join basis-2/3">
            <input
              className={inputClassName}
              placeholder={t('Search')}
              onChange={onSearch}
            />
            <button
              type="button"
              className="btn btm-sm btn-square join-item"
              disabled={Boolean(error)}
              onClick={onSearchBtn}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
            </button>
          </div>
          <div className="join basis-1/3">
            <select
              className="select join-item max-w-1/4"
              defaultValue=""
              onChange={onSelect}
            >
              <option value="" disabled>Filter</option>
              {filters?.map((item, key) => (
                <option key={key} value={item}>{item}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn btm-sm btn-square join-item"
              onClick={onReset}
            >
              X
            </button>
          </div>
        </div>
      </ fieldset>
  )
}

export default AuthorSearch
