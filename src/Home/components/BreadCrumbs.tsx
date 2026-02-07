import { t } from "common/i18n/utils";
import { globalReset } from "common/store";
import { Link } from "react-router";

const ifMessage = (segment: string) => {
  switch (segment) {
    case 'in':
      return ['message/inbox', 'Inbox']
    case 'out':
      return ['message/outbox', 'Outbox']
    case 'del':
      return ['message/deleted', 'Deleted']
  }
}

const breadCrumbsArray = (pathname: string) => {
  const pathArray = pathname.replace(/\//, '').split(/\/+/)
  const links = []

  if (pathArray.length > 1) {
    switch (pathArray[0]) {
      case 'branch':
        links.push(['books', 'My Books'])
        break
      case 'author':
        links.push(['authors', 'My Authors'])
        break
      case 'message':
        if (pathArray[1]) {
          links.push(ifMessage(pathArray[1]))
        }
        break
    }
  }

  return links
}

type Props = {
  pathname: string;
}

const BreadCrumbs = ({ pathname }: Props) => {
  const links = breadCrumbsArray(pathname) || []

  return (
    <div className="flex flex-row mt-3 text-sm">
      <Link to=''>
        <span className="link" onClick={() => globalReset()}>{t('Personal account')}</span>
      </Link>
      {links.filter(item => item !== undefined).map((item, key) => (
        <div key={key}>
          <span className="ms-2 opacity-50">/</span>
          <Link to={item[0]}>
            <span className="link ms-2">{t(item[1])} </span>
          </Link>
        </div>
      ))}

    </div>
  )
}

export default BreadCrumbs
