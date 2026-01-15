type Props = {
  children: React.ReactNode;
}

const Cols3LayOut = ({ children }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {children}
    </div>
  )
}

export default Cols3LayOut
