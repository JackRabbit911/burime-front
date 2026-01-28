import { authorsFilterSearch } from "../schema";
import { authorsPayloadReset, filterSet, searchSet } from "../store/athorsPayload";
import { useRef, useState } from "react";
import { t } from "../../../common/i18n/utils";
import type { AuthorsPayload } from "../types";
import Search from "../../icons/Search";

type Props = {
  filters: string[];
  authorsPayload: AuthorsPayload;
}

const AuthorSearch = ({ filters, authorsPayload }: Props) => {
  const [error, setError] = useState<string | null>()
  const searchRef = useRef<HTMLInputElement>(null)
  const filterRef = useRef<HTMLSelectElement>(null)

  const onSelect = () => {
    filterSet(filterRef.current?.value ?? null)
  }

  const onSearch = () => {
    const valid = authorsFilterSearch.safeParse(searchRef.current?.value)
    if (!valid.success) {
      setError(valid.error.issues[0].message)
    } else {
      setError(null)
    }
  }

  const onSearchBtn = () => {
    searchSet(searchRef.current?.value ?? null)
  }

  const onReset = () => {
    if (searchRef.current) {
      searchRef.current.value = ''
    }

    if (filterRef.current) {
      filterRef.current.value = ''
    }

    authorsPayloadReset()
  }

  const inputClassName =
    !error ?
      "input join-item" :
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
            defaultValue={authorsPayload.search ?? ''}
            onChange={onSearch}
            ref={searchRef}
          />
          <button
            type="button"
            className="btn btm-sm btn-square join-item"
            disabled={Boolean(error)}
            onClick={onSearchBtn}
          >
            <Search />
          </button>
        </div>
        <div className="join basis-1/3">
          <select
            className="select join-item"
            defaultValue={authorsPayload.filter ?? ''}
            onChange={onSelect}
            ref={filterRef}
          >
            <option value="" disabled>Filter</option>
            {filters?.map((item, key) => (
              <option key={key} value={item}>{item}</option>
            ))}
          </select>
          <button
            type="reset"
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
