import { useUnit } from "effector-react";

import Textarea from "reused/Textarea"
import { $toAlias } from "Message/store";
import TextInput from "reused/TextInput";
import { getAuthorAlias } from "Message/utils";
import ConditionalInput from "../ConditionalInput"
import { $ownAuthors } from "common/store/ownAuthors";

import type { MessageForm } from "Message/schema";
import { useGetText } from "common/i18n/hooks";

type Props = {
  message: MessageForm;
}

const DefaultForm = ({ message }: Props) => {
  const appeal = useUnit($toAlias)
  const ownAuthors = useUnit($ownAuthors)
  const fromAlias = getAuthorAlias(message.message.from, ownAuthors)
  const __ = useGetText()

  return (
    <>
      <TextInput
        fieldName="message.subject"
        label={__('Subject')}
        optional={__('Up to % words', 10)}
        placeholder={__('Message subject')}
      />
      <ConditionalInput
        fieldName="message.data.appeal"
        label={__('Appeal')}
        message={__('Dear, %!', appeal)}
        placeholder={__('Dear, Username!')}
        checkboxLabel={__('Generate an appeal automatically')}
      />
      <Textarea
        fieldName="message.data.body"
        label={__('Message')}
        optional={__('Up to % words', 200)}
        placeholder={__('Message body')}
        rows={6}
      />
      <ConditionalInput
        fieldName="message.data.signature"
        label={__('Signature')}
        message={__('Best regards, %', fromAlias)}
        placeholder={__('Best regards, %', fromAlias)}
        checkboxLabel={__('Generate signature automatically')}
      />
    </>
  )
}

export default DefaultForm
