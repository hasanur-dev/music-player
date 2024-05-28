import { HiOutlineVolumeUp } from 'react-icons/hi'
import { IoIosArrowDown } from 'react-icons/io'

export default function Header({
  handleMinimized,
  minimized,
  updateVolume,
  volume,
  updateVolumeOnScroll,
}) {
  return (
    <header className="text-2xl px-7 flex justify-between">
      <button
        className={`${
          minimized ? '-rotate-180' : ''
        } transition-all duration-300`}
        onClick={handleMinimized}
      >
        <IoIosArrowDown className="" />
      </button>
      <div className="flex w-6 pr-2 items-start hover:w-32 transition-all duration-300 gap-2">
        <button className="">
          <HiOutlineVolumeUp />
        </button>
        <div
          className="group/bar volume pt-2.5 grow"
          onClick={updateVolume}
          onWheel={updateVolumeOnScroll}
        >
          <div className="h-1 relative w-full bg-neutral-700 rounded-full ">
            <div
              style={{ width: `${volume}%` }}
              className="h-full z-10 w-0 bg-neutral-300 rounded-full group-hover/bar:bg-green-500 relative after:h-3 after:w-3 after:rounded-full after:top-1/2 after:-translate-y-1/2 after:right-0 after:scale-0
          group-hover/bar:after:scale-100 transition-all duration-300 after:transition-all after:duration-300 after:translate-x-1/2  after:absolute after:bg-green-400 "
            ></div>
            {/* <div className="w-3/4 bg-gray-400/70 rounded-full absolute top-0 left-0 h-full"></div> */}
          </div>
        </div>
      </div>
    </header>
  )
}
