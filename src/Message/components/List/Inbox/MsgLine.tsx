import { useNavigate } from "react-router";
import type { Inbox } from "../../../types";
import MsgStatus from "../../MsgStatus";
import { host } from "../../../../common/ajax";

type Props = {
  message: Inbox;
}

const MsgLine = ({ message }: Props) => {
  let navigate = useNavigate();
  const path = `/message/in/${message.id}`

  return (
    <>
      <tr className="hover:bg-base-300 cursor-pointer" onClick={() => navigate(path)}>
        <td className="py-2">
          <MsgStatus status={message.status} />
        </td>
        <td className="py-2">
          {message.created}
        </td>
        <td className="py-2">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-10 w-10">
                <img src={`${host}/avatar/author/${message.from}`} alt={message.alias} />
              </div>
            </div>
            <div>
              <div className="font-bold">{message.alias}</div>
            </div>
          </div>
        </td>
        <td className="py-2">
          {message.to_alias}
        </td>
        <td className="py-2 w-42 overflow-hidden">
          {message.subject}
        </td>
      </tr>
    </>
  )
}

export default MsgLine
