import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useSearchParams } from "react-router";

import { $isPendingBlank, $messageBlank, getMessageBlankFx } from "Message/store";

export const useMessageTemplate = () => {
    const [searchParams] = useSearchParams()
    const [message, isPending] = useUnit([$messageBlank, $isPendingBlank])
    const search = searchParams.size > 0 ? '?' + searchParams.toString() : ''

    useEffect(() => {
        getMessageBlankFx(search)
    }, [])
    
    return { message, isPending }
}
