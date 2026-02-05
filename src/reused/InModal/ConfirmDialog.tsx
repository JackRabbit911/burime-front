import { useEffect } from "react";
import { Link } from "react-router";

import { t } from "common/i18n/utils";
import { useTranslate } from "common/i18n/hook";
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

  useTranslate()

  useEffect(() => {
    closeBtn(false)
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-48">
      <div className="text-center w-full">
        <p>{t(text)}</p>
        <h2 className="text-lg mb-3">
          {t(title)}
        </h2>
        <div className="flex justify-center gap-2">
          <button className="btn" onClick={onNo}>
            No
          </button>
          <Link to={link}>
            <button className="btn btn-primary" onClick={onYes}>
              Yes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const confirmDialog = (props: Props) => <ConfirmDialog {...props} />
export default ConfirmDialog
