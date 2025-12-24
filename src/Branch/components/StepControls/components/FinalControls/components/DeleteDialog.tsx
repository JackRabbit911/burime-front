import { useEffect } from "react";
import { closeBtn, modalClosed } from "../../../../../../reused/Modal/store";
import { draftDeleted } from "../../../../../store/delete";
import { globalReset } from "../../../../../../common/store";

type Props = {
  id: number;
}

const DeleteDialog = ({ id }: Props) => {
  const onYes = (id: number) => () => {
    draftDeleted(id)
    globalReset()
    window.location.href = '/my'
  }

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <>
      <h3>
        Вы уверены, что хотите удалить ветку?
      </h3>
      <div className="flex justify-center gap-2">
        <button className="btn" onClick={() => { modalClosed() }}>
          No
        </button>
        <button className="btn btn-primary" onClick={onYes(id)}>
          Yes
        </button>
      </div>
    </>
  )
}

export default DeleteDialog
