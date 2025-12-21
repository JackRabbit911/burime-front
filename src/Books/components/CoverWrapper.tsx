type Props = {
  role: number;
  children?: React.ReactNode;
}

const CoverWrapper = ({ role, children }: Props) => {
  const branchEditor = 1 << 6

  return (
    <div>
      <div className="relative border border-neutral-content bg-cover bg-center aspect-2/3 inline-size">
        {children}
      </div>
      {(role & branchEditor) ?
        <button className="btn btn-sm btn-outline w-full">
          Edit branch
        </button> : null}
    </div>
  )
}

export default CoverWrapper
