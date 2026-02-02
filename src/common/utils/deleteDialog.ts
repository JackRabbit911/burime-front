import { confirmDialog } from "reused/InModal/ConfirmDialog"
import { closeBtn, modalOpened } from "reused/Modal/store"
import ajax from "../ajax"

const yes = async (uri: string) => {
    const response = await ajax.delete(uri)
    const { result } = response.data
    closeBtn(true)
    modalOpened(result)
}

export const deleteDialog = (uri: string, text: string, link?: string) => {
    modalOpened(confirmDialog({
        text: text,
        onYes: () => yes(uri),
        link: link,
    }))
}
