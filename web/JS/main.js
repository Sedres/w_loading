$(function () {
  // Background
  let index = 0
  const background = $('#background')

  // Funciones
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

  // Fullscreen
  const socialscontainer = $('.socials-container')
  const logo = $('#logo')
  const fullscreenicon = $('#fullscreen > i')
  $('#fullscreen').append(
    '<tool-tip role="tooltip" class="fullscreentooltip">Fullscreen</tool-tip>'
  )
  $('#fullscreen').click(function () {
    if (background.css('filter') === 'brightness(1)') {
      background.css('filter', 'brightness(0.3)')
      socialscontainer.fadeIn()
      fullscreenicon.attr('class', 'fa-solid fa-expand')
      logo.fadeIn()
    } else {
      socialscontainer.fadeOut()
      logo.fadeOut()
      background.css('filter', 'brightness(1)')
      fullscreenicon.attr('class', 'fa-solid fa-compress')
    }
  })

  // Logo
  $('#logo').attr('src', Config.logo.URL)

  // Socials
  const socialsContainer = $('#socials')
  const socialToggle = $('#social-toggle')
  const socialToggleIcon = socialToggle.children('i')

  Object.entries(Config.socials).forEach(([key, social]) => {
    const { icon, URL } = social
    const socialHTML = `<a onclick="window.invokeNative('openUrl', '${URL}')">
        <tool-tip role="tooltip" class="socialtooltip">${key}</tool-tip>
        <i class="${icon}"></i>
      </a>`
    socialsContainer.append(socialHTML).hide()
  })

  socialToggleIcon
    .attr('class', 'fa-solid fa-arrow-left-from-arc')
    .css('rotate', '0deg')

  socialToggle.on('click', function () {
    if (socialsContainer.hasClass('open-socials')) {
      socialsContainer
        .removeClass('open-socials')
        .addClass('close-socials')
        .fadeOut()
      socialToggleIcon.css('transform', 'rotate(0)')
    } else {
      socialsContainer
        .addClass('open-socials')
        .removeClass('close-socials')
        .fadeIn()
      socialToggleIcon.css('transform', 'rotate(180deg)')
    }
  })
})
