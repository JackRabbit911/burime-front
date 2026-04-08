import Loading from "./Loading";
import ErrorCmp from "./ErrorCmp";

type Props = {
  isLoading: boolean;
  status: number;
  children?: React.ReactNode;
}

const ErrorOrPending = ({ isLoading, status, children }: Props) => (
  <>
    {status >= 400 ?
      <ErrorCmp status={status} /> :
      (isLoading ? <Loading message="Loading" /> : children)}
  </>
)

export default ErrorOrPending
