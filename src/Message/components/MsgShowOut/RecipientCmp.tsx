import { host } from "common/ajax";
import MsgStatus from "../MsgStatus";
import { toAliasSetted } from "Message/store";
import type { Recipient } from "Message/types";

type Props = {
  recipient: Recipient;
}

const RecipientCmp = ({ recipient }: Props) => {
  const onChangeAppeal = (alias: string) => () => {
    toAliasSetted(alias)
  }

  return (
    <tr
      className="hover:bg-base-300 cursor-pointer"
      onClick={onChangeAppeal(recipient.alias)}
    >
      <td className="ps-0">
        {recipient.alias}
      </td>
      <td className="ps-0">
        <div className="avatar">
          <div className="mask mask-squircle h-10 w-10">
            <img src={`${host}/avatar/author/${recipient.id}`} alt={recipient.alias} />
          </div>
        </div>
      </td>
      <td className="pt-2 px-0">
        <MsgStatus status={recipient.status} />
      </td>
    </tr>
  )
}

export default RecipientCmp
