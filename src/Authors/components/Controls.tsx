import { t } from "../../common/i18n/utils"
import Helper from "../../reused/Help"
import { helpBtnClicked } from "../../reused/Help/store"
import { modalOpened } from "../../reused/Modal/store"

type Props = {
  status: number;
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ status, view, setView }: Props) => {
  const onHelpClick = (path: string) => () => {
    helpBtnClicked(path)
    modalOpened(<Helper path={path} />)
  }

  const onMembersClick = () => {
    setView('members')
  }

  const onFormClick = () => {
    setView('form')
  }

  return (
    <div className="flex justify-end gap-2 mt-2">
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
          disabled={status==2}
          onClick={onMembersClick}
        >
          {t('Participants')}
        </button> :
        <button
          type="button"
          className="btn"
          disabled={status==2}
          onClick={onFormClick}
        >
          {t('Author form')}
        </button>
      }
      <button
        type="button"
        className="btn btn-error"
      >
        {t('Delete')}
      </button>
      <button
        type="submit"
        className="btn btn-primary dark:btn-info"
      >
        {t('Save')}
      </button>
    </div>
  )
}

export default Controls
