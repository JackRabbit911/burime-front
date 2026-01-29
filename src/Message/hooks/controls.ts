import { useFormContext } from "react-hook-form"
import { helper } from "../../reused/Help"
import type { NewRecipient } from "../schema"
import { isObjectEmpty } from "../../common/utils"
import { modalOpened } from "../../reused/Modal/store"
import { helpBtnClicked } from "../../reused/Help/store"
import { confirmDialog } from "../../reused/InModal/ConfirmDialog"

export const useControls = (setView: (data: string) => void) => {
    const { getValues, watch, formState: { errors } } = useFormContext()
    const recipients = getValues('recipients') as NewRecipient[]

    const onHelpClick = (path: string) => () => {
        helpBtnClicked(path)
        modalOpened(helper({ path }))
    }

    const onChoiceClick = () => {
        setView('choice')
    }

    const onFormClick = () => {
        setView('form')
    }

    const onCancel = () => {
        modalOpened(
            confirmDialog({
                text: 'Message creation will be cancelled',
                link: '/message/list',
            })
        )
    }

    const submitDisabled = (
        !isObjectEmpty(errors) ||
        recipients.length === 0 ||
        watch('message.subject') === '' ||
        watch('message.subject') === undefined
    )

    const formBtnDisabled = recipients.length === 0

    return {
        onHelpClick,
        onChoiceClick,
        onFormClick,
        onCancel,
        submitDisabled,
        formBtnDisabled
    }
}
