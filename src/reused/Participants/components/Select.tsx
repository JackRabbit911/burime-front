import { useFormContext } from "react-hook-form";
import type { OwnAuthor } from "../types";
import { t } from "common/i18n/utils";

type Props = {
  fieldName: string;
  label: string;
  options: OwnAuthor[];
}

const Select = ({ fieldName, label, options }: Props) => {
  const { register } = useFormContext()

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        {t(label)}
      </legend>
      <select
        className="select w-full"
        {...register(fieldName, { required: true })}
      >
        {options.map(
          ({ id, alias }, key) => (
            <option value={id} key={key}>
              {alias}
            </option>
          )
        )}
      </select>
    </fieldset>
  )
}

export default Select
