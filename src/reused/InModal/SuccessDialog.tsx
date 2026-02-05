import { useEffect } from "react";
import { Link } from "react-router";

import { t } from "common/i18n/utils";
import { useTranslate } from "common/i18n/hook";
import { closeBtn, modalClosed } from "../Modal/store";

type Props = {
  title?: string;
  text?: string;
  link?: string;
  btn?: string;
}

const SuccessDialog = ({
  title = 'Congratulations!',
  text = 'Data saved successfully',
  link = '',
  btn = 'Ok' }: Props) => {

  const onClick = () => {
    modalClosed()
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
        <Link to={link}>
          <button
            className="btn btn-success"
            onClick={onClick}
          >
            {t(btn)}
          </button>
        </Link>
      </div>
    </div>
  )
}

export const successDialog = (props: Props) => <SuccessDialog {...props} />

export default SuccessDialog
