import { useAuthorsChoice } from "Message/hooks/authorsChioce"
import AuthorsChoice from "reused/Participants/components/AuthorsChoice"

const AuthorsChoiceWrapper = () => {
  const [
    authorsFilters,
    authorsList,
    recipients,
    authorsPayload,
    onChoice
  ] = useAuthorsChoice()
  
  return (
    <AuthorsChoice
      filters={authorsFilters}
      authors={authorsList}
      members={recipients}
      authorsPayload={authorsPayload}
      handler={onChoice}
    />
  )
}

export default AuthorsChoiceWrapper
