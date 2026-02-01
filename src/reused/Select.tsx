import { useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  label: string;
  options: {
    value: number | string;
    label: string;
    disabled?: boolean;
  }[];
}

const Select = ({ fieldName, label, options }: Props) => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <label className="fieldset-label flex flex-col w-full">
      <legend className="fieldset-legend flex justify-between w-full ms-1">
        {label}
        <div className="fieldset-label text-error mt-1">
        {errors[fieldName]?.message as string}
      </div>
      </legend>
      <select
        className="select w-full"
        {...register(fieldName, { required: true })}
      >
        {options.map(
          ({ value, label, disabled }, key) => (
            <option
              key={key}
              value={value}
              disabled={disabled}
            >
              {label}
            </option>
          )
        )}
      </select>
    </label>
  )
}

export default Select
