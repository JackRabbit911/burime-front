type Props = {
  children: React.ReactNode;
}

const Grid3Cols = ({ children }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {children}
    </div>
  )
}

export default Grid3Cols
