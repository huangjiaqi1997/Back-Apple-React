import { useState } from 'react'
// import Logo from '../assets/react.svg?react'
import { FaApple, FaBars } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleHbgClick = e => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }
  const handleHeaderClick = () => setIsMenuOpen(false)

  const [showSearch, setShowSearch] = useState(false)
  const handleSchClick = () => setShowSearch(!showSearch)

  return (
    <div
      className={`sticky top-0 z-50
        w-full h-16 px-4
        flex justify-between items-center
        text-base text-black bg-white/80 backdrop-blur-lg`}
      onClick={handleHeaderClick}>
      <div
        className={`fixed z-50 inset-0
         bg-black/50 backdrop-blur-lg
         ${isMenuOpen ? 'block' : 'hidden'}`}></div>

      <FaApple className="cursor-pointer" size={24} />

      <nav
        className={`fixed right-0 text-center w-[50%] p-2 bg-white rounded-md md:relative md:text-center md:p-0 md:bg-transparent md:mr-[24px] md:w-fit cursor-pointer ${isMenuOpen ? 'top-17' : 'hidden'} md:block`}>
        <ul className="md:flex md:gap-3">
          <li className="p-2">商店</li>
          <li className="p-2">电脑</li>
          <li className="p-2">手机</li>
          <li className="p-2">智能家居</li>
          <li className="p-2">娱乐</li>
          <li className="p-2">技术支持</li>
        </ul>
      </nav>

      <div className={`relative w-[50%] ${showSearch ? 'block' : 'hidden'}`}>
        <input
          className="peer w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
        />
        <span className="absolute -z-10 left-2 top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-translate-y-4 transition">
          搜索
        </span>
      </div>

      <div className="flex">
        <FaSearch size={24} className="mr-2 cursor-pointer md:hidden" onClick={handleSchClick} />
        <FaBars size={24} className="md:hidden cursor-pointer" onClick={handleHbgClick}></FaBars>
      </div>
    </div>
  )
}

export default Header
