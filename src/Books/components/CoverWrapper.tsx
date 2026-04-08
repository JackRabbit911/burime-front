import type { GetText } from "common/i18n/types";
import { Link } from "react-router";

type Props = {
  __: GetText;
  id: number;
  role: number;
  children?: React.ReactNode;
}

const CoverWrapper = ({ __, id, role, children }: Props) => {
  const branchEditor = (1 << 6) | (1 << 7)

  return (
    <div>
      <div className="relative border border-neutral-content bg-cover bg-center aspect-2/3 inline-size">
        {children}
      </div>
      {(role & branchEditor) ?
        <Link to={`/branch/${id}`}>
          <button className="btn btn-sm btn-outline w-full">
            {__('Edit branch')}
          </button>
        </Link> : null}
    </div>
  )
}

export default CoverWrapper
