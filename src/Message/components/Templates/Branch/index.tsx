import { useGetText } from "common/i18n/hooks";
import { useUnit } from "effector-react";
import CoverWrapper from "Message/components/CoverWrapper";
import { $toAlias } from "Message/store";

import type { Message } from "Message/types";

type Props = {
  message: Message;
}

const Branch = ({ message }: Props) => {
  const toAlias = useUnit($toAlias);
  const appeal = message.data.appeal ??
    (message.incoming && Object.hasOwn(message, 'to_alias')) ?
    message.to_alias : toAlias

  const __ = useGetText()
  const signature = message.data.signature ?? __('Best regards') + ', ' + message.from_alias

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <CoverWrapper branchId={message.data.branch} />
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <p>
              {appeal},
            </p>
            <p>
              {message.data?.body ?? 'no body'}
            </p>
          </div>
          <div className="fieldset mt-1 text-end">
            {signature}
          </div>
        </div>
      </div>
    </>
  )
}

export default Branch
