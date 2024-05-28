import { FaPlay } from 'react-icons/fa'
import MusicGif from './MusicGif'

export default function Song({ song, handleChangeSong, i, playing }) {
  const { id, name, artist, duration, img } = song
  return (
    <div
      className="grid py-3 cursor-pointer group hover:bg-neutral-900 grid-custom-col mx-4 pl-5 pr-2 rounded-[3px] transition-all duration-200 items-center "
      onClick={() => handleChangeSong(i)}
    >
      <div className="h-10 aspect-square flex items-center">
        {playing ? (
          <MusicGif />
        ) : (
          <>
            <span className="font-medium group-hover:hidden">{i + 1}</span>
            <FaPlay className="text-xs hidden group-hover:block" />
          </>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <img src={img} alt="" className="h-12" />
        <div>
          <h2 className="font-medium">{name}</h2>
          <p className="text-xs text-neutral-400">{artist}</p>
        </div>
      </div>
      <p className="flex justify-center text-sm font-medium">{duration}</p>
    </div>
  )
}
