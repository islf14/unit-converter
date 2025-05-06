const $ = el => document.querySelector(el)

const menuLen = $('#menuLen')
const menuWei = $('#menuWei')
const menuTem = $('#menuTem')
const menu1 = $('#menu1')
const menu2 = $('#menu2')
const menu3 = $('#menu3')

const page1 = $('#page1')
const form1 = $('#form1')
const result1 = $('#result1')
const span1 = $('#form1 span')
const input1 = $('#input1')
const reset1 = $('#reset1')
const lenInpNum = $('#lenInpNum')
const lenInpSym = $('#lenInpSym')
const lenResNum = $('#lenResNum')
const lenResSym = $('#lenResSym')
const unitFrom1 = $('#unitFrom1')
const unitTo1 = $('#unitTo1')

const page2 = $('#page2')

const page3 = $('#page3')

menuLen.addEventListener('click', (e) => {
  e.preventDefault()
  menu1.classList.add('active')
  menu2.classList.remove('active')
  menu3.classList.remove('active')
  page1.style.display = 'block'
  page2.style.display = 'none'
  page3.style.display = 'none'
})

menuWei.addEventListener('click', (e) => {
  e.preventDefault()
  menu1.classList.remove('active')
  menu2.classList.add('active')
  menu3.classList.remove('active')
  page1.style.display = 'none'
  page2.style.display = 'block'
  page3.style.display = 'none'
})

menuTem.addEventListener('click', (e) => {
  e.preventDefault()
  menu1.classList.remove('active')
  menu2.classList.remove('active')
  menu3.classList.add('active')
  page1.style.display = 'none'
  page2.style.display = 'none'
  page3.style.display = 'block'
})

function myParseFloat (value) {
  const parsedValue = parseFloat(value)
  if (isNaN(parsedValue)) return false
  return parsedValue
}

function validateField1 () {
  const parsedInt = myParseFloat(input1.value)
  if (parsedInt && unitFrom1.value !== unitTo1.value) {
    span1.innerText = ''
    span1.style.color = 'green'
    return parsedInt
  } else {
    span1.innerText = 'Complete the field and choose the unit.'
    span1.style.color = 'red'
    return false
  }
}

form1.addEventListener('submit', (e) => {
  e.preventDefault()
  const value = validateField1()
  if (value) {
    const result = convertLength(value)

    input1.value = value
    lenInpNum.innerText = value
    lenInpSym.innerText = unitFrom1.value
    lenResNum.innerText = result
    lenResSym.innerText = unitTo1.value

    result1.style.display = 'block'
    form1.style.display = 'none'
  }
})

reset1.addEventListener('click', (e) => {
  result1.style.display = 'none'
  form1.style.display = 'block'
})

// 1 in = 0.0254 m
// 1 ft = 0.3048 m
// 1 yd = 0.9144 m
// 1 mi = 1609.344 m

// 1 in = 0.0833 ft
// 1 yd = 36 in
// 0.01 mi = 633.60 in // or // 1 mi = 63360.00000000001 in

// 1 yd = 3 ft
// 1 mi = 5280 ft

// 1 mi = 1760 yd

function convertLength (input) {
  switch (unitFrom1.value) {
    case 'mm':
      switch (unitTo1.value) {
        case 'cm':
          return input / 10
        case 'm':
          return input / 1000
        case 'km':
          return input / 1000000
        case 'in':
          return input / 25.4 // 1 in = 0.0254 m
        case 'ft':
          return input / 304.8 // 1 ft = 0.3048 m
        case 'yd':
          return input / 914.4 // 1 yd = 0.9144 m
        case 'mi':
          return input / 1609344 // 1 mi = 1609.344 m
      }
      break

    case 'cm':
      switch (unitTo1.value) {
        case 'mm':
          return input * 10
        case 'm':
          return input / 100
        case 'km':
          return input / 100000
        case 'in':
          return input / 2.54 // 1 in = 0.0254 m
        case 'ft':
          return input / 30.48 // 1 ft = 0.3048 m
        case 'yd':
          return input / 91.44 // 1 yd = 0.9144 m
        case 'mi':
          return input / 160934.4 // 1 mi = 1609.344 m
      }
      break

    case 'm':
      switch (unitTo1.value) {
        case 'mm':
          return input * 1000
        case 'cm':
          return input * 100
        case 'km':
          return input / 1000
        case 'in':
          return input / 0.0254 // 1 in = 0.0254 m
        case 'ft':
          return input / 0.3048 // 1 ft = 0.3048 m
        case 'yd':
          return input / 0.9144 // 1 yd = 0.9144 m
        case 'mi':
          return input / 1609.344 // 1 mi = 1609.344 m
      }
      break

    case 'km':
      switch (unitTo1.value) {
        case 'mm':
          return input * 1000000
        case 'cm':
          return input * 100000
        case 'm':
          return input * 1000
        case 'in':
          return input / 0.0000254 // 1 in = 0.0254 m
        case 'ft':
          return input / 0.0003048 // 1 ft = 0.3048 m
        case 'yd':
          return input / 0.0009144 // 1 yd = 0.9144 m
        case 'mi':
          return input / 1.609344 // 1 mi = 1609.344 m
      }
      break

    case 'in': // 1 in = 0.0254 m
      switch (unitTo1.value) {
        case 'mm':
          return input * 25.4
        case 'cm':
          return input * 2.54
        case 'm':
          return input * 0.0254
        case 'km':
          return input * 0.0000254
        case 'ft':
          return input * 0.0833 // 1 in = 0.0833 ft
        case 'yd':
          return input / 36 // 1 yd = 36 in
        case 'mi':
          return input / 63360 // 0.01 mi = 633.60 in
      }
      break
    case 'ft': // 1 ft = 0.3048 m
      switch (unitTo1.value) {
        case 'mm':
          return input * 304.8
        case 'cm':
          return input * 30.48
        case 'm':
          return input * 0.3048
        case 'km':
          return input * 0.0003048
        case 'in':
          return input / 0.0833 // 1 in = 0.0833 ft
        case 'yd':
          return input / 3 // 1 yd = 3 ft
        case 'mi':
          return input / 5280 // 1 mi = 5280 ft
      }
      break

    case 'yd': // 1 yd = 0.9144 m
      switch (unitTo1.value) {
        case 'mm':
          return input * 914.4
        case 'cm':
          return input * 91.44
        case 'm':
          return input * 0.9144
        case 'km':
          return input * 0.0009144
        case 'in':
          return input * 36 // 1 yd = 36 in
        case 'ft':
          return input * 3 // 1 yd = 3 ft
        case 'mi':
          return input / 1760 // 1 mi = 1760 yd
      }
      break

    case 'mi': // 1 mi = 1609.344 m
      switch (unitTo1.value) {
        case 'mm':
          return input * 1609344
        case 'cm':
          return input * 160934.4
        case 'm':
          return input * 1609.344
        case 'km':
          return input * 1.609344
        case 'in':
          return input * 63360 // 0.01 mi = 633.60 in
        case 'ft':
          return input * 5280 // 1 mi = 5280 ft
        case 'yd':
          return input * 1760 // 1 mi = 1760 yd
      }
      break
  }
}
