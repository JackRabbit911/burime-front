import { useTranslate } from "common/i18n/hooks"

const Loading = () => {
  const __ = useTranslate()

  return (
    <div className="flex flex-col justify-center min-h-48">
      <div className="text-center w-full">
        <span className="text-xl">
          {__('Wait, please')}
        </span>
        <span className="loading loading-dots loading-xs ms-1.5 mt-2.5"></span>
      </div>
    </div>
  )
}

export const loading = <Loading />

export default Loading
