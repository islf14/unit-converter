// element.classList.add("my-class");

const $ = el => document.querySelector(el)

// const page1 = document.getElementById('page1')
const form1 = document.querySelector('#form1')
const result1 = $('#result1')
const span1 = $('#form1 span')
const input1 = $('#input1')
const reset1 = $('#reset1')
// const fr1 = $('#fr1')
// const to1 = document.getElementById('to1')

function myParseInt (value) {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) return false
  return parsedValue
}

function validateField () {
  const parsedInt = myParseInt(input1.value)
  if (parsedInt) {
    span1.innerText = ''
    span1.style.color = 'green'
    // return the number
    return parsedInt
  } else {
    span1.innerText = 'error, complete the fields'
    span1.style.color = 'red'
    return false
  }
}
form1.addEventListener('submit', (e) => {
  e.preventDefault()
  const value = validateField()
  if (value) {
    const result = convertToCentimeter(value)
    result1.style.display = 'block'
    form1.style.display = 'none'
    console.log(result)
  }
})

reset1.addEventListener('click', (e) => {
  input1.value = ''
  form1.style.display = 'block'
  result1.style.display = 'none'
})

function convertToCentimeter (input) {
  const result = input / 10
  return result
}

// 1 ″ = 0.0254 m
// 1 ft = 0.3048 m
// 1 yd = 0.9144 m
// 1 mi = 1609.344 m

// 1 ″ = 0.0833 ft
// 1 yd = 36 ″
// 0.01 mi = 633.60 ″ // or // 1 mi = 63360.00000000001 ″

// 1 yd = 3 ft
// 1 mi = 5280 ft

// 1 mi = 1760 yd
