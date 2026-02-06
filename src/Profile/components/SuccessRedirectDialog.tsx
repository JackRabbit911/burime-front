import { useEffect } from "react";

import { t } from "common/i18n/utils";
import { useTranslate } from "common/i18n/hook";
import { closeBtn, modalClosed } from "reused/Modal/store";

type Props = {
  title?: string;
  text?: string;
  btn?: string;
}

const SuccessRedirectDialog = ({
  title = 'Congratulations!',
  text = 'Your profile data was saved',
  btn = 'Ok' }: Props) => {

  const onClick = () => {
    modalClosed()
    window.location.replace("/my")
  }

  useTranslate()

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-48">
      <div className="text-center w-full">
        <h2 className="text-lg mb-3">
          {t(title)}
        </h2>
        <p className="mb-4">
          {t(text)}
        </p>
          <button
            className="btn btn-success"
            onClick={onClick}
          >
            {t(btn)}
          </button>
      </div>
    </div>
  )
}

export const successRedirectDialog = (props: Props) => <SuccessRedirectDialog {...props} />
export default SuccessRedirectDialog
