import classNames from '@/lib/utils/classNames'
import { useState } from 'react'

type ComponentProps = {
  children: React.ReactNode
  openContent?: React.ReactNode
  closeContent?: React.ReactNode
  className?: string
  isSeachField?: boolean
  onClick?: (event: any) => void
  onChange?: (event: any) => void
}

const OptionButton = ({
  children,
  openContent,
  closeContent,
  className,
  isSeachField,
  onClick,
  onChange
}: ComponentProps) => {
  const commonClassNames =
    'flex justify-center items-center w-48 h-12 bg-gray rounded-xl outline-none'

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event: any) => {
    setIsOpen((prevState) => !prevState)
    onClick && onClick(event)
  }
  return (
    <>
      {!isSeachField ? (
        <div
          className={classNames(commonClassNames, 'cursor-pointer', className ? className : '')}
          onClick={handleClick}
        >
          {openContent || closeContent ? (
            <div className="w-full flex justify-between px-4 items-center">
              {children}
              {isOpen ? openContent : closeContent}
            </div>
          ) : (
            children
          )}
        </div>
      ) : (
        <input
          type="text"
          className={classNames(
            commonClassNames,
            'text-center cursor-text',
            className ? className : ''
          )}
          placeholder={children?.toString()}
          onChange={onChange}
        ></input>
      )}
    </>
  )
}

export default OptionButton
