/* This example requires Tailwind CSS v2.0+ */
import { createContext, Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import Close from '@icons/Close.svg'

// Global notification live region, render this permanently at the end of the document
export const NotificationContainer = (props: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed bottom-0 right-0 w-full flex items-center px-4 py-6 pointer-events-none sm:p-6 sm:items-center z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-center">
        {props.children}
      </div>
    </div>
  )
}

interface ComponentProps {
  visible: boolean
  title?: string
  description?: string

  success?: boolean
  error?: boolean

  onDismiss?: () => any
  dismissAfter?: number
}

const Notification = (props: ComponentProps) => {
  const [show, setShow] = useState(props.visible)
  const [showTimeout, setShowTimeout] = useState(setTimeout(() => {}))

  const [title, setTitle] = useState(props.title)

  useEffect(() => {
    if (!props.visible) return

    if (props.title) {
      setTitle(props.title)
      return
    }

    const successTitles = ['Nice!', 'Awesomesauce', 'Woo-hoo!', 'Done & Dusted']
    const errorTitles = ['Oops!', 'Uh-Oh', 'Facepalm.']
    let titleArray: Array<string> = []

    if (props.success) titleArray = successTitles
    else if (props.error) titleArray = errorTitles

    setTitle(titleArray[Math.floor(Math.random() * titleArray.length)])
  }, [props.title, props.visible])

  let bgColor = 'bg-gray-700'
  let iconColor = 'text-gray-200'
  let IconComponent = InformationCircleIcon

  switch (true) {
    case props.success:
      iconColor = 'text-emerald-400'
      IconComponent = CheckCircleIcon
      break
    case props.error:
      iconColor = 'text-red-400'
      IconComponent = XCircleIcon
      break
  }

  useEffect(() => {
    setShow(props.visible)

    if (props.visible == true && props.dismissAfter) {
      clearTimeout(showTimeout)
      setShowTimeout(
        setTimeout(() => {
          setShow(false)
          if (props.onDismiss) props.onDismiss()
        }, props.dismissAfter || 4000)
      )
    }
  }, [props.visible])

  return (
    <>
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={classNames(
            bgColor,
            'max-w-xs sm:max-w-sm w-full max-h-64 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <IconComponent className={classNames('h-6 w-6', iconColor)} aria-hidden="true" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm text-white">{title}</p>
                {props.description && (
                  <p className="mt-1 text-sm text-white">{props.description}</p>
                )}
              </div>
              {props.onDismiss && (
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="rounded-md inline-flex text-gray-200 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      setShow(false)
                      props.onDismiss()
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <Close className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default Notification
