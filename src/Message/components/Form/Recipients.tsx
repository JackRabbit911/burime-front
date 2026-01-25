import { useFormContext } from "react-hook-form";
import { t } from "../../../common/i18n/utils";
import type { Author } from "../../../reused/Participants/schema";
import Recipient from "./Recipient";

const Recipients = () => {
  const { watch, setValue } = useFormContext()
  const recipients = watch('recipients') || []

  const onDelete = (member: Author) => {
    const newRecipients = recipients.filter((item: Author) => item.id !== member.id)
    setValue('recipients', newRecipients)
  }

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          {t('Recipients')}
        </legend>
      </fieldset>
      <div className="flex flex-col gap-2">
        {recipients.map((author: Author) => (
          <Recipient
            key={author.id}
            author={author}
            onDelete={onDelete}
          />
        )
        )}
      </div>
    </div>
  )
}

export default Recipients
