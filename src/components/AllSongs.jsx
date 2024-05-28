import { HiOutlineClock } from 'react-icons/hi'
import Song from './Song'
import { motion } from 'framer-motion'

export default function AllSongs({
  songs,
  handleChangeSong,
  currentSong,
  isPlaying,
}) {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 200 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 200 }}
      // transition={{ duration: 0.3 }}
      initial={{ opacity: 0, scale: 1.1, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, y: -15 }}
      transition={{ transition: 0.4, delay: 0 }}
      className="absolute top-14 w-full"
    >
      <div className="grid text-neutral-300 border-t mt-3 py-4 grid-custom-col px-6 pl-8 border-b border-b-neutral-600/60 border-t-neutral-600/50 text-sm">
        <span>#</span>
        <span>Title</span>
        <span className=" flex justify-center ">
          <HiOutlineClock className="text-[18px]" />
        </span>
      </div>
      <div className="flex songs-container max-h-[355px] overflow-y-scroll flex-col gap-1 mt-3">
        {songs.map((song, i) => (
          <Song
            key={song.id}
            i={i}
            song={song}
            handleChangeSong={handleChangeSong}
            playing={currentSong.id === song.id && isPlaying}
          />
        ))}
      </div>
    </motion.div>
  )
}
