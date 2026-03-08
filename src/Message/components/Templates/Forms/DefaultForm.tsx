import { useUnit } from "effector-react";

import { t } from "common/i18n/utils"
import Textarea from "reused/Textarea"
import { $toAlias } from "Message/store";
import TextInput from "reused/TextInput";
import { getAuthorAlias } from "Message/utils";
import ConditionalInput from "../ConditionalInput"
import { $ownAuthors } from "common/store/ownAuthors";

import type { MessageForm } from "Message/schema";

type Props = {
  message: MessageForm;
}

const DefaultForm = ({ message }: Props) => {
  const appeal = useUnit($toAlias)
  const ownAuthors = useUnit($ownAuthors)
  const fromAlias = getAuthorAlias(message.message.from, ownAuthors)

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

export default DefaultForm
