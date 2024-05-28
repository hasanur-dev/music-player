const jsmediatags = window.jsmediatags

import Main from './components/Main'
import Header from './components/Header'
import MusicDetails from './components/MusicDetails'
import MusicProgress from './components/MusicProgress'
import MusicControls from './components/MusicControls'
import MinimizedMusicBar from './components/MinimizedMusicBar'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AllSongs from './components/AllSongs'

const songs = [
  {
    id: 0,
    name: 'TyTy',
    artist: 'SOOJIN',
    duration: '2:32',
    img: '/tyty.jpeg',
    song: '/TyTy.m4a',
  },
  {
    id: 1,
    name: 'Pocket Locket',
    artist: 'Alaina Castillo',
    duration: '3:16',
    img: '/pocket.jpeg',
    song: '/PocketLocket.mp3',
  },
]

// https://open.spotify.com/oembed?url=
export default function App() {
  const [currentMusicId, setCurrentMusicId] = useState(1)
  const [audio, setAudio] = useState(new Audio(songs[0].song))
  const [minimized, setMinimized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [totalTime, setTotalTime] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(5)
  const [loop, setLoop] = useState(false)

  useEffect(() => {
    // setAudio(new Audio(songs.filter((song) => song.id === currentMusicId).song))
    console.log(audio)
  }, [currentMusicId, audio])

  const handleMinimized = () => {
    setMinimized((min) => !min)
  }
  const handleLoop = () => {
    setLoop((loop) => !loop)
  }
  useEffect(() => {
    audio.loop = loop
  }, [loop])

  audio.volume = volume / 100

  useEffect(() => {
    audio.addEventListener('timeupdate', updateTimeAndDuration)
  }, [])
  function updateTimeAndDuration() {
    // Calculate minutes and seconds for current time
    const currentMinutes = Math.floor(audioTime / 60)
    const currentSecondsRaw = Math.floor(audioTime % 60)

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

    const progressInPercentage = (audioTime / audio.duration) * 100
    setProgress(progressInPercentage)
    setTotalTime(totalDurationStr)
  }

  const handlePlayPause = () => {
    console.log(audio.duration)
    if (!isPlaying) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }
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
    audioTime = time
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

  return (
    <div className="bg-gray-900 px-4 music-bg  h-dvh flex flex-col justify-center items-center">
      <Main>
        <Header
          handleMinimized={handleMinimized}
          minimized={minimized}
          updateVolume={updateVolume}
          volume={volume}
          updateVolumeOnScroll={updateVolumeOnScroll}
        />
        <AnimatePresence>
          {minimized && <AllSongs songs={songs} />}
        </AnimatePresence>
        {!minimized && (
          <motion.div className="px-7 bg-neutral-950/0 relative z-30">
            <MusicDetails />
            {!minimized && (
              <MusicProgress
                totalTime={totalTime}
                currentTime={currentTime}
                progress={progress}
                updateTime={updateTime}
              />
            )}
            <MusicControls
              handlePlayPause={handlePlayPause}
              handlePause={handlePause}
              isPlaying={isPlaying}
              handleLoop={handleLoop}
              loop={loop}
            />
          </motion.div>
        )}
        {minimized && (
          <MinimizedMusicBar
            handlePlayPause={handlePlayPause}
            handleMinimized={handleMinimized}
            isPlaying={isPlaying}
            progress={progress}
          />
        )}
      </Main>
    </div>
  )
}
