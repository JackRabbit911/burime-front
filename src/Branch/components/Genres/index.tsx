import { useFormContext } from "react-hook-form";

import { getObjectProp } from "common/utils";
import { useGetText } from "common/i18n/hooks";
import SameWeightGenres from "./components/SameWeightGenres";

import type { Genre } from "../../schema/input";

type Props = {
  step: number;
  genres: Genre[];
  checked: number[];
  fieldName?: string;
}

const Genres = ({ step, genres, checked, fieldName = 'branch_genres' }: Props) => {
  const __ = useGetText()
  const { getValues, formState: { errors } } = useFormContext();
  const err = getObjectProp(errors, fieldName)

  if (step !== 1) {
    return null
  }
  
  checked = getValues(fieldName) || checked

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend my-3">{__("Genres")}</legend>
      {genres.map((group, key) => (
        <div key={key}>
          {key as number > 0 ? <div className="divider w-full my-0"></div> : null}
          <div className="flex flex-wrap gap-4">
            <SameWeightGenres
              genres={group}
              checked={checked}
            />
          </div>
        </div>
      ))}
      <div className="fieldset-label text-error">
        {err?.message as string}
      </div>
    </fieldset>
  )
};

export default Genres;
