import { useFormContext } from "react-hook-form";

import { isReady } from "Branch/utils";
import { isObjectEmpty } from "common/utils";
import { draftDeleted } from "Branch/store/delete";
import ConfirmDialog from "reused/InModal/ConfirmDialog";
import { modalClosed, modalOpened } from "reused/Modal/store";
import { draftClicked, published } from "Branch/store/publish";
import { draftSchema, finalSchema } from "Branch/schema/output";

type Props = {
  step: number;
}

const FinalControls = ({ step }: Props) => {
  const { watch, formState: { errors } } = useFormContext();

  if (step < 5) {
    return null
  }

  const values = watch()

  const onDelete = () => {
    const onYes = () => {
      modalClosed()
      draftDeleted(values.draft)
    }

    modalOpened(
      <ConfirmDialog
        text='Your draft will be deleted'
        onYes={onYes}
      />
    )
  }

  const onCancel = () => {
    modalOpened(
      <ConfirmDialog
        text='Branch creation/editing will be cancelled'
      />
    )
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

  return (
    <>
      <div className="flex flex-row justify-between gap-2">
        {values.draft ? (
          <button
            className="btn btn-error"
            onClick={onDelete}
          >
            Delete
          </button>
        ) : null}

        <button
          className="btn btn-error"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="btn"
          disabled={!isObjectEmpty(errors) || values.branch.id || !Boolean(values.branch.title)}
          onClick={onDraft}

        >
          Draft
        </button>
        <button
          className="btn btn-primary dark:btn-info"
          disabled={!isObjectEmpty(errors) || !isReady(values)}
          onClick={onPublish}
        >
          Publish
        </button>
      </div>
    </>
  )
}

export default FinalControls
