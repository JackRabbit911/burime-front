import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { getObjectProp } from "common/utils";
import type { GetTextProp } from "common/i18n/types";

const label = "Title"
const optional = "Up to % words"
const fieldName = "branch.title"
const placeholder = "Название произведения"

const Title = ({ __ }: GetTextProp) => {
  const { register, formState: { errors } } = useFormContext();
  const err = getObjectProp(errors, fieldName)

  const inputClassName =
    err ?
      "input w-full input-error" :
      "input w-full" ;

  const alert = err ? <ErrorMessage
    as="div"
    name={fieldName}
    errors={errors}
    className="fieldset-label text-error"
  /> : null

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        {__(label)}
        {alert}
        <span className="label-text">{__(optional, 8)}</span>
      </legend>
      <input
        {...register(fieldName)}
        placeholder={placeholder}
        className={inputClassName}
      />
    </fieldset>
  )
}

export default Title
