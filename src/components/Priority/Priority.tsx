import { Priority } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'
import styles from './Priority.module.scss'

const returnText = (priority: Priority) => {
  switch (priority) {
    case 'low':
      return 'დაბალი'
    case 'medium':
      return 'საშუალო'
    case 'high':
      return 'მაღალი'

    default:
      return 'Unknown'
  }
}

type Props = {
  priority: Priority
  size: 'small' | 'large'
}

function Priority({ priority, size }: Props) {
  return (
    <div className={clsx(styles[priority], styles[size])}>
      <Image
        src={`/icons/${priority}-${size}.svg`}
        width={size === 'small' ? 16 : 18}
        height={size === 'small' ? 18 : 20}
        alt={priority}
      />
      {returnText(priority)}
    </div>
  )
}

export default Priority
