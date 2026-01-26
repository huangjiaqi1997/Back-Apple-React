import { IoIosArrowDropdown } from 'react-icons/io'

const SkuSelect = ({ placeholder, options, value, onChange }) => {
  return (
    <div className="relative ">
      <select
        value={value}
        name={placeholder}
        className="
          w-25 pr-6 overflow-hidden text-ellipsis
          px-3 py-2 border border-gray-400 rounded-md
          flex items-center gap-4
          cursor-pointer
          appearance-none
          dark:bg-apple-dark dark:text-apple-light dark:border-gray-600
        "
        onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IoIosArrowDropdown
        className="absolute right-2 top-1/2 -translate-y-1/2"
        size={15}
      />
    </div>
  )
}

export default SkuSelect
