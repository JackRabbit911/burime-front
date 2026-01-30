import { t } from "../../../common/i18n/utils";
import type { AuthorsPayload } from "../types";
import { useAuthorSearch } from "../hooks/AuthorSearch";

type Props = {
  filters: string[];
  authorsPayload: AuthorsPayload;
}

const AuthorSearch = ({ filters, authorsPayload }: Props) => {
  const {
    error,
    onSelect,
    onSearch,
    onReset,
    filterRef,
    searchRef,
    inputClassName
  } = useAuthorSearch()

  const alert = !error ? null : <div
    className="fieldset-label text-error"
  >{error}</div>

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        <div>Search & filter</div>
        {alert}
      </legend>
      <div className="join">
        <input
          className={inputClassName}
          placeholder={t('Search')}
          defaultValue={authorsPayload.search ?? ''}
          onChange={onSearch}
          ref={searchRef}
        />
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
    </ fieldset>
  )
}

export default AuthorSearch
