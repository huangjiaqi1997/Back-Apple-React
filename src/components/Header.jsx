import { useState } from 'react'
// import Logo from '../assets/react.svg?react'
import { FaApple, FaBars } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleHbgClick = e => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }
  const handleHeaderClick = () => setIsMenuOpen(false)

  const [showSearch, setShowSearch] = useState(false)
  const handleSchClick = () => setShowSearch(!showSearch)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleModeClick = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={`
        sticky top-0 z-50
        w-full h-16 px-4
        flex justify-between items-center
        text-base text-apple-dark bg-apple-light backdrop-blur-lg shadow-apple-md
        dark:bg-apple-dark dark:text-apple-light`}
      onClick={handleHeaderClick}>
      <div
        className={`fixed z-50 inset-0
         bg-apple-black/50 backdrop-blur-md dark:bg-apple-white/10
         ${isMenuOpen ? 'block' : 'hidden'}`}></div>

      <FaApple className="cursor-pointer" size={24} />

      <nav
        className={`fixed right-0 text-center w-[50%] rounded-md md:relative md:text-center bg-apple-light md:bg-transparent md:mr-[24px] md:w-fit cursor-pointer ${isMenuOpen ? 'top-17' : 'hidden'} md:block dark:bg-apple-dark`}>
        <ul className="flex-col gap-3 py-3 flex md:flex-row md:py-0 md:gap-8">
          <li>商店</li>
          <li>电脑</li>
          <li>手机</li>
          <li>智能家居</li>
          <li>娱乐</li>
          <li>技术支持</li>
        </ul>
      </nav>

      <div className={`relative w-[50%] ${showSearch ? 'block' : 'hidden'}`}>
        <input
          className="peer w-full p-2 rounded-md border border-apple-gray-200 focus:ring-2 focus:ring-apple-blue focus:outline-none"
          type="text"
        />
        <span className="absolute -z-10 left-2 top-2 peer-focus:text-xs peer-focus:text-apple-blue peer-focus:-translate-y-4 transition">
          搜索
        </span>
      </div>

      <div className="flex gap-2">
        <FaSearch size={24} className="cursor-pointer md:hidden" onClick={handleSchClick} />
        <div className="cursor-pointer" onClick={handleModeClick}>
          {isDarkMode ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
        </div>
        <FaBars size={24} className="md:hidden cursor-pointer" onClick={handleHbgClick}></FaBars>
      </div>
    </div>
  )
}

export default Header
