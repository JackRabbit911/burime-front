import { Link, useLocation } from "react-router";

const titles: { [key: string]: string } = {
  home: 'Personal account',
  books: 'My Books',
  messages: 'My Messages',
  authors: 'My Authors',
}

type Props = {
  children?: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const location = useLocation();
  const uriSegments = location.pathname.split('/').filter((v) => Boolean(v))
  const addr = uriSegments[1] ?? 'home'

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-2xl lg:w-4xl bg-base-100 p-4">
        <div className="flex flex-roe justify-between mb-4">
          <h1 className="text-2xl">{titles[addr]}</h1>
          {addr === 'home' ?
            <a href="/auth/logout" className="btn btn-outline btn-error">Log Out</a> :
            <Link to='/my'>
              <button className="btn btn-outline">Back</button>
            </Link>
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default Wrapper
