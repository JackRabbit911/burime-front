import Envelope from "reused/icons/Envelope";
import EnvelopeOpen from "reused/icons/EnvelopeOpen";

type Props = {
    status: number;
}

const MsgStatus = ({ status }: Props) => {
    if (status > 110) {
        return <Envelope color="text-error" />
    } else if (status > 90) {
        return <Envelope color="text-success" />
    } else if (status < 90) {
        return <EnvelopeOpen color="text-neutral-content" />
    } else {
        return null
    }
}

export default MsgStatus
