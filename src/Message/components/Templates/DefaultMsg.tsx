import { useUnit } from "effector-react";
import type { Message } from "../../types"
import { $toAlias } from "../../store";
import { t } from "../../../common/i18n/utils";

type Props = {
  message: Message;
}

const DefaultMsg = ({ message }: Props) => {
  const toAlias = useUnit($toAlias);
  const appeal = message.incoming && Object.hasOwn(message, 'to_alias') ? message.to_alias : toAlias

  return (
    <>
      <p>
        {t('Dear')}, {appeal},
      </p>
      <p>
        {message.data?.body ?? 'no body'}
      </p>
      <div className="fieldset mt-1 text-end">
        {t('Best regards')}, {message.from_alias}
      </div>
    </>
  )
}

export const defaultMsg = (props: Props) => <DefaultMsg {...props} />
export default DefaultMsg
