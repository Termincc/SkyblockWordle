const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const offsetFromDate = new Date(2022, 0, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
var targetWord = targetWords[Math.floor(Math.random()*targetWords.length)]
var isSetWord = false

startInteraction()

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    if (isSetWord == true) {
      setWordPressKey(e.target.dataset.key)
      return
    }
    pressKey(e.target.dataset.key)
    return
  }

  if (e.target.matches("[data-enter]")) {
    if (isSetWord == true) {
      setWordEnter()
      return
    }
    submitGuess()
    return
  }

  if (e.target.matches("[data-del]")) {
    if (isSetWord == true) {
      setWorddeleteKey()
      return
    }
    deleteKey()
    return
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    if (isSetWord == true) {
      setWordEnter()
      return
    }
    submitGuess()
    return
  }
  if (e.key === "=") {
    showWord()
    return
  }
  if (e.key === "+") {
    enterWord()
  }
  if (e.key === "-") {
    winLmao()
  }
  if (e.key === "1") {
    showLetters(1)
  }
  if (e.key === "2") {
    showLetters(2)
  }
  if (e.key === "3") {
    showLetters(3)
  }
  if (e.key === "4") {
    showLetters(4)
  }
  if (e.key === "5") {
    showLetters(5)
  }
  if (e.key === "!") {
    enterLetters(1)
  }
  if (e.key === "@") {
    enterLetters(2)
  }
  if (e.key === "#") {
    enterLetters(3)
  }
  if (e.key === "$") {
    enterLetters(4)
  }
  if (e.key === "%") {
    enterLetters(5)
  }
  if (e.key === "Delete") {
    if (isSetWord == true) {
      setWordDeleteAll()
      return
    }
    deleteall()
  }
  if (e.key === "Backspace") {
    if (isSetWord == true) {
      setWorddeleteKey()
      return
    }
    deleteKey()
    return 
  }
  if (e.key.match(/^[a-z]$/)) {
    if (isSetWord == true) {
      setWordPressKey(e.key)
      return
    }
    pressKey(e.key)
    return
  }
  if (e.key === "G") {
    if (isSetWord == true) return
    const deleteafterlol = document.getElementById("SW")
    deleteafterlol.remove()
    isSetWord = true
    wordSelect()
    return
  }
}
function setWordPressKey(key) {
  const activeTiles = getActiveTilesSW()
  if (activeTiles.length >= WORD_LENGTH) return
  const setWordGrid = document.querySelector("[data-enter-grid")
  const nextTile = setWordGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "active"
}
function setWorddeleteKey() {
  const activeTiles = getActiveTilesSW()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}
function setWordDeleteAll() {
  for (let f = 0; f<5; f++) {
    const activeTiles = getActiveTilesSW()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
  }
}
function getActiveTilesSW() {
  const setWordGrid = document.querySelector("[data-enter-grid")
  return setWordGrid.querySelectorAll('[data-state="active"]')
}
function wordSelect() {
  const alert = document.createElement("div")
  alert.classList.add("setWord")
  alert.id = "setWordContainer"
  alert.textContent = "Hi"
  alertContainer.prepend(alert)
  document.getElementById("setWordContainer").innerHTML = '<div data-enter-grid class="setWordGrid"><div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div><div class="tile"></div></div>'
  alert.id = ("SWAlert")
  return
}
function setWordEnter() {
  const activeTiles = [...getActiveTilesSW()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough letters")
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")

  if (dictionary.includes(guess)) {
    targetWord = guess
    const SWAlert = document.getElementById("SWAlert")
    SWAlert.remove()
    isSetWord = false
  } else {
    showAlert("Not in word list")
    shakeTiles(activeTiles)
    return
  }
  deleteall()
}
function getWordList() {
  let getWordList = []
  for (let p = 0; p<5; p++)
  getWordList.push(targetWord[p])
  return getWordList
}
function deleteall() {
  for (let f = 0; f<5; f++) {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
  }
}
function enterLetters(amt) {
  deleteall()
  for (let l = 0; l<amt; l++) {
    pressKey(targetWord[l])
  }
}
function showWord() {
  showAlert(targetWord, 10)
}

function enterWord() {
  for (let a = 0; a<5; a++) {
    pressKey(targetWord[a])
  }
}
function showLetters(amt) {
  let amt2 = 5-amt;
  let show = targetWord.slice(0,amt);
  for (let a =0; a<amt2; a++) {
    show += '_';
  }
  showAlert(show)
}
function winLmao() {
  for (let a = 0; a<5; a++) {
    pressKey(targetWord[a])
  }
  submitGuess()
}

function pressKey(key) {
  if (key == "SW") {
    wordSelect()
    isSetWord = true
    const deleteafter = document.getElementById("SW")
    deleteafter.remove()
    return
  }
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "active"
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess() {
  wordList = getWordList()
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough letters")
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")

  if (!dictionary.includes(guess)) {
    showAlert("Not in word list")
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * FLIP_ANIMATION_DURATION) / 2)

  tile.addEventListener(
    "transitionend",
    () => {
      var maybe = false
      tile.classList.remove("flip")
      if (targetWord[index] === letter) {
        tile.dataset.state = "correct"
        key.classList.add("correct")
        for (let n = 0; n<5; n++) {
          if (wordList[n] === letter) {
            wordList[n] = "-"
            n = 5
          }
        }
      } else if (targetWord.includes(letter)) {
        for (let n = 0; n<5; n++) {
          if (wordList[n] === letter) {
            for (let p = 0; p<5; p++) {
              if (wordList[p] === guess[p]) {
                tile.dataset.state = "wrong"
                key.classList.add("wrong")
                p = 5
                maybe = true
              }
            }
            if (maybe == false) {
              tile.dataset.state = "wrong-location"
              key.classList.add("wrong-location")
              wordList[n] = "-"
              n=5
            }
          } else {
            tile.dataset.state = "wrong"
            key.classList.add("wrong")
          }
        }
      } else {
        tile.dataset.state = "wrong"
        key.classList.add("wrong")
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert("You Win", 5000)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    stopInteraction()
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}