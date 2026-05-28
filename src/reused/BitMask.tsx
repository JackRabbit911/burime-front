import { Controller } from 'react-hook-form'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import type { GetText } from 'common/i18n/types';

type BitmaskOption = {
  label: string;
  value: number;
}

type Props<TFieldValues extends FieldValues> = {
  __: GetText;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: BitmaskOption[];
  disabled?: boolean;
}

const BitMask = <TFieldValues extends FieldValues>({
  __,
  name,
  control,
  options,
  disabled = false,
}: Props<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = 3, onChange } }) => {
        return (
          <div>
            {options.map((option: BitmaskOption) => {
              const isChecked = (value & option.value) !== 0;

              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  onChange(value | option.value)
                } else {
                  onChange(value & ~option.value)
                }
              }

              return (
                <label
                  key={option.value}
                  className="fieldset-label flex justify-between mb-2"
                >
                  {__(option.label)}
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={isChecked}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                </label>
              )
            })}
          </div>
        );
      }}
    />
  )
}

export default BitMask
