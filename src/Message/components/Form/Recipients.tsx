import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Recipient from "./Recipient";
import { setMsgView, toAliasSetted } from "Message/store";

import type { GetTextProp } from "common/i18n/types";
import type { Author } from "reused/Participants/schema";


const Recipients = ({ __ }: GetTextProp) => {
  const { watch, setValue } = useFormContext()
  const recipients = watch('recipients') || []

  const onChangeAppeal = (alias: string) => {
      toAliasSetted(alias)
    }

  const onDelete = (member: Author) => {
    const newRecipients: string[] = recipients.filter((item: Author) => item.id !== member.id)
    setValue('recipients', newRecipients)

    if (newRecipients.length === 0) {
      setMsgView('choice')
    }
  }

  useEffect(() => {
    if (recipients.length > 0) {
      toAliasSetted(recipients[0].alias)
    }
  })

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          {__('Recipients')}
        </legend>
      </fieldset>
      <div className="flex flex-col gap-2">
        {recipients.map((author: Author) => (
          <Recipient
            key={author.id}
            author={author}
            onClick={onChangeAppeal}
            onDelete={onDelete}
          />
        )
        )}
      </div>
    </div>
  )
}

export default Recipients
