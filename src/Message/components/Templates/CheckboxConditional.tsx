import type { ChangeEvent } from "react";

type Props = {
  label: string;
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxConditional = ({ label, isChecked, onChange }: Props) => {
  return (
    <label className="fieldset-label flex">
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        checked={isChecked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}

export default CheckboxConditional
