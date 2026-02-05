import { Link } from "react-router";

import { host } from "common/ajax";
import type { MyAuthor } from "../schema";
import { t } from "common/i18n/utils";

type Props = {
  author: MyAuthor;
}

const AuthorCard = ({ author }: Props) => {
  return (
    <div >
      <a href={`${host}/author/${author.id}`} className="mb-2">
        <div className="aspect-[2.5/1] flex flex-col shadow-md hover:shadow-xl rounded">
          <div className="flex flex-row justify-between h-4/5">
            <div className="avatar aspect-square">
              <img src={`${host}/${author.avatar}`} />
            </div>
            <div className="grow overflow-hidden px-2 pt-1">
              <h2 className="text-xl font-medium">{author.alias}</h2>
              <p className="text-balance italic">
                {author.info.slogan || '...'}
              </p>
            </div>
          </div>
        </div>
      </a>
      {author.owner ?
      <div className="text-end">
        <Link to={`/author/${author.id}`}>
          <button className="btn btn-sm">
            {t('Edit author')}
          </button>
        </Link>
        </div> : null}
    </div>
  )
}

export default AuthorCard
