import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  value: number;
  fieldName: string;
}

const RadioBox = ({ label, value, fieldName }: Props) => {
  const { register, getValues, formState: { isLoading } } = useFormContext()
  const checked = getValues(fieldName) === value

  return (
    <>
      {!isLoading &&
        <label className="fieldset-label cursor-pointer flex justify-between mb-4">
          <legend className="fieldset-legend me-2 pb-1 pt-0 !font-light">
            {label}
          </legend>
          <input
            type="radio"
            className="radio radio-sm"
            {...register(fieldName)}
            defaultValue={value}
            defaultChecked={checked}
          />
        </label>
      }
    </>
  )
}

export default RadioBox
