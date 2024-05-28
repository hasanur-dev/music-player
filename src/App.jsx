import Main from './components/Main'
import Header from './components/Header'
import MusicDetails from './components/MusicDetails'
import MusicProgress from './components/MusicProgress'
import MusicControls from './components/MusicControls'
import MinimizedMusicBar from './components/MinimizedMusicBar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AllSongs from './components/AllSongs'

const allSongs = [
  {
    id: 0,
    name: 'TyTy',
    artist: 'SOOJIN',
    duration: '2:32',
    img: '/tyty.jpeg',
    song: '/TyTy.m4a',
    bg: 'gradient-one',
  },
  {
    id: 1,
    name: 'Pocket Locket',
    artist: 'Alaina Castillo',
    duration: '3:16',
    img: '/pocket.jpeg',
    song: '/PocketLocket.mp3',
    bg: 'gradient-two',
  },
  {
    id: 2,
    name: 'Playing God',
    artist: 'Polyphia',
    duration: '3:23',
    img: '/playing-god.jpeg',
    song: '/PlayingGod.m4a',
    bg: 'gradient-three',
  },
  {
    id: 3,
    name: 'Cliches',
    artist: 'fcj',
    duration: '3:23',
    img: '/cliches.jpeg',
    song: '/cliches.m4a',
    bg: 'gradient-four',
  },
]

