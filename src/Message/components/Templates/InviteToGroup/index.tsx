import type { Message } from "../../../types"
import { host } from "common/ajax";
import Controls from "./Controls";
import { useGetText } from "common/i18n/hooks";

type Props = {
  message: Message;
}

const InviteToGroup = ({ message }: Props) => {
  const __ = useGetText()

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <a href={`${host}/author/${message.data.group}`}>
          <div className="avatar aspect-square">
            <img src={`${host}/avatar/author/${message.data.group}`} />
          </div>
        </a>
        <div className="col-span-2">
          <p>
            {message.data.appeal},
          </p>
          <p>
            {message.data?.body ?? 'no body'}
          </p>
          <div className="fieldset mt-1 text-end">
            {__('Best regards')}, {message.from_alias}
          </div>
        </div>
      </div>
      <Controls
        __={__}
        group={message.data.group}
        author={message.to as number}
      />
    </>
  )
}

export const inviteToGroup = (props: Props) => <InviteToGroup {...props} />
export default InviteToGroup
