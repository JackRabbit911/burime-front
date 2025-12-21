import { useParams } from "react-router"

const Branch = () => {
  const { id } = useParams()

  console.log(id)

  return (
    <>
      Create/edit branch {id}
    </>
  )
}

export default Branch
