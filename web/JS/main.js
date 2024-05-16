$(function () {
  // Fullscreen
  const socialscontainer = $('.socials-container')
  const infoContainer = $('.info-container')
  const logo = $('#logo')
  const fullscreenicon = $('#fullscreen > i')
  $('#fullscreen').append(
    '<tool-tip role="tooltip" class="fullscreentooltip">Fullscreen</tool-tip>'
  )
  $('#fullscreen').click(function () {
    if (background.css('filter') === 'brightness(1)') {
      background.css('filter', 'brightness(0.3)')
      socialscontainer.fadeIn()
      infoContainer.fadeIn()
      fullscreenicon.attr('class', 'fa-solid fa-expand')
      logo.fadeIn()
    } else {
      socialscontainer.fadeOut()
      infoContainer.fadeOut()
      logo.fadeOut()
      background.css('filter', 'brightness(1)')
      fullscreenicon.attr('class', 'fa-solid fa-compress')
    }
  })

  // Logo
  $('#logo').attr('src', Config.logo.URL)

  // Welcome Message
  const welcome = Config.welcome
  const welcomeHTML = `
  <i class="${welcome.icon}"></i> <h1>${welcome.text}</h1>
  
  `
  $('#welcome').append(welcomeHTML)
})