// https://open.spotify.com/oembed?url=
export default function App() {
  const [songs, setSongs] = useState(allSongs)
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0)
  const [currentSong, setCurrentSong] = useState(allSongs[0])
  const [audio, setAudio] = useState(new Audio(currentSong.song))
  const [minimized, setMinimized] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [totalTime, setTotalTime] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(50)
  const [loop, setLoop] = useState(false)
  const [playAfterChange, setPlayAfterChange] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [loading, setIsLoading] = useState(true)
  // const currentSong = songs.find((song) => song.id === currentMusicId)

  const handleChangeSong = (index) => {
    audio.pause()
    setIsPlaying(false)
    setCurrentMusicIndex(index)
    setAudio(new Audio(songs.filter((song, i) => i === index)[0].song))
    setCurrentSong(songs.filter((song, i) => i === index)[0])
    setPlayAfterChange(true)
  }

  const nextSong = useCallback(() => {
    if (currentMusicIndex === songs.length - 1) return

    audio.pause()
    setIsPlaying(false)
    setCurrentMusicIndex((i) => i + 1)
    setAudio(
      new Audio(songs.filter((song, i) => i === currentMusicIndex + 1)[0].song)
    )
    setCurrentSong(songs.filter((song, i) => i === currentMusicIndex + 1)[0])
    setPlayAfterChange(true)
  }, [audio, currentMusicIndex, songs])

  const handleAudioEnd = useCallback(() => {
    nextSong()
  }, [nextSong])

  useEffect(() => {
    audio.addEventListener('ended', handleAudioEnd)
    audio.addEventListener('waiting', () => {
      setIsLoading(true)
    })
    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false)
    })
    // return audio.removeEventListener('ended', handleAudioEnd)
  }, [audio, handleAudioEnd])

  const prevSong = () => {
    if (currentMusicIndex === 0) return
    audio.pause()
    setIsPlaying(false)
    setCurrentMusicIndex((i) => i - 1)
    setAudio(
      new Audio(songs.filter((song, i) => i === currentMusicIndex - 1)[0].song)
    )
    setCurrentSong(songs.filter((song, i) => i === currentMusicIndex - 1)[0])
    setPlayAfterChange(true)
  }

  const handleMinimized = (e) => {
    setMinimized((min) => !min)
  }
  const handleLoop = () => {
    setLoop((loop) => !loop)
  }
  const handleShuffle = () => {
    setShuffle((s) => !s)
  }
  useEffect(() => {
    audio.loop = loop
  }, [loop, audio])

  audio.volume = volume / 100

  useEffect(() => {
    function updateTimeAndDuration() {
      // Calculate minutes and seconds for current time
      const currentMinutes = Math.floor(audio.currentTime / 60)
      const currentSecondsRaw = Math.floor(audio.currentTime % 60)

      // Pad single digit seconds with a leading zero
      const currentSeconds =
        currentSecondsRaw < 10 ? '0' + currentSecondsRaw : currentSecondsRaw
      // Format the current time string
      let currentTimeStr = `${currentMinutes}:${currentSeconds}`

      // Update the current time display
      setCurrentTime(currentTimeStr)

      // Calculate minutes and seconds for total duration
      const totalMinutes = Math.floor(audio.duration / 60)
      const totalSecondsRaw = Math.floor(audio.duration % 60)

      // Pad single digit seconds with a leading zero
      const totalSeconds =
        totalSecondsRaw < 10 ? '0' + totalSecondsRaw : totalSecondsRaw

      // Format the total duration string
      let totalDurationStr = `${totalMinutes}:${totalSeconds}`

      const progressInPercentage = (audio.currentTime / audio.duration) * 100
      setProgress(progressInPercentage)
      setTotalTime(totalDurationStr)
    }
    audio.addEventListener('timeupdate', updateTimeAndDuration)
  }, [audio])

  const handlePlayPause = useCallback(
    (e) => {
      e.stopPropagation()

      if (!isPlaying) {
        audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    },
    [audio, isPlaying]
  )
  const handlePause = () => {
    audio.pause()
    setIsPlaying(false)
  }

  const updateTime = (event) => {
    const el = event.target.closest('.bar')
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left //x position within the element.
    const clickPosition = x / rect.width
    const time = audio.duration * clickPosition
    audio.currentTime = time
  }

  const updateVolume = (event) => {
    const el = event.target.closest('.volume')
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left //x position within the element.
    const clickPosition = x / rect.width
    setVolume(clickPosition * 100)
    audio.volume = clickPosition
  }

  const updateVolumeOnScroll = (e) => {
    if (e.deltaY < 0) {
      setVolume((vol) => {
        if (vol === 100) return vol
        if (vol > 95) return 100
        return vol + 5
      })
    } else {
      setVolume((vol) => {
        if (vol === 0) return vol
        if (vol < 5) return 0
        return vol - 5
      })
    }
  }
  useEffect(() => {
    function shuffleArray(arr) {
      const array = [...arr]
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
      }
      return array
    }

    setSongs(() => {
      if (shuffle) return shuffleArray(allSongs)
      else return allSongs
    })
  }, [shuffle])

  useEffect(() => {
    const index = songs.findIndex((i) => i.id === currentSong.id)

    setCurrentMusicIndex(index)
  }, [shuffle, songs, currentSong.id])

  useEffect(() => {
    if (playAfterChange) {
      audio.play()
      setIsPlaying(true)
      setPlayAfterChange(false) // Reset the flag after executing the effect
    }
  }, [playAfterChange, handlePlayPause, audio]) // Depend on the playAfterChange state

  return (
    <div
      className={`${currentSong.bg} bg-gray-900 px-4  h-dvh flex flex-col justify-center items-center`}
    >
      <Main>
        <Header
          handleMinimized={handleMinimized}
          minimized={minimized}
          updateVolume={updateVolume}
          volume={volume}
          updateVolumeOnScroll={updateVolumeOnScroll}
        />
        <AnimatePresence>
          {minimized && (
            <AllSongs
              songs={songs}
              currentSong={currentSong}
              handleChangeSong={handleChangeSong}
              isPlaying={isPlaying}
            />
          )}
        </AnimatePresence>
        {!minimized && (
          <motion.div className="px-7 bg-neutral-950/0 relative z-30">
            <MusicDetails song={currentSong} />
            {!minimized && (
              <MusicProgress
                totalTime={totalTime}
                currentTime={currentTime}
                progress={progress}
                updateTime={updateTime}
                loading={loading}
              />
            )}
            <MusicControls
              handlePlayPause={handlePlayPause}
              handlePause={handlePause}
              isPlaying={isPlaying}
              handleLoop={handleLoop}
              loop={loop}
              nextSong={nextSong}
              prevSong={prevSong}
              shuffle={shuffle}
              handleShuffle={handleShuffle}
            />
          </motion.div>
        )}
        {minimized && (
          <MinimizedMusicBar
            handlePlayPause={handlePlayPause}
            handleMinimized={handleMinimized}
            isPlaying={isPlaying}
            progress={progress}
            song={currentSong}
          />
        )}
      </Main>
    </div>
  )
}
