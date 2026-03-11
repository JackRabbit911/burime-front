import type { OwnAuthor } from "../types";
import { useFormContext } from "react-hook-form";
import { useGetText } from "common/i18n/hooks";

type Props = {
  fieldName: string;
  label: string;
  options: OwnAuthor[];
}

const Select = ({ fieldName, label, options }: Props) => {
  const { register, watch } = useFormContext()
  const __ = useGetText()

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        {__(label)}
      </legend>
      <select
        className="select w-full"
        {...register(fieldName, { required: true })}
        value={String(watch(fieldName))}
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
