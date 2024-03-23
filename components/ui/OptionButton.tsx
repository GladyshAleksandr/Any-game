import classNames from '@/lib/utils/classNames'

type ComponentProps = {
  children: React.ReactNode
  className?: string
  isSeachField?: boolean
  onClick?: (event: any) => void
  onChange?: (event: any) => void
}

const OptionButton = ({ children, className, isSeachField, onClick, onChange }: ComponentProps) => {
  const commonClassNames =
    'flex justify-center items-center w-48 h-12 bg-[#1b1b1b] rounded-xl outline-none'
  return (
    <>
      {!isSeachField ? (
        <div
          className={classNames(commonClassNames, 'cursor-pointer', className ? className : '')}
          onClick={onClick}
        >
          {children}
        </div>
      ) : (
        <input
          type="text"
          className={classNames(commonClassNames, 'text-center cursor-text')}
          placeholder={children?.toString()}
          onChange={onChange}
        ></input>
      )}
    </>
  )
}

export default OptionButton
