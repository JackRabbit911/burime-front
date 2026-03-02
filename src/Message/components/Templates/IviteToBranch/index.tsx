import { t } from "common/i18n/utils";
import CoverWrapper from "Message/components/CoverWrapper";
import type { Message } from "Message/types";
import Controls from "./Controls";

type Props = {
  message: Message;
}

const InviteToBranch = ({ message }: Props) => {
  const author: number|undefined = typeof(message.to) === 'number' ? message.to : undefined
  
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <CoverWrapper branchId={message.data.branch} />
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <p>
              {message.data.appeal},
            </p>
            <p>
              {message.data?.body ?? 'no body'}
            </p>
          </div>
          <div className="fieldset mt-1 text-end">
            {t('Best regards')}, {message.from_alias}
          </div>
        </div>
      </div>
      <Controls
        branch={message.data.branch}
        author={author}
      />
    </>
  )
}

export const inviteToBranch = (props: Props) => <InviteToBranch {...props} />
export default InviteToBranch
