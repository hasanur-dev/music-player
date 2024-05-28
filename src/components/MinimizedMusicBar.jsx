import { IoPauseCircle, IoPlayCircle } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function MinimizedMusicBar({
  handlePlayPause,
  handleMinimized,
  isPlaying,
  progress,
  song,
}) {
  const circleRef = useRef()
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    function updateProgress(percentage) {
      const radius = 54
      const circumference = 2 * Math.PI * radius
      const offset = circumference - (percentage / 100) * circumference

      setOffset(offset)
    }
    updateProgress(progress)
  }, [progress])

  return (
    <motion.div
      className="flex px-7 cursor-pointer relative items-center gap-5 pt-6 mt-auto"
      onClick={handleMinimized}
    >
      <motion.div
        initial={{ opacity: 0, y: -600 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: -600 }}
        transition={{ duration: 0.4 }}
        className="h-[2px] absolute top-0 left-0 w-full bg-neutral-700"
      ></motion.div>

      <motion.img
        src={song.img}
        alt=""
        className=" rounded-sm h-12"
        layoutId="cover"
      />

      <div>
        <motion.h2 className="font-medium text-base " layoutId="title">
          {song.name}
        </motion.h2>
        <motion.h3
          className="font-medium text-gray-500 text-xs"
          layoutId="artist"
        >
          {song.artist}
        </motion.h3>
      </div>
      <div className="relative ml-auto">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#eeeeee0"
            strokeWidth="3"
            fill="none"
          />
          <circle
            id="progress-circle"
            ref={circleRef}
            cx="60"
            cy="60"
            r="54"
            className="stroke-green-600"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="339.292"
            strokeDashoffset={offset}
            transform="rotate(-90) translate(-120)"
          />
        </motion.svg>
        <motion.div layoutId="playPause" className="relative z-30">
          <button
            onClick={handlePlayPause}
            className="text-5xl active:scale-100 ml-auto hover:scale-105 text-gray-300 transition-all duration-200"
          >
            {!isPlaying && <IoPlayCircle />}
            {isPlaying && <IoPauseCircle />}
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
