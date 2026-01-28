import { useNavigate } from "react-router";
import type { Outbox } from "../../types"
import MsgStatus from "../MsgStatus";

type Props = {
  message: Outbox;
}

const OutMsgLine = ({ message }: Props) => {
  let navigate = useNavigate();
  const path = `/message/${message.id}`
  const recipients = JSON.parse(message.to).join(', ')

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
              <div className="font-bold">{message.from}</div>
          </div>
        </td>
        <td className="py-2">
          {recipients}
        </td>
        <td className="py-2 w-42 overflow-hidden">
          {message.subject}
        </td>
      </tr>
    </>
  )
}

export default OutMsgLine
