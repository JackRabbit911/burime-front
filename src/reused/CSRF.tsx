import { useFormContext } from "react-hook-form";

const CSRF = () => {
  const { register } = useFormContext();

  return (
    <input
      type='hidden'
      {...register('_csrf')}
    />
  )
}

export default CSRF
