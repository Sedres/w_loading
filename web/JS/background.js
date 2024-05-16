$(function () {
  // Background
  let index = 0
  const background = $('#background')

  // Funcions
  function setBackground(src) {
    background.fadeOut(Config.colageTimes.imageHide * 1000, function () {
      background.attr('src', src).fadeIn(Config.colageTimes.imageReveal * 1000)
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

  // Intervalo
  if (Config.backgroundColage.enabled) {
    const intervalFunction = Config.backgroundColage.random
      ? setRandomBackground
      : setBackgroundColage
    setInterval(intervalFunction, Config.colageTimes.interval * 1000)
  }
  $('#background').attr('src', Config.background)
})
