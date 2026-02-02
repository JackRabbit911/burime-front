import { useEffect } from "react";

import { host } from "common/ajax";
import { t } from "common/i18n/utils";
import { globalReset } from "common/store";
import { closeBtn, modalClosed } from "reused/Modal/store";

import type { FinalResponse } from "Branch/store/publish";

type Props = {
  response: FinalResponse;
}

const DialogSuccess = ({ response }: Props) => {
  console.log(response)

  const path = `${host}/my`

  const onClick = () => {
    modalClosed()
    globalReset()
    window.location.assign(path);
  }

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <div className="text-center">
      <h2 className="text-lg mb-3">
        {t('Yes! Your project was saved successful!')}
      </h2>
      <button
        className="btn btn-success"
        onClick={onClick}
      >
        {t('To the branch')}
      </button>
    </div>
  )
}

export default DialogSuccess
