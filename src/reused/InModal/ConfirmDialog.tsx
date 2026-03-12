import { useEffect } from "react";
import { Link } from "react-router";

import { useTranslate } from "common/i18n/hooks";
import { closeBtn, modalClosed } from "../Modal/store";

type Props = {
  onYes?: () => void;
  link?: string;
  onNo?: () => void;
  title?: string;
  text?: string;
}

const ConfirmDialog = ({
  onYes = () => { modalClosed() },
  onNo = () => { modalClosed() },
  link = '',
  title = 'Are You sure?',
  text = '' }: Props) => {

  const __ = useTranslate()

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-48">
      <div className="text-center w-full">
        <p>{__(text)} bebe</p>
        <h2 className="text-lg mb-3">
          {__(title)}
        </h2>
        <div className="flex justify-center gap-2">
          <button className="btn" onClick={onNo}>
            {__('No')}
          </button>
          <Link to={link}>
            <button className="btn btn-primary" onClick={onYes}>
              {__('Yes')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const confirmDialog = (props: Props) => <ConfirmDialog {...props} />
export default ConfirmDialog
