import { useNavigate } from "react-router";
import type { Delbox } from "Message/types";

type Props = {
  message: Delbox;
}

const MsgLine = ({ message }: Props) => {
  let navigate = useNavigate();
  const path = `/message/del/${message.id}`

  return (
    <tr className="hover:bg-base-300 cursor-pointer" onClick={() => navigate(path)}>
      <td className="py-2 w-42 overflow-hidden">
        {message.subject}
      </td>
    </tr>
  )
}

export default MsgLine
