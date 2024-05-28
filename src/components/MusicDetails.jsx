import { motion } from 'framer-motion'
export default function MusicDetails({ song }) {
  return (
    <div className="mt-10 flex gap-4 flex-col">
      <div className="px-8">
        <motion.img
          src={song.img}
          alt=""
          className="shadow-xl"
          layoutId="cover"
        />
      </div>

      <div className="flex items-center flex-col">
        <motion.h2 className="font-semibold text-2xl " layoutId="title">
          {song.name}
        </motion.h2>
        <motion.h3
          className="font-medium text-gray-500 text-sm"
          layoutId="artist"
        >
          {song.artist}
        </motion.h3>
      </div>
    </div>
  )
}
