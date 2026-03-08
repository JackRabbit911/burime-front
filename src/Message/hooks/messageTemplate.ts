import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useSearchParams } from "react-router";

import { $isPendingBlank, $messageBlank, getMessageBlankFx } from "Message/store";

export const useMessageTemplate = () => {
    const [searchParams] = useSearchParams()
    const [message, isPending] = useUnit([$messageBlank, $isPendingBlank])
    const search = searchParams.toString()

    if ( search.length > 0 ) {
        useEffect(() => {
            getMessageBlankFx(search)
        }, [])
    }
return { message, isPending }
}
