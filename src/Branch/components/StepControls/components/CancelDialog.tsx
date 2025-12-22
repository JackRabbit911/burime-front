import { useEffect } from "react"
import { globalReset } from "../../../../common/store"
import { closeBtn, modalClosed } from "../../../../reused/Modal/store"

const CancelDialog = () => {
  const onYes = () => {
    globalReset()
    window.location.href = '/'
  }

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <>
      <h3>
        Вы уверены, что хотите прервать создание/изменение ветки?
      </h3>
      <div className="flex justify-center gap-2">
        <button className="btn" onClick={() => { modalClosed() }}>
          No
        </button>
        <button className="btn btn-primary" onClick={onYes}>
          Yes
        </button>
      </div>
    </>
  )
}

export default CancelDialog
