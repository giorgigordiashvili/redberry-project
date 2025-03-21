'use client'
import { TagColor } from '@/types'
import Image from 'next/image'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import styles from './CheckboxWithText.module.scss'

type Props = {
  color?: TagColor
  hasImage?: boolean
  text: string
}

const CheckboxWithText = ({
  color = 'purple',
  hasImage = false,
  text
}: Props) => {
  return (
    <div className={styles.container}>
      <CustomCheckbox color={color} handleChange={() => {}} />
      <div className={styles.textContainer}>
        {hasImage && (
          <Image width={28} height={28} src="/icons/avatar.png" alt="avatar" />
        )}
        <span>{text}</span>
      </div>
    </div>
  )
}

export default CheckboxWithText
