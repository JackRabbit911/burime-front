import { useTranslate } from "common/i18n/hooks";

type Props = {
  message?: string;
}

const Loading = ({ message = '' }: Props) => {
  const __ = useTranslate()

  return (
    <div className="flex flex-col justify-center min-h-64">
      <div className="text-center w-full">
        {Boolean(message) && (
          <span className="text-2xl">{__(message)}</span>
        )}
        <span className="loading loading-dots loading-xs ms-1.5 mt-2.5"></span>
      </div>
    </div>
  )
}

export default Loading
