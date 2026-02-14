import { t } from "common/i18n/utils"
import RadioBox from "reused/RadioBox"
import FileInput from "reused/FileInput"
import TextInput from "reused/TextInput"

const Form = () => {
  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      <TextInput
        label="User Name"
        fieldName="name"
      />
      <TextInput
        label="Email"
        fieldName="email"
      />
      <TextInput
        label="Phone"
        fieldName="phone"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          type="date"
          label="Date of birth"
          fieldName="dob"
          max={today}
        />
        <div className="fieldset">
          <legend className="fieldset-legend flex justify-between w-full">
            {t('Sex')}
          </legend>
          <div className="grid grid-cols-2 gap-8">
            <RadioBox
              label={t('Male')}
              value={1}
              fieldName="sex"
            />
            <RadioBox
              label={t('Female')}
              value={0}
              fieldName="sex"
            />
          </div>
        </div>
      </div>
      <fieldset className="fieldset">
        <FileInput
          fieldName="file"
          label={t('Avatar')}
          optional={t('Up % Mb', 2)}
        />
      </fieldset>
    </>
  )
}

export default Form
