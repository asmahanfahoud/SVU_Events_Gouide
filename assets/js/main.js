//SLIDER
const slider = document.getElementById('featured-slider')
if (slider) {
  const firstSlide = document.getElementById('event1')
  const secondSlide = document.getElementById('event2')
  const thirdSlide = document.getElementById('event3')
  const slides = [firstSlide, secondSlide, thirdSlide]

  const nextBtn = document.getElementById('next')
  const prevBtn = document.getElementById('prev')
  let current = 0

  function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active')
    }

    slides[index].classList.add('active')
  }

  function nextSlide() {
    current = (current + 1) % slides.length
    showSlide(current)
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length
    showSlide(current)
  }

  nextBtn.onclick = nextSlide
  prevBtn.onclick = prevSlide
}

//FILTERS

const searchInput = document.getElementById('searchInput')
const categoryFilter = document.getElementById('categoryFilter')
const locationFilter = document.getElementById('locationFilter')
const dateFilter = document.getElementById('dateFilter')
const cards = document.getElementsByClassName('event-card')
const cardsArr = []
for (let i = 0; i < cards.length; i++) {
  cardsArr[i] = cards[i]
}

const emptyState = document.getElementById('empty-state')

function filterCards() {
  //trim it to remove eempty spaces from the beginning and end because it is a user input
  const keyword = searchInput.value.trim().toLowerCase()
  //No need to trim the values of this inputs because they are inserted using select element
  const category = categoryFilter.value
  const location = locationFilter.value
  const date = dateFilter.value

  const matchedCards = []
  for (let i = 0; i < cards.length; i++) {
    const currentCard = cards[i]
    const cardTitle = currentCard
      .getElementsByClassName('event-title')[0]
      .textContent.toLowerCase()
    let matchedKeyword = false
    let matchedCategory = false
    let matchedLocation = false
    let matchedDate = false
    if (keyword === '' || cardTitle.includes(keyword)) {
      matchedKeyword = true
    }
    if (category === 'all' || currentCard.classList.contains(category)) {
      matchedCategory = true
    }
    if (location === 'all' || currentCard.classList.contains(location)) {
      matchedLocation = true
    }
    if ((date === 'all') | currentCard.classList.contains(date)) {
      matchedDate = true
    }
    if (matchedKeyword && matchedCategory && matchedLocation && matchedDate) {
      matchedCards[matchedCards.length] = currentCard
    }
  }

  for (let i = 0; i < cards.length; i++) {
    cards[i].parentElement.style.display = 'none'
  }

  for (let i = 0; i < matchedCards.length; i++) {
    matchedCards[i].parentElement.style.display = 'block'
  }
  if (emptyState) {
    if (matchedCards.length === 0) {
      emptyState.style.display = 'block'
    } else {
      emptyState.style.display = 'none'
    }
  }
}

if (searchInput !== null) {
  searchInput.onchange = filterCards
  categoryFilter.onchange = filterCards

  locationFilter.onchange = filterCards
  dateFilter.onchange = filterCards
}

//Validate Form
const form = document.getElementById('contactForm')

function validateInputs(event) {
  event.preventDefault()

  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const message = document.getElementById('message')
  const successAlert = document.getElementById('successAlert')
  const nameAlert = document.getElementById('nameAlert')
  const emailAlert = document.getElementById('emailAlert')
  const messageAlert = document.getElementById('messageAlert')

  successAlert.classList.add('d-none')
  let isNameEmpty = false
  let isEmailEmpty = false
  let isEmailWrong = false
  let isMessageShort = false
  if (name.value === '') {
    isNameEmpty = true
  }
  if (email.value.trim() === '') {
    isEmailEmpty = true
  } else if (email.value.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== 0) {
    isEmailWrong = true
  }
  if (message.value.trim() === '' || message.value.trim().length < 10) {
    isMessageShort = true
  }

  if (isNameEmpty) {
    nameAlert.classList.remove('d-none')
  }
  if (isEmailEmpty || isEmailWrong) {
    emailAlert.classList.remove('d-none')
  }

  if (isMessageShort) {
    messageAlert.classList.remove('d-none')
  }

  if (isNameEmpty === false) {
    nameAlert.classList.add('d-none')
    successAlert.classList.add('d-none')
  }
  if (isEmailEmpty === false && isEmailWrong === false) {
    emailAlert.classList.add('d-none')
    successAlert.classList.add('d-none')
  }
  if (isMessageShort === false) {
    messageAlert.classList.add('d-none')
    successAlert.classList.add('d-none')
  }
  if (
    isNameEmpty === false &&
    isEmailWrong === false &&
    isEmailEmpty === false &&
    isMessageShort === false
  ) {
    nameAlert.classList.add('d-none')
    emailAlert.classList.add('d-none')
    messageAlert.classList.add('d-none')
    successAlert.classList.remove('d-none')
    name.value = ''
    email.value = ''
    message.value = ''
  }
}
if (form !== null) {
  form.onsubmit = validateInputs
}

//Local storage
const categoryLinks = document.getElementsByClassName('category-chip')
const saved = localStorage.getItem('preferredCategory')

if (saved && categoryFilter) {
  categoryFilter.value = saved
  filterCards()
}
function setLocalStorage(value) {
  localStorage.setItem('preferredCategory', value)
}
if (categoryLinks.length !== 0) {
  for (let i = 0; i < categoryLinks.length; i++) {
    const value = categoryLinks[i].id
    categoryLinks[i].onclick = () => setLocalStorage(value)
  }
}

//Change color mode

const themeToggle = document.getElementById('themeToggle')
const savedTheme = localStorage.getItem('theme')

if (themeToggle) {
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode')
  }

  function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    }
  }
  themeToggle.onclick = toggleTheme
}

// Language toggle

const languageToggle = document.getElementById('language-toggle')
const savedLanguage = localStorage.getItem('language') || 'ar'

if (languageToggle) {
  function applyLanguage(language) {
    const isEnglish = language === 'en'

    const translatedElements = document.getElementsByClassName('content')
    const translatedInputs = document.getElementsByClassName('content-input')
    const translatedBtns = document.getElementsByClassName('content-btn')

    for (let i = 0; i < translatedElements.length; i++) {
      const element = translatedElements[i]

      const text = isEnglish
        ? element.getAttribute('data-en')
        : element.getAttribute('data-ar')

      if (text !== null) {
        element.textContent = text
      }
    }

    for (let i = 0; i < translatedInputs.length; i++) {
      const input = translatedInputs[i]

      const placeholder = isEnglish
        ? input.getAttribute('data-en-placeholder')
        : input.getAttribute('data-ar-placeholder')

      if (placeholder !== null) {
        input.setAttribute('placeholder', placeholder)
      }
    }

    for (let i = 0; i < translatedBtns.length; i++) {
      const btn = translatedBtns[i]

      const value = isEnglish
        ? btn.getAttribute('data-en-value')
        : btn.getAttribute('data-ar-value')

      if (value !== null) {
        btn.setAttribute('value', value)
      }
    }

    document.documentElement.lang = language
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl'

    if (isEnglish) {
      document.body.classList.remove('lang-ar')
      document.body.classList.add('lang-en')
    } else {
      document.body.classList.remove('lang-en')
      document.body.classList.add('lang-ar')
    }

    localStorage.setItem('language', language)
  }

  function toggleLanguage() {
    const currentLanguage = localStorage.getItem('language') || 'ar'
    const nextLanguage = currentLanguage === 'ar' ? 'en' : 'ar'

    applyLanguage(nextLanguage)
  }

  applyLanguage(savedLanguage)

  languageToggle.onclick = toggleLanguage
}
