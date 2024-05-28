import { HiMiniBackward, HiMiniForward } from 'react-icons/hi2'
import { IoIosRepeat, IoIosShuffle } from 'react-icons/io'
import { IoPauseCircle, IoPlayCircle } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { PiRepeatLight, PiRepeatOnce } from 'react-icons/pi'

export default function MusicControls({
  handlePlayPause,
  isPlaying,
  handleLoop,
  loop,
  nextSong,
  prevSong,
  shuffle,
  handleShuffle,
}) {
  return (
    <div className="flex mt-6 items-center justify-between">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleLoop}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`text-2xl hover:text-neutral-300 ${
          loop ? 'text-neutral-300' : 'text-neutral-500'
        } transition-all duration-200`}
      >
        {/* <PiRepeatLight /> */}
        <PiRepeatOnce />
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-3xl hover:text-gray-100 text-gray-300/60 transition-all duration-200"
        onClick={prevSong}
      >
        <HiMiniBackward />
      </motion.button>
      <motion.div layoutId="playPause">
        <button
          onClick={handlePlayPause}
          className="text-6xl active:scale-100 hover:scale-105 text-gray-300 transition-all duration-200"
        >
          {!isPlaying && <IoPlayCircle />}
          {isPlaying && <IoPauseCircle />}
        </button>
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-3xl hover:text-gray-300 text-gray-300/60 transition-all duration-200"
        onClick={nextSong}
      >
        <HiMiniForward />
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`text-2xl  ${
          shuffle ? 'text-neutral-300' : 'text-neutral-500'
        } hover:text-neutral-300 transition-all duration-200`}
        onClick={handleShuffle}
      >
        <IoIosShuffle />
      </motion.button>
    </div>
  )
}
