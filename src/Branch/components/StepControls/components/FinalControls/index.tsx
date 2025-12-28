import { useFormContext } from "react-hook-form";
import CancelDialog from "../CancelDialog";
import DeleteDialog from "./components/DeleteDialog";
import { modalOpened } from "../../../../../reused/Modal/store";
import { draftSchema, finalSchema } from "../../../../schema/output";
import { isObjectEmpty } from "../../../../../common/utils";
import { isReady } from "../../../../utils";
import { draftClicked, published } from "../../../../store/publish";

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
    modalOpened(<DeleteDialog id={values.draft} />)
  }

  const onCancel = () => {
    modalOpened(<CancelDialog />)
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
