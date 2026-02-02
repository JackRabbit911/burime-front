import GenreCheckBox from "./GenreCheckBox";
import type { Genre } from "Branch/schema/input";

type Props = {
  genres: Genre;
  checked: number[];
  fieldName?: string;
}

const SameWeightGenres = ({ genres, checked }: Props) => {
  return (
    genres.map((option) => (
      <GenreCheckBox
        key={option.id}
        label={option.title}
        value={option.id}
        checked={checked}
      />
    ))
  )
}

export default SameWeightGenres
