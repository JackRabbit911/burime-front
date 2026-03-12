import { useControls } from "Message/hooks/controls";
import type { GetText } from "common/i18n/types";

type Props = {
  __: GetText
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ __, view, setView }: Props) => {
  const {
    onHelpClick,
    onChoiceClick,
    onFormClick,
    onCancel,
    submitDisabled,
    formBtnDisabled
  } = useControls(setView)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
      <button
        type="button"
        onClick={onHelpClick('create_author')}
        className="btn btn-success"
      >
        {__('Help')}
      </button>
      {view === 'form' ?
        <button
          type="button"
          className="btn"
          onClick={onChoiceClick}
        >
          {__('Choice recipients')}
        </button> :
        <button
          type="button"
          className="btn"
          onClick={onFormClick}
          disabled={formBtnDisabled}
        >
          {__('Write message')}
        </button>
      }
      <button
        type="button"
        className="btn btn-error"
        onClick={onCancel}
      >
        {__('Cancel')}
      </button>
      {view === 'form' ?
        <button
          type="submit"
          className="btn btn-primary dark:btn-info w-full"
          disabled={submitDisabled}
        >
          {__('Send')}
        </button> : null}
    </div>
  )
}

export default Controls
