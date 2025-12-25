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
      accent: "stat-figure text-accent",
      success: "stat-figure text-success",
      warning: "stat-figure text-warning",
      error: "stat-figure text-error",
      default: "stat-figure",
    },
    value: {
      primary: "text-start stat-value text-primary",
      secondary: "text-start stat-value text-secondary",
      info: "text-start stat-value text-info",
      accent: "text-start stat-value text-accent",
      success: "text-start stat-value text-success",
      warning: "text-start stat-value text-warning",
      error: "text-start stat-value text-error",
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
