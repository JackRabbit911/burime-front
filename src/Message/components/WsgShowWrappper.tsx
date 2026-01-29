import type { Message } from "../types";
import MsgShowDel from "./MsgShowDel";
import MsgShowIn from "./MsgShowIn";
import MsgShowOut from "./MsgShowOut";

type Props = {
  cond: string;
  message: Message;
}

const MsgShowWrapper = ({ cond, message }: Props) => {
  switch (cond) {
    case 'in':
      return <MsgShowIn message={message} />
    case 'out':
      return <MsgShowOut message={message} />
    case 'del':
      return <MsgShowDel message={message} />
    default:
      return `Invalid condition: ${cond}`
  }
}

export default MsgShowWrapper
