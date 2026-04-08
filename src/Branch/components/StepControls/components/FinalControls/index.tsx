import { isReady } from "Branch/utils";
import { isObjectEmpty } from "common/utils";
import { useFinalControls } from "../../hooks/finalControls";
import type { GetText } from "common/i18n/types";

type Props = {
  step: number;
  __: GetText;
}

const FinalControls = ({ step, __ }: Props) => {
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
            {__('Delete')}
          </button>
        ) : null}

        <button
          className="btn btn-error"
          onClick={onCancel}
        >
          {__('Cancel')}
        </button>
        <button
          className="btn"
          disabled={!isObjectEmpty(errors) || values.branch.id || !Boolean(values.branch.title)}
          onClick={onDraft}

        >
          {__('Draft')}
        </button>
        <button
          className="btn btn-primary dark:btn-info"
          disabled={!isObjectEmpty(errors) || !isReady(values)}
          onClick={onPublish}
        >
          {__('Publish')}
        </button>
      </div>
    </>
  )
}

export default FinalControls
