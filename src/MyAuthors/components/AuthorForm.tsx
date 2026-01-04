import { t } from "../../common/i18n/utils"
import FileInput from "../../reused/FileInput"
import type { Member } from "../../reused/Participants/types"
import Select from "../../reused/Select"
import Textarea from "../../reused/Textarea"
import TextInput from "../../reused/TextInput"

type Props = {
  members: Member[] | undefined;
}

const AuthorForm = ({ members }: Props) => {
  const disabled = (members: Member[] | undefined) => {
    if (members === undefined || members.length === 0) {
      return false
    }

    return true
  }

  return (
    <>
      <TextInput
        label="Alias"
        fieldName="alias"
      />
      <Textarea
        fieldName="info.slogan"
        label={t('Slogan')}
        placeholder={t('Your motto')}
        rows={4}
        optional={t("Up to % words", 80)}
      />
      <Textarea
        fieldName="info.info"
        label={t('Info')}
        placeholder={t('Tell us about your author')}
        rows={4}
        optional={t("Up to % words", 200)}
      />
      <div className="flex flex-row gap-3">
        <FileInput
          fieldName="file"
          label={t('Avatar')}
          optional={t('Up % Mb', 2)}
        />
        <div className="w-1/2 mt-0.45">
          <Select
            fieldName="openclosed"
            label={t('Status')}
            options={[
              { value: 2, label: t('Author only'), disabled: disabled(members)},
              { value: 1, label: t('Closed group') },
              { value: 0, label: t('Open group') },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default AuthorForm
