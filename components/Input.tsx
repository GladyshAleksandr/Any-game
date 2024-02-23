import { RefObject } from 'react'

type ComponentProps = {
  className?: string
  htmlRef?: RefObject<HTMLInputElement>
  type?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  autocomplete?: string
  label?: string
  required?: boolean
  disabled?: boolean
  onChange?: (v: any) => void
}
const Input = (props: ComponentProps) => {
  return (
    <div className={'rounded-md bg-white max-w-full px-4 py-3 cursor-text' + props.className}>
      <input
        ref={props.htmlRef}
        value={props.value}
        defaultValue={props.defaultValue}
        type={props.type}
        autoComplete={props.autocomplete}
        placeholder={props.placeholder}
        required={props.required || false}
        className={'outline-none text-black placeholder-black'}
        onChange={(e) => {
          if (props.onChange) props.onChange(e)
        }}
        disabled={props.disabled || false}
      />
    </div>
  )
}

export default Input
