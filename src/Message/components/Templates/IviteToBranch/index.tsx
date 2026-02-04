import { t } from "common/i18n/utils";
import CoverWrapper from "Message/components/CoverWrapper";
import type { Message } from "Message/types";
import Controls from "./Controls";

type Props = {
  message: Message;
}

const InviteToBranch = ({ message }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <CoverWrapper branchId={message.data.branch} />
        <div>
          <p>
            {message.data.appeal},
          </p>
          <p>
            {message.data?.body ?? 'no body'}
          </p>
          <div className="fieldset mt-1 text-end">
            {t('Best regards')}, {message.from_alias}
          </div>
        </div>
      </div>
      <Controls
        branch={message.data.branch}
        author={message.to as number}
      />
    </>
  )
}

export const inviteToBranch = (props: Props) => <InviteToBranch {...props} />
export default InviteToBranch
