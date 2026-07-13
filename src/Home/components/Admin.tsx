import type { ReactNode } from "react";
import { adminHref, classMap } from "common/constants";

type Props = {
  title?: string,
  value?: string | number,
  color?: string,
  icon?: ReactNode,
  desc?: string,
};

const Admin = ({ title = '', value = '', icon = '', color = 'default', desc = '' }: Props) => {
  return (
    <div className="text-center border border-zinc-600 rounded-sm">
      <div className="stats">
        <a href={adminHref} target='_blank'>
          <div className="stat p-0 gap-0">
            <div className={classMap.figure[color]}>
              {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className={classMap.value[color]}>{value}</div>
            <div className="stat-desc">{desc}</div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Admin
