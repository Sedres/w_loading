$(function () {
  const openMusic = $('#open-music')
  const musicContainer = $('#music-container')
  const musicAudio = $('#music-audio')
  const inputVolume = $('#volume')
  const pausePlay = $('#pause-play')
  const muteUnmute = $('#mute-unmute')
  const musicPortrait = $('#music-portrait')
  const songName = $('#song-name')
  const nextSont = $('#next-track')
  const previousSont = $('#previous-track')

  let currentTrackIndex = 0
  const playlist = Config.music.songs

  const toggleVisibility = (element, duration) => {
    if (element.is(':visible')) {
      element.hide(duration)
    } else {
      element.show(duration)
    }
  }

  const updateVolumeDisplay = (volume) => {
    return Math.floor(volume * 100)
  }

  const togglePlayPause = () => {
    if (musicAudio.prop('paused')) {
      musicAudio.trigger('play')
      pausePlay.children('i').attr('class', 'fa-solid fa-pause')
    } else {
      musicAudio.trigger('pause')
      pausePlay.children('i').attr('class', 'fa-solid fa-play')
    }
  }

  const toggleMuteUnmute = () => {
    if (musicAudio.prop('muted')) {
      muteUnmute.children('i').attr('class', 'fa-solid fa-volume-high')
    } else {
      muteUnmute.children('i').attr('class', 'fa-solid fa-volume-xmark')
    }
    musicAudio.prop('muted', !musicAudio.prop('muted'))
  }

  const setVolume = (volume) => {
    musicAudio.prop('volume', volume / 100)
  }

  const loadTrack = (index) => {
    songName.text(playlist[index].Title)
    musicPortrait.attr('src', playlist[index].portrait)
    musicAudio.attr('src', playlist[index].url)
    musicAudio.trigger('play')
    pausePlay.children('i').attr('class', 'fa-solid fa-pause')
  }

  const nextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length
    loadTrack(currentTrackIndex)
  }

  const prevTrack = () => {
    currentTrackIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length
    loadTrack(currentTrackIndex)
  }

  // Initialize music settings
  setVolume(Config.music.songVolume)
  inputVolume.val(updateVolumeDisplay(musicAudio.prop('volume')))
  loadTrack(currentTrackIndex)
  musicContainer.hide()

  // Event listeners
  openMusic.on('click', () => toggleVisibility(musicContainer, 300))
  pausePlay.on('click', togglePlayPause)
  muteUnmute.on('click', toggleMuteUnmute)
  nextSont.on('click', nextTrack)
  previousSont.on('click', prevTrack)

  musicAudio.on('timeupdate', () => {
    const progress =
      (musicAudio.prop('currentTime') / musicAudio.prop('duration')) * 100
    $('#timestamp').css('width', `${progress}%`)
  })

  inputVolume.on('input', function () {
    setVolume($(this).val())
  })

  musicAudio.on('ended', nextTrack) // Automatically play the next track when the current one ends
})
