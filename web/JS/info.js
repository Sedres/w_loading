$(function () {
  // Info

  $('#infoText').hide()
  let currentButton = null // Variable para rastrear el botón actualmente activo

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
      if (currentButton === key) {
        // Si el mismo botón se vuelve a pulsar y está visible, cerrar el contenedor
        $('#infoText').slideUp(300, function () {
          $('#infoText').empty()
          currentButton = null // Resetear el botón activo
        })
      } else {
        // Si otro botón se pulsa o no hay contenido visible
        if ($('#infoText').is(':visible')) {
          $('#infoText').slideUp(300, function () {
            $('#infoText').empty().append(textHtml).slideDown(300)
            currentButton = key // Actualizar el botón activo
          })
        } else {
          $('#infoText').empty().append(textHtml).slideDown(300)
          currentButton = key // Actualizar el botón activo
        }
      }
    })
  })
})
