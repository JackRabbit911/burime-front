import { useFormContext } from "react-hook-form";
import { useState, type ChangeEvent } from "react";
import { ErrorMessage } from "@hookform/error-message";

import { getObjectProp } from "common/utils";
import CheckboxConditional from "./CheckboxConditional";

type Props = {
  fieldName: string;
  label: string;
  message: string;
  placeholder?: string;
  checkboxLabel: string;
}

const ConditionalInput = ({ fieldName, label, message, placeholder, checkboxLabel }: Props) => {
  const { register, getValues, setValue, formState: { errors } } = useFormContext();
  const [isChecked, setIsChecked] = useState<boolean>(!Boolean(getValues(fieldName)));
  const err = getObjectProp(errors, fieldName)

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedStatus = event.target.checked;
    setIsChecked(checkedStatus);

    if (checkedStatus) {
      setValue(fieldName, '')
    }
  };

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
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        <span>{label}</span>
        {alert}
        <CheckboxConditional
          label={checkboxLabel}
          isChecked={isChecked}
          onChange={handleCheckboxChange}
        />
      </legend>
      {isChecked ?
        <div className="border rounded-sm border-stone-500 px-3 py-2.5 text-sm">
          {message}
        </div>
        :
        <input
        {...register(fieldName)}
        placeholder={placeholder}
        className={inputClassName} 
      />
      }
    </fieldset>
  )
}

export default ConditionalInput
