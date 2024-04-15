// Constantes
const updatesContainer = document.getElementById('updates-container')
const loadingText = document.getElementById('loading-text')
const progress = document.getElementById('loading-proggers')
const backgroundContainer = document.getElementById('background-container')
const logoBox = document.getElementById('boxLogo')
const socialsContainer = document.getElementById('socials')

// Listeners
window.addEventListener('load', setComponents)
window.addEventListener('message', handleProgressMessage)

// Funciones
function setComponents() {
  setSocialIcons()
  setUpdatesList()
  setRandomLoadingText()
  setBackground()
}

function setSocialIcons() {
  Config.socials.forEach((social) => {
    const link = document.createElement('a')
    link.href = social.link
    const img = document.createElement('img')
    img.src = social.icon
    img.className = social.class
    link.appendChild(img)
    socialsContainer.appendChild(link)
  })
}

function setUpdatesList() {
  const updatesFragment = document.createDocumentFragment()
  Config.updates.forEach((update) => {
    const listItem = document.createElement('li')
    listItem.textContent = update
    updatesFragment.appendChild(listItem)
  })
  updatesContainer.appendChild(updatesFragment)
}

function setRandomLoadingText() {
  const randomIndex = Math.floor(Math.random() * Config.loadingText.length)
  loadingText.textContent = Config.loadingText[randomIndex]
}

function setBackground() {
  const backgroundElement =
    Config.background.useVideo && Config.background.mediaType === 'youtube'
      ? createYoutubeVideoElement(Config.background.mediaUrl)
      : Config.background.useVideo && Config.background.mediaType === 'local'
      ? createLocalVideoElement(Config.background.mediaUrl)
      : createImageElement(Config.background.mediaUrl)

  backgroundContainer.appendChild(backgroundElement)
}

function createYoutubeVideoElement(videoId) {
  const video = document.createElement('iframe')
  video.src = `https://youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&loop=1`
  video.classList.add('bg')
  return video
}

function createLocalVideoElement(videoUrl) {
  const video = document.createElement('video')
  video.src = videoUrl
  video.classList.add('bg')
  video.autoplay = true
  video.loop = true
  video.muted = true
  return video
}

function createImageElement(imageUrl) {
  const image = document.createElement('img')
  image.src = imageUrl
  image.classList.add('bg')
  return image
}

function handleProgressMessage(event) {
  if (event.data.eventName === 'loadProgress') {
    setProgress(parseInt(event.data.loadFraction * 100))
  }
}

function setProgress(value) {
  progress.value = value
  const shadowIntensity = (value / 100) * 0.9
  logoBox.style.boxShadow = `0 0 20px rgba(212, 0, 255, ${shadowIntensity})`
  BusyspinnerOff()
}
