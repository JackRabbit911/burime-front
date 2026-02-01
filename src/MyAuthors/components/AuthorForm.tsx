import { t } from "../../common/i18n/utils"
import Select from "../../reused/Select"
import Textarea from "../../reused/Textarea"
import FileInput from "../../reused/FileInput"
import TextInput from "../../reused/TextInput"
import type { Member } from "../../reused/Participants/types"

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
        fieldName="author.alias"
      />
      <Textarea
        fieldName="author.info.slogan"
        label={t('Slogan')}
        placeholder={t('Your motto')}
        rows={4}
        optional={t("Up to % words", 80)}
      />
      <Textarea
        fieldName="author.info.info"
        label={t('Info')}
        placeholder={t('Tell us about your author')}
        rows={4}
        optional={t("Up to % words", 200)}
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
        <FileInput
          fieldName="file"
          label={t('Avatar')}
          optional={t('Up % Mb', 2)}
        />
        </div>
          <Select
            fieldName="author.openclosed"
            label={t('Status')}
            options={[
              { value: 2, label: t('Author only'), disabled: disabled(members)},
              { value: 1, label: t('Closed group') },
              { value: 0, label: t('Open group') },
            ]}
          />
      </div>
    </>
  )
}

export default AuthorForm
