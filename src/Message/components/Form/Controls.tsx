import { t } from "../../../common/i18n/utils";
import { useControls } from "../../hooks/controls";

type Props = {
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ view, setView }: Props) => {
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
        {t('Help')}
      </button>
      {view === 'form' ?
        <button
          type="button"
          className="btn"
          onClick={onChoiceClick}
        >
          {t('Choice recipients')}
        </button> :
        <button
          type="button"
          className="btn"
          onClick={onFormClick}
          disabled={formBtnDisabled}
        >
          {t('Write message')}
        </button>
      }
      <button
        type="button"
        className="btn btn-error"
        onClick={onCancel}
      >
        {t('Cancel')}
      </button>
      {view === 'form' ?
        <button
          type="submit"
          className="btn btn-primary dark:btn-info w-full"
          disabled={submitDisabled}
        >
          {t('Send')}
        </button> : null}
    </div>
  )
}

export default Controls
