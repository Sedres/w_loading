// Listeners
window.addEventListener('load', () => {
  setComponents()
})

window.addEventListener('message', (event) => {
  if (event.data.eventName === 'loadProgress') {
    setProgress(parseInt(event.data.loadFraction * 100))
  }
})

const setComponents = () => {
  // Socials
  const socialsContainer = document.getElementById('socials')
  Config.socials.forEach((social) => {
    const a = document.createElement('a')
    a.href = social.link
    const img = document.createElement('img')
    img.src = social.icon
    img.className = social.class
    a.appendChild(img)
    socialsContainer.appendChild(a)
  })

  // Updates
  const updatesContainer = document.getElementById('updates-container')
  const updatesFragment = document.createDocumentFragment()
  Config.updates.forEach((update) => {
    const li = document.createElement('li')
    li.textContent = update
    updatesFragment.appendChild(li)
  })
  updatesContainer.appendChild(updatesFragment)

  // TextLabel
  const loadingText = document.getElementById('loading-text')
  const randomText = Math.floor(Math.random() * Config.loadingText.length)
  loadingText.textContent = Config.loadingText[randomText]

  // Background
  const background = document.getElementById('bg')
  background.src = Config.background
}

const setProgress = (value) => {
  const progress = document.getElementById('loading-proggers')
  progress.value = value

  // Get the logo box by its ID
  const logoBox = document.getElementById('boxLogo')

  // Calculate the shadow intensity based on the progress
  const shadowIntensity = (value / 100) * 0.9 // 0.9 is the maximum shadow intensity

  // Apply the shadow animation class and adjust the shadow based on the progress
  logoBox.style.boxShadow = `0 0 20px rgba(212, 0, 255, ${shadowIntensity})`
  BusyspinnerOff()
}
