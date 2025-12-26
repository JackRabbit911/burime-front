import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { getObjectProp } from "../common/utils";

type Props = {
  fieldName: string;
  label: string;
  optional?: string;
  placeholder?: string;
}

const TextInput = ({
  fieldName, label, optional, placeholder
}: Props) => {
  const { register, formState: { errors } } = useFormContext();
  const err = getObjectProp(errors, fieldName)

  const inputClassName =
    err ?
      "input w-full input-error" :
      "input w-full";

  const alert = err ? <ErrorMessage
    as="div"
    name={fieldName}
    errors={errors}
    className="fieldset-label text-error"
  /> : null

  return (
    <>
      <legend className="fieldset-legend flex justify-between w-full">
        {label}
        {alert}
        <span className="label-text">{optional}</span>
      </legend>
      <input
        {...register(fieldName)}
        placeholder={placeholder}
        className={inputClassName}
      />
    </>

  )
}

export default TextInput
