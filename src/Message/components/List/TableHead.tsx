import type { GetTextProp } from "common/i18n/types"

const TableHead = ({ __ }: GetTextProp) => {
  return (
    <thead>
      <tr>
        <th>{__('Status')}</th>
        <th>{__('Date')}</th>
        <th>{__('From')}</th>
        <th>{__('To')}</th>
        <th>{__('Subject')}</th>
      </tr>
    </thead>
  )
}

export default TableHead
