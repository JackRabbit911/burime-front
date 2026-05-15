import { useAuthorsChoice } from "Message/hooks/authorsChioce"
import AuthorsChoice from "reused/Participants/components/AuthorsChoice"

const AuthorsChoiceWrapper = () => {
  const [
    recipients,
    authorsPayload,
    onChoice
  ] = useAuthorsChoice()
  
  return (
    <AuthorsChoice
      members={recipients}
      authorsPayload={authorsPayload}
      handler={onChoice}
    />
  )
}

export default AuthorsChoiceWrapper
