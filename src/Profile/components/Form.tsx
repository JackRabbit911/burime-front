import RadioBox from "reused/RadioBox"
import FileInput from "reused/FileInput"
import TextInput from "reused/TextInput"
import type { GetTextProp } from "common/i18n/types"

const Form = ({ __ }: GetTextProp) => {
  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <TextInput
        label={__("User Name")}
        fieldName="name"
      />
      <TextInput
        label="Email"
        fieldName="email"
      />
      <TextInput
        label={__("Phone")}
        fieldName="phone"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          type="date"
          label={__("Date of birth")}
          fieldName="dob"
          max={today}
        />
        <div className="fieldset">
          <legend className="fieldset-legend flex justify-between w-full">
            {__('Sex')}
          </legend>
          <div className="grid grid-cols-2 gap-8">
            <RadioBox
              label={__('Male')}
              value={1}
              fieldName="sex"
            />
            <RadioBox
              label={__('Female')}
              value={0}
              fieldName="sex"
            />
          </div>
        </div>
      </div>
      <fieldset className="fieldset">
        <FileInput
          fieldName="file"
          label={__('Avatar')}
          optional={__('Up to %Mb', 2)}
        />
      </fieldset>
    </>
  )
}

export default Form
