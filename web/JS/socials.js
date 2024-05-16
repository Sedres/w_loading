$(function () {
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
