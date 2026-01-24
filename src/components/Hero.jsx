import img1 from '../assets/images/img_1.jpg'
import img2 from '../assets/images/img_2.jpg'

const Hero = () => {
  return (
    <div className="relative h-[480px] flex flex-col items-center justify-end md:justify-start p-6 mb-4 overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <img className="w-full h-full block md:hidden object-cover " src={img2} alt="" />
        <img className="w-full h-full hidden md:block object-cover " src={img1} alt="" />
      </div>
      <div className="text-white">
        <h1 className="bg-transparent font-bold text-4xl md:text-6xl mb-4">iPhone 14 Pro</h1>
        <div className="text-center space-x-4">
          <button className="text-base bg-blue-600 rounded-md px-6 py-2 hover:bg-blue-700 transition cursor-pointer">
            进一步了解
          </button>
          <button className="text-base bg-black rounded-md px-6 py-2 hover:bg-blue-700 transition cursor-pointer">
            购买
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
