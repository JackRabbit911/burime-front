import Loading from "./Loading";
import ErrorCmp from "./ErrorCmp";
import { useUnit } from "effector-react";
import { $status } from "common/store";

type Props = {
  isLoading: boolean;
  children?: React.ReactNode;
}

const ErrorOrPending = ({ isLoading, children }: Props) => {
  const status = useUnit($status)

  return (
    <>
      {status >= 400 ?
        <ErrorCmp status={status} /> :
        (isLoading ? <Loading message="Loading" /> : children)}
    </>
  )
}

export default ErrorOrPending
