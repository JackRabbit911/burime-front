import { isReady } from "Branch/utils";
import { isObjectEmpty } from "common/utils";
import { useFinalControls } from "../../hooks/finalControls";

type Props = {
  step: number;
}

const FinalControls = ({ step }: Props) => {
  if (step < 5) {
    return null
  }

  const {
    values,
    errors,
    onDelete,
    onCancel,
    onPublish,
    onDraft
  } = useFinalControls()

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
