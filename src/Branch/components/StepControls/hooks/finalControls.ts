import { useFormContext } from "react-hook-form";

import { draftDeleted } from "Branch/store/delete";
import { confirmDialog } from "reused/InModal/ConfirmDialog";
import { modalClosed, modalOpened } from "reused/Modal/store";
import { draftClicked, published } from "Branch/store/publish";
import { draftSchema, finalSchema } from "Branch/schema/output";

export const useFinalControls = () => {
    const { watch, formState: { errors } } = useFormContext();

    const values = watch()

    const onDelete = () => {
        const onYes = () => {
            modalClosed()
            draftDeleted(values.draft)
        }

        modalOpened(confirmDialog({
            text: 'Branch creation/editing will be cancelled',
            onYes: onYes,
        }))
    }

    const onCancel = () => {
        modalOpened(confirmDialog({
            text: 'Branch creation/editing will be cancelled'
        }))
    }

    const onPublish = () => {
        const valid = finalSchema.safeParse(values)

        if (valid?.error) {
            console.log(valid.error, values)
        }

        if (valid?.success && valid?.data) {
            published(valid.data)
        }
    }

    const onDraft = () => {
        const valid = draftSchema.safeParse(values)

        if (valid?.error) {
            console.log(valid.error, values)
        }

        if (valid?.success && valid?.data) {
            draftClicked(valid.data)
        }
    }

    return {
        values,
        errors,
        onDelete,
        onCancel,
        onPublish,
        onDraft,
    }
}
