import { Link } from "react-router"
import type { ReactNode } from "react";

type Props = {
  path: string,
  title: string,
  value: string | number,
  color?: string,
  icon?: ReactNode,
  desc?: string,
};

const Stat = ({ path, title, value, icon, color = 'default', desc = '' }: Props) => {
  const classMap: { [key: string]: { [key: string]: string } } = {
    figure: {
      primary: "stat-figure text-primary",
      secondary: "stat-figure text-secondary",
      info: "stat-figure text-info",
      success: "stat-figure text-success",
      default: "stat-figure",
    },
    value: {
      primary: "text-start stat-value text-primary",
      secondary: "text-start stat-value text-secondary",
      info: "text-start stat-value text-info",
      success: "text-start stat-value text-success",
      default: "text-start stat-value",
    },
  }

  return (
    <div className="text-center border border-stone-300 rounded-sm">
      <div className="stats shadow">
        <Link to={path}>
          <div className="stat">
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
