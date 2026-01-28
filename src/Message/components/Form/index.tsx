import { useUnit } from "effector-react"
import { t } from "../../../common/i18n/utils"
import Textarea from "../../../reused/Textarea"
import TextInput from "../../../reused/TextInput"
import { $toAlias } from "../../store"
import ConditionalInput from "../Templates/ConditionalInput"
import { useFormContext } from "react-hook-form"
import { $ownAuthors } from "../../../common/store/ownAuthors"
import type { OwnAuthor } from "../../../reused/Participants/types"

const getAuthorAlias = (id: number | string, authors: OwnAuthor[]): string => {
  const author = authors.find(item => item.id == id)
  return author !== undefined ? author.alias : ''
}

const Form = () => {
  const appeal = useUnit($toAlias)
  const ownAuthors = useUnit($ownAuthors)
  const { watch } = useFormContext()
  const from = watch('message.from')

  const fromAlias = getAuthorAlias(from, ownAuthors)

  return (
    <>
      <TextInput
        fieldName="message.subject"
        label={t('Subject')}
        optional={t('Up to % words', 10)}
        placeholder={t('Message subject')}
      />
      <ConditionalInput
        fieldName="message.data.appeal"
        label={t('Appeal')}
        message={t('Dear, %!', appeal)}
        placeholder={t('Dear, Username!')}
        checkboxLabel={t('Generate an appeal automatically')}
      />
      <Textarea
        fieldName="message.data.body"
        label={t('Message')}
        optional={t('Up to % words', 200)}
        placeholder={t('Message body')}
        rows={6}
      />
      <ConditionalInput
        fieldName="message.data.signature"
        label={t('Signature')}
        message={t('Best regards, %', fromAlias)}
        placeholder={t('Best regards, %', fromAlias)}
        checkboxLabel={t('Generate signature automatically')}
      />
    </>
  )
}

export default Form
