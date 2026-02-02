import { useParams } from "react-router"
import { useFormContext } from "react-hook-form"

import Helper from "reused/Help"
import { t } from "common/i18n/utils"
import { submitDisabled } from "../utils"
import { authorDeleteFx } from "../store/delete"
import { helpBtnClicked } from "reused/Help/store"
import ConfirmDialog from "reused/InModal/ConfirmDialog"
import { closeBtn, modalOpened } from "reused/Modal/store"
import { memberIdResetted } from "reused/Participants/store/authors"

type Props = {
  status: number;
  view: string;
  setView: (data: string) => void;
}

const Controls = ({ status, view, setView }: Props) => {
  const { id } = useParams()
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

  const onCancel = () => {
    modalOpened(
      <ConfirmDialog
        text='Author/Group creation/editing will be cancelled'
      />
    )
  }

  const onYes = async () => {
    const response = await authorDeleteFx(id)
    const { result } = response.data

    closeBtn(true)
    modalOpened(result)
  }

  const onDelete = () => {
    modalOpened(
      <ConfirmDialog
        text='Your author/group will be deleted'
        onYes={onYes}
        link='authors'
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
          disabled={status == 2}
          onClick={onMembersClick}
        >
          {t('Participants')}
        </button> :
        <button
          type="button"
          className="btn"
          disabled={status == 2}
          onClick={onFormClick}
        >
          {t('Author form')}
        </button>
      }
      <button
        type="button"
        className="btn btn-error"
        onClick={onCancel}
      >
        {t('Cancel')}
      </button>
      <button
        type="button"
        className="btn btn-error"
        onClick={onDelete}
      >
        {t('Delete')}
      </button>
      <div className="col-span-2 md:col-start-3">
        <button
          type="submit"
          className="btn btn-primary dark:btn-info w-full"
          disabled={submitDisabled(author, errors)}
        >
          {t('Save')}
        </button>
      </div>
    </div>
  )
}

export default Controls
