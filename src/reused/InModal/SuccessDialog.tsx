import { useEffect } from "react";
import { Link } from "react-router";

import { useTranslate } from "common/i18n/hooks";
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
        <Link to={link}>
          <button
            className="btn btn-success"
            onClick={onClick}
          >
            {__(btn)}
          </button>
        </Link>
      </div>
    </div>
  )
}

export const successDialog = (props: Props) => <SuccessDialog {...props} />

export default SuccessDialog
