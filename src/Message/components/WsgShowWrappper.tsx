import { useParams } from "react-router";
import type { Message } from "../types";
import MsgShowDel from "./MsgShowDel";
import MsgShowIn from "./MsgShowIn";
import MsgShowOut from "./MsgShowOut";

type Props = {
  message: Message;
}

const MsgShowWrapper = ({message }: Props) => {
  const { box } = useParams()

  switch (box) {
    case 'in':
      return <MsgShowIn message={message} />
    case 'out':
      return <MsgShowOut message={message} />
    case 'del':
      return <MsgShowDel message={message} />
    default:
      return `Invalid condition: ${box}`
  }
}

export default MsgShowWrapper
