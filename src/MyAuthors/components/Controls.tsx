import { useFormContext } from "react-hook-form"
import { t } from "../../common/i18n/utils"
import { submitDisabled } from "../utils"
import Helper from "../../reused/Help"
import { modalOpened } from "../../reused/Modal/store"
import { helpBtnClicked } from "../../reused/Help/store"
import { memberIdResetted } from "../../reused/Participants/store/authors"

type Props = {
  status: number;
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ status, view, setView }: Props) => {
  const { getValues, formState: { errors } } = useFormContext()
  const author = getValues('author')

  const onHelpClick = (path: string) => () => {
    helpBtnClicked(path)
    modalOpened(<Helper path={path} />)
  }

  const onMembersClick = () => {
    memberIdResetted()
    setView('members')
  }

  const onFormClick = () => {
    memberIdResetted()
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
        disabled={submitDisabled(author, errors)}
      >
        {t('Save')}
      </button>
    </div>
  )
}

export default Controls
