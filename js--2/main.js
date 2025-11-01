// function test() {
//    let foo = null
//    return foo
// }

// foo = 123
// console.log(foo)
// console.log(test())
// ==========================================================================
// const first = 5
// const second = 5

// let result = null

// if (first === second) {
//    result = first + second
// } else {
//    result = second - first
// }
// console.log(result)
// ==========================================================================

// const array = [1, 2, 3, 4]
// array.unshift()
// console.log(array.length)

// const array = [
//    {
//       name : 'marat',
//       age : 32
//    },
//    {
//       name : 'alex',
//       age : 31
//    },
//    {
//       name : 'max',
//       age : 25
//    }
// ]

// const usersName =[]

// array.forEach((user) => {
//    usersName.push(user.age)
//    usersName.push(user.name)
// })
// console.log(usersName)
// ==========================================================================

// const element = document.querySelector('.block')
// element.textContent = 'marat'
// element.id = 'marat'
// element.style.color = '#110675ff'
// element.style.fontSize = '20px'

// console.log(element)

// ==========================================================================

// const element = document.querySelector('div')
// const elements = document.querySelectorAll('div')
// elements.forEach((element) => {
//    element.style.color = '#110675ff'
// })
// console.log(element)  '#e00e0eff'
// ==========================================================================
// const button = document.querySelector('.btn')
// let btnIsRed = false
// button.addEventListener('click', () => {
//    if (btnIsRed === true) {
//    button.style.backgroundColor = '#e00e0eff'
//    btnIsRed = false
//    } else {
//    button.style.backgroundColor = '#7570a3ff'
//    btnIsRed = true
//    }
// })
// ==========================================================================
// function scrolling () {
//    console.log('scroll')
// }
// document.addEventListener('scroll', scrolling)
// ==========================================================================

// const btn = document.querySelector('.btn')
// const text = document.querySelector('.text')

// btn.addEventListener('click', () => {
//    text.classList.toggle('move')
//    // text.classList.remove('red')
//    if (text.classList.contains('move')) {
//       text.textContent = 'я двигаюсь'
//    } else {
//       text.innerText = 'Текст'
//    }
// })
// ==========================================================================
// const btns = document.querySelectorAll('.btn')

// btns.forEach((btn, index) => {
//    btn.addEventListener('click', () => {
//       console.log(index + 1)
//    })
// })
// ==========================================================================
// const btn = document.querySelector('.btn')
// btn.addEventListener('click', event => {
//       event.currentTarget.classList.toggle('red')
// })
// ==========================================================================

// const btnsWrapper = document.querySelector('.btns')


//       btnsWrapper.addEventListener('click', event => {
//             if (event.target && event.target.tagName === 'BUTTON') {
//                   console.log(event.target.textContent)
//             }
//       })
// ==========================================================================

const modal = document.querySelector ('.modal')
const btnOpen = document.querySelector ('.btn-open')
const body = document.body

const openModal = () => {
      modal.classList.add('modal--open')
      body.classList.add('body--fixed')
}

const closeModal = () => {
      modal.classList.remove('modal--open')
      body.classList.remove('body--fixed')
}


      btnOpen.addEventListener('click', openModal)

      modal.addEventListener('click', event => {
            const target = event.target
            if (target && target.classList.contains('modal') || target.classList.contains('modal__close-btn')) {
                  modal.classList.remove('modal--open')
            }

      })

      document.addEventListener('keydown', event => {
            if (event.code ==='Escape' && modal.classList.contains('modal--open')){
                  closeModal ()
            }
      })