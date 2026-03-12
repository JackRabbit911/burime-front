import Select from "reused/Select"
import Textarea from "reused/Textarea"
import FileInput from "reused/FileInput"
import TextInput from "reused/TextInput"
import type { Member } from "reused/Participants/types"
import type { GetText } from "common/i18n/types"

type Props = {
  __: GetText;
  members: Member[] | undefined;
}

const AuthorForm = ({ __, members }: Props) => { 
  const disabled = (members: Member[] | undefined) => {
    if (members === undefined || members.length === 0) {
      return false
    }

    return true
  }

  return (
    <>
      <TextInput
        label={__("Alias")}
        fieldName="author.alias"
      />
      <Textarea
        fieldName="author.info.slogan"
        label={__('Slogan')}
        placeholder={__('Your motto')}
        rows={4}
        optional={__("Up to % words", 80)}
      />
      <Textarea
        fieldName="author.info.info"
        label={__('Info')}
        placeholder={__('Tell us about your author')}
        rows={4}
        optional={__("Up to % words", 200)}
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
        <FileInput
          fieldName="file"
          label={__('Avatar')}
          optional={__('Up % Mb', 2)}
        />
        </div>
          <Select
            fieldName="author.openclosed"
            label={__('Status')}
            options={[
              { value: 2, label: __('Author only'), disabled: disabled(members)},
              { value: 1, label: __('Closed group') },
              { value: 0, label: __('Open group') },
            ]}
          />
      </div>
    </>
  )
}

export default AuthorForm
