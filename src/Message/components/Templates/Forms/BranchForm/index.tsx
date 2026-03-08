import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useSearchParams } from "react-router";

import { t } from "common/i18n/utils";
import { $toAlias } from "Message/store";
import { getAuthorAlias } from "Message/utils";
import { useFormContext } from "react-hook-form";
import { $ownAuthors } from "common/store/ownAuthors";
import CoverWrapper from "Message/components/CoverWrapper";

import type { MessageForm } from "Message/schema";
import TextInput from "reused/TextInput";

type Props = {
  message: MessageForm;
}

const BranchForm = ({ message }: Props) => {
  const ownAuthors = useUnit($ownAuthors)
  const appeal = useUnit($toAlias)
  const { setValue, register } = useFormContext()
  const [searchParams] = useSearchParams()
  const branchId = searchParams.get('branch')
  const fromAlias = getAuthorAlias(message.message.from, ownAuthors)
  const cover = branchId ? <CoverWrapper branchId={branchId} /> : null

  useEffect(() => {
    const signature = t('Best regards, %', fromAlias)
    setValue('message.data.signature', signature)
  }, [fromAlias])

  useEffect(() => {
    const dear = t('Dear, %', appeal)
    setValue('message.data.appeal', dear)
  }, [appeal])

  return (
    <>
      <TextInput
        fieldName="message.subject"
        label={t('Subject')}
        optional={t('Up to % words', 10)}
        placeholder={t('Message subject')}
      />
      <div className="grid grid-cols-3 gap-4 pt-4">
        {cover}
        <div className="col-span-2 flex flex-col justify-between gap-1">
          <input
            className="input input-md w-full"
            {...register('message.data.appeal')}
            defaultValue={t('Dear, %!', appeal)}
          />
          <textarea
            className="textarea w-full h-full"
            {...register('message.data.body')}
          />
          <input
            className="input input-md w-full"
            {...register('message.data.signature')}
          />
        </div>
      </div>
    </>
  )
}

export default BranchForm
