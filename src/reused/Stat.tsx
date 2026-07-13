import { Link } from "react-router"
import type { ReactNode } from "react";
import { classMap } from "common/constants";

type Props = {
  path: string,
  title?: string,
  value?: string | number,
  color?: string,
  icon?: ReactNode,
  desc?: string,
};

const Stat = ({ path, title = '', value = '', icon = '', color = 'default', desc = '' }: Props) => {
  return (
    <div className="text-center border border-zinc-600 rounded-sm">
      <div className="stats">
        <Link to={path}>
          <div className="stat p-0 gap-0">
            <div className={classMap.figure[color]}>
              {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className={classMap.value[color]}>{value}</div>
            <div className="stat-desc">{desc}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Stat
