import { useUnit } from "effector-react";

import { $toAlias } from "../../store";
import type { Message } from "../../types"
import { useTranslate } from "common/i18n/hooks";

type Props = {
  message: Message;
}

const DefaultMsg = ({ message }: Props) => {
  const toAlias = useUnit($toAlias);
  const appeal = message.incoming && Object.hasOwn(message, 'to_alias') ? message.to_alias : toAlias
  const __ = useTranslate()

  return (
    <>
      <p>
        {__('Dear')}, {appeal},
      </p>
      <p>
        {message.data?.body ?? 'no body'}
      </p>
      <div className="fieldset mt-1 text-end">
        {__('Best regards')}, {message.from_alias}
      </div>
    </>
  )
}

export const defaultMsg = (props: Props) => <DefaultMsg {...props} />
export default DefaultMsg
