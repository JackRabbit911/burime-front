import { t } from "../../../common/i18n/utils"

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>{t('Status')}</th>
        <th>{t('Date')}</th>
        <th>{t('From')}</th>
        <th>{t('To')}</th>
        <th>{t('Subject')}</th>
      </tr>
    </thead>
  )
}

export default TableHead
