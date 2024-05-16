$(function () {
  // Info

  $('#infoText').hide()

  Object.entries(Config.info).forEach(([key, info]) => {
    const { title, description, icon } = info
    const infoHTML = /* html*/ `<a id="${key}">
        <tool-tip role="tooltip" class="infotooltip">${key}</tool-tip>
        <i class="${icon}"></i>
      </a>
    `

    const textHtml = /* html */ `
      <h3>${title}</h3>
      <p>${description}</p>
    `
    $('#info').append(infoHTML)

    const button = $(`#${key}`)
    button.on('click', function () {
      if ($('#infoText').is(':visible')) {
        $('#infoText').hide(300)
        $('#infoText').empty()
      } else {
        $('#infoText').append(textHtml)
        $('#infoText').show(300)
      }
    })
  })
})
