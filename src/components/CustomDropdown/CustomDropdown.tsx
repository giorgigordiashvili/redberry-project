import DropdownIcon from '@/icons/DropdownIcon'
import { DepartmentType, EmployeeType, PriorityType } from '@/types'
import { useState } from 'react'
import CheckboxWithText from '../CheckboxWithText/CheckboxWithText'
import CustomButton from '../CustomButton/CustomButton'
import styles from './CustomDropdown.module.scss'

type Props = {
  departments: DepartmentType[]
  priorities: PriorityType[]
  employees: EmployeeType[]
}

function CustomDropdown({ departments, employees, priorities }: Props) {
  const [openedId, setOpenedId] = useState(-1)
  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index)
  }

  const dropdowns = [
    { label: 'დეპარტამენტი', checkboxes: departments },
    { label: 'პრიორიტეტი', checkboxes: priorities },
    { label: 'თანამშრომელი', checkboxes: employees }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        {dropdowns.map((dropdown, index) => (
          <button
            key={index.toString()}
            onClick={() => {
              handleClick(index)
            }}
            className={styles.dropdownButton}
          >
            <span
              style={{
                color: openedId === index ? 'rgba(131, 56, 236, 1)' : '#000'
              }}
            >
              {dropdown.label}
            </span>
            <div style={{ rotate: openedId === index ? '180deg' : '0deg' }}>
              <DropdownIcon
                fill={openedId === index ? 'rgba(131, 56, 236, 1)' : '#000'}
              />
            </div>
          </button>
        ))}
      </div>
      {openedId !== -1 && (
        <div className={styles.dropdownContainer}>
          {dropdowns[openedId]?.checkboxes.map((checkbox, index) => (
            <CheckboxWithText key={index.toString()} text={checkbox.name} />
          ))}

          <div className={styles.buttonContainer}>
            <CustomButton text="არჩევა" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
