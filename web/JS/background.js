$(function () {
  const background = $('#background')

  function getYouTubeEmbedURL(url) {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  if (Config.backgroundVideo) {
    let backgroundVideo

    if (Config.backgroundVideoOnline) {
      if (
        Config.videoURL.includes('youtube.com') ||
        Config.videoURL.includes('youtu.be')
      ) {
        const youtubeEmbedURL = getYouTubeEmbedURL(Config.videoURL)
        const youtubeParams = `?${
          Config.backgroundVideoMuted ? 'mute=1&' : ''
        }${
          Config.backgroundVideoLoop
            ? 'loop=1&playlist=' + youtubeEmbedURL.split('/').pop()
            : ''
        }&autoplay=1&controls=0&rel=0&modestbranding=1`

        backgroundVideo = /* html */ `<iframe class="background" src="${youtubeEmbedURL}${youtubeParams}" frameborder="0"  allow="autoplay; encrypted-media" allowfullscreen></iframe>`
      } else {
        backgroundVideo = /* html */ `<iframe class="background" src="${Config.videoURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
      }
    } else {
      backgroundVideo = /* html */ `<video class="background" src="${
        Config.videoURL
      }" ${Config.backgroundVideoMuted ? 'muted' : ''} ${
        Config.backgroundVideoLoop ? 'loop' : ''
      } autoplay></video>`
    }

    background.append(backgroundVideo)
  } else {
    let index = 0
    const backgroundImage = $(
      `<img alt="background" class="background" src=${Config.background} />`
    ).appendTo(background)

    function setBackground(src) {
      backgroundImage.fadeOut(Config.colageTimes.imageHide * 1000, function () {
        backgroundImage
          .attr('src', src)
          .fadeIn(Config.colageTimes.imageReveal * 1000)
      })
    }

    function setBackgroundColage() {
      index = (index + 1) % Config.backgrounds.length
      setBackground(Config.backgrounds[index])
    }

    function setRandomBackground() {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * Config.backgrounds.length)
      } while (newIndex === index)
      index = newIndex
      setBackground(Config.backgrounds[index])
    }

    if (!Config.backgroundVideo && Config.backgroundColage.enabled) {
      const intervalFunction = Config.backgroundColage.random
        ? setRandomBackground
        : setBackgroundColage
      setInterval(intervalFunction, Config.colageTimes.interval * 1000)
      setBackground(Config.backgrounds[index])
    }
  }
})
