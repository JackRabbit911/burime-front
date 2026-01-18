import type { MsgData } from "../../types"

type Props = {
    data: MsgData;
}

const DefaultMsg = ({ data }: Props) => {
    return <>{data?.body ?? 'no body'}</>
}

export const defaultMsg = (props: Props) => <DefaultMsg { ...props } />
export default DefaultMsg
