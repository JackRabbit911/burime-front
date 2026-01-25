import { helpBtnClicked } from "../../../reused/Help/store";
import { modalOpened } from "../../../reused/Modal/store";
import Helper from "../../../reused/Help";
import ConfirmDialog from "../../../reused/InModal/ConfirmDialog";
import { t } from "../../../common/i18n/utils";

type Props = {
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ view, setView }: Props) => {
  const onHelpClick = (path: string) => () => {
    helpBtnClicked(path)
    modalOpened(<Helper path={path} />)
  }

  const onChoiceClick = () => {
    setView('choice')
  }

  const onFormClick = () => {
    setView('form')
  }

  const onCancel = () => {
    modalOpened(
      <ConfirmDialog
        text='Message creation will be cancelled'
        link='/message/list'
      />
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
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
          // disabled={submitDisabled(author, errors)}
        >
          {t('Send')}
        </button> : null}
      </div>

  )
}

export default Controls
