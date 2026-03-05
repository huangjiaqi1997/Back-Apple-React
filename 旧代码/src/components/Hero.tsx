
import Button from "./Button"
import { MdArrowForwardIos } from 'react-icons/md'


const Hero = () => {
  return (
    <div className="relative h-[480px] flex flex-col items-center justify-end md:justify-start p-6 mb-4 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full block md:hidden object-cover "
          src="http://152.136.182.210:12231/images/home/store-card-watch-ultra.jpeg"
          alt=""
        />
        <img
          className="w-full h-full hidden md:block object-cover "
          src="http://152.136.182.210:12231/images/home/store-card-watch-ultra.jpeg"
          alt=""
        />
      </div>
      <div className="z-10 text-white">
        <h1 className="bg-transparent font-bold text-4xl md:text-6xl mb-4">iPhone 14 Pro</h1>
        <div className="text-center space-x-4">
          <Button title="进一步了解" icon={<MdArrowForwardIos />} iconPosition="right"></Button>
          <Button title="购买" variant="outline"></Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
