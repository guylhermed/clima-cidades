// Variáveis e seleção de elementos
const apiKey = 'f760c1c59c3eb3c980d9de07f17f7f36'
const apiCountryURL = 'https://countryflagsapi.com/png/'
const apiUnsplash = 'https://source.unsplash.com/1600x900/?'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

const errorMessageContainer = document.querySelector('#error-message')
const loader = document.querySelector('#loader')

const suggestionContainer = document.querySelector('#suggestions')
const suggestionButtons = document.querySelectorAll('#suggestions button')

// Loader
const toggleLoader = () => {
  loader.classList.toggle('hide')
}

const getWeatherData = async city => {
  toggleLoader()

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  toggleLoader()

  return data
}

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove('hide')
}

const hideInformation = () => {
  errorMessageContainer.classList.add('hide')
  weatherContainer.classList.add('hide')

  suggestionContainer.classList.add('hide')
}

const showWeatherData = async city => {
  hideInformation()

  const data = await getWeatherData(city)

  if (data.cod === '404') {
    showErrorMessage()
    return
  }

  cityElement.innerText = data.name
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description
  weatherIconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )
  countryElement.setAttribute('src', apiCountryURL + data.sys.country)
  umidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/h`

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`

  weatherContainer.classList.remove('hide')
}

searchBtn.addEventListener('click', async e => {
  e.preventDefault()

  const city = cityInput.value

  showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value

    showWeatherData(city)
  }
})

// Sugestões
suggestionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const city = btn.getAttribute('id')

    showWeatherData(city)
  })
})

/*============================= TEMA ESCURO ==================*/
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Tópico previamente selecionado (se selecionado pelo usuário)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtemos o tema atual que a interface possui validando a classe dark-theme
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// Validamos se o usuário escolheu previamente um tema
if (selectedTheme) {
  // Se a validação for cumprida, perguntamos qual era o problema para saber se ativamos ou desativamos o dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  )
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](
    iconTheme
  )
}

// Ative/desative o tema manualmente com o botão
themeButton.addEventListener('click', () => {
  // Adicione ou remova o tema escuro/ícone
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // Salvamos o tema e o ícone atual que o usuário escolheu
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
