import { motion } from 'framer-motion'
export default function MusicProgress({
  totalTime,
  currentTime,
  progress,
  updateTime,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className=" overflow-hidden"
    >
      <div className="group/bar bar pt-3 mt-1 " onClick={updateTime}>
        <div className="h-1 relative w-full bg-neutral-700 rounded-full ">
          {loading && (
            <div className="absolute h-full z-10 rounded-full bg-gray-500 progress-loading"></div>
          )}
          <div
            style={{ width: `${progress}%` }}
            className="h-full z-20 w-0 progress-bar bg-neutral-300 rounded-full group-hover/bar:bg-green-500 relative after:h-3 after:w-3 after:rounded-full after:top-1/2 after:-translate-y-1/2 after:right-0 after:scale-0
          group-hover/bar:after:scale-100 transition-all duration-300 after:transition-all after:duration-300 after:translate-x-1/2  after:absolute after:bg-green-400 "
          ></div>
          {/* <div className="w-3/4 bg-gray-400/70 rounded-full absolute top-0 left-0 h-full"></div> */}
        </div>
      </div>
      <div className="text-sm mt-1 px-1 flex justify-between font-medium">
        <span>{currentTime}</span>
        <span>{totalTime}</span>
        {/* {loading ? <span>loading</span> : ''} */}
      </div>
    </motion.div>
  )
}
