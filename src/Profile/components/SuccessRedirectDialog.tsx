import { useEffect } from "react";
;
import { useTranslate } from "common/i18n/hooks";
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

  const __ = useTranslate()

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-48">
      <div className="text-center w-full">
        <h2 className="text-lg mb-3">
          {__(title)}
        </h2>
        <p className="mb-4">
          {__(text)}
        </p>
          <button
            className="btn btn-success"
            onClick={onClick}
          >
            {__(btn)}
          </button>
      </div>
    </div>
  )
}

export const successRedirectDialog = (props: Props) => <SuccessRedirectDialog {...props} />
export default SuccessRedirectDialog
