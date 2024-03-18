import { useState } from 'react'

type FilterOption = {
  text: string
  isOpen: boolean
  elements: any
}

const Filter = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { text: 'Search', isOpen: false, elements: null },
    { text: 'Genre', isOpen: false, elements: [] },
    { text: 'Tag', isOpen: false, elements: [] },
    { text: 'Year', isOpen: false, elements: [] },
    { text: 'Rating', isOpen: false, elements: [] },
    { text: 'Adult Rating', isOpen: false, elements: [] },
    { text: 'Status', isOpen: false, elements: [] },
    { text: 'Platform', isOpen: false, elements: [] }
  ])

  const handleToggleOption = (el: FilterOption) => {
    setFilterOptions((prevState) =>
      prevState.map((option) =>
        option.text === el.text ? { ...option, isOpen: !el.isOpen } : option
      )
    )
  }
  return (
    <div className="flex flex-col mt-4">
      <div className="grid grid-cols-4 gap-2 justify-items-center w-2/3 mx-auto">
        {filterOptions.map((el) => (
          <>
            <div
              className="w-48 p-3 bg-[#1b1b1b] text-center rounded-xl cursor-pointer relative"
              onClick={() => handleToggleOption(el)}
            >
              {el.text}
              {el.isOpen && (
                <div className="absolute w-full z-10 right-0 top-0 rounded-xl bg-[#1b1b1b]">
                  <div className="flex flex-col m-4 space-y-2 ">
                    <div>
                      <div>Opt 1</div>
                    </div>
                    <div>Opt 2</div>
                    <div>Opt 3</div>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Filter
