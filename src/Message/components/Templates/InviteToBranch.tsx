import { t } from "common/i18n/utils";
import type { Message } from "../../types"
import CoverWrapper from "Message/components/CoverWrapper";

type Props = {
  message: Message;
}

const InviteToBranch = ({ message }: Props) => {
  const branchId = message.data.branch

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <CoverWrapper branchId={branchId} />
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
    </>
  )
}

export const inviteToBranch = (props: Props) => <InviteToBranch {...props} />
export default InviteToBranch
