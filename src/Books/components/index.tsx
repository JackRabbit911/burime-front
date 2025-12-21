import { useUnit } from "effector-react"
import { $myBooks, getMyBooksFx } from "../store"
import { useEffect } from "react"

const Books = () => {
  const myBooks = useUnit($myBooks)
  
  useEffect(() => {
    getMyBooksFx()
  }, [])
  
  console.log(myBooks)
  return (
    <>
      My Books list
    </>
  )
}

export default Books
