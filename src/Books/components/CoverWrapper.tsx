import { Link } from "react-router";

type Props = {
  id: number;
  role: number;
  children?: React.ReactNode;
}

const CoverWrapper = ({ id, role, children }: Props) => {
  const branchEditor = 1 << 6

  return (
    <div>
      <div className="relative border border-neutral-content bg-cover bg-center aspect-2/3 inline-size">
        {children}
      </div>
      {(role & branchEditor) ?
        <Link to={`/branch/${id}`}>
          <button className="btn btn-sm btn-outline w-full">
            Edit branch
          </button>
        </Link> : null}
    </div>
  )
}

export default CoverWrapper
