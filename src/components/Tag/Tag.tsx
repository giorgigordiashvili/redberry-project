import { TagColor } from '@/types'
import clsx from 'clsx'
import styles from './Tag.module.scss'

const returnText = (color: TagColor) => {
  switch (color) {
    case 'pink':
      return 'დიზაინი'
    case 'blue':
      return 'ლოჯისტიკა'
    case 'orange':
      return 'მარკეტინგი'
    case 'yellow':
      return 'ინფ. ტექ.'
    default:
      return 'Unknown'
  }
}

type Props = {
  color: TagColor
}

function Tag({ color }: Props) {
  return (
    <div className={clsx(styles.container, styles[color])}>
      {returnText(color)}
    </div>
  )
}

export default Tag
