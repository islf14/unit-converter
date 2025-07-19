const $ = (el) => document.querySelector(el)

document.querySelectorAll('li a').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    display(e)
  })
})

function display(e) {
  $('#result').style.display = 'none'
  $('#liLength').classList.remove('active')
  $('#liWeight').classList.remove('active')
  $('#liTemperature').classList.remove('active')
  $('#Length').style.display = 'none'
  $('#Weight').style.display = 'none'
  $('#Temperature').style.display = 'none'

  $(`#li${e.target.textContent}`).classList.add('active')
  $(`#${e.target.textContent}`).style.display = 'block'
  $(`#${e.target.textContent} form`).style.display = 'block'
}

function myParseFloat(value) {
  const parsedValue = parseFloat(value)
  if (isNaN(parsedValue)) return false
  return parsedValue
}

function validateField(input, unitFrom, unitTo, error) {
  const parsedFloat = myParseFloat(input.value)
  if (parsedFloat) {
    if (unitFrom.value !== unitTo.value) {
      error.innerText = ''
      return parsedFloat
    } else {
      error.innerText = 'Select the unit to convert.'
      return false
    }
  } else {
    error.innerText = 'Complete the field.'
    return false
  }
}

function writeResult(value, unitFrom, result, unitTo) {
  $('#lenInpNum').innerText = value
  $('#lenInpSym').innerText = unitFrom
  $('#lenResNum').innerText = result
  $('#lenResSym').innerText = unitTo
  $('#result').style.display = 'block'
}

$('#formLength').addEventListener('submit', (e) => {
  e.preventDefault()
  const value = validateField(
    $('#input1'),
    $('#unitFrom1'),
    $('#unitTo1'),
    $('#formLength span')
  )
  if (value) {
    const result = convertLength(value)
    $('#input1').value = value
    writeResult(value, $('#unitFrom1').value, result, $('#unitTo1').value)
    e.target.style.display = 'none'
  }
})

$('#formWeight').addEventListener('submit', (e) => {
  e.preventDefault()
  const value = validateField(
    $('#input2'),
    $('#unitFrom2'),
    $('#unitTo2'),
    $('#formWeight span')
  )
  if (value) {
    const result = convertWeight(value)
    $('#input2').value = value
    writeResult(value, $('#unitFrom2').value, result, $('#unitTo2').value)
    e.target.style.display = 'none'
  }
})

$('#formTemperature').addEventListener('submit', (e) => {
  e.preventDefault()
  const value = validateField(
    $('#input3'),
    $('#unitFrom3'),
    $('#unitTo3'),
    $('#formTemperature span')
  )
  if (value) {
    const result = convertTemperature(value)
    $('#input3').value = value
    writeResult(value, $('#unitFrom3').value, result, $('#unitTo3').value)
    e.target.style.display = 'none'
  }
})

$('#reset1').addEventListener('click', (e) => {
  $('#result').style.display = 'none'
  const unitActive = $('[class="active"] a').textContent
  $(`#${unitActive} form`).style.display = 'block'
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

function convertLength(input) {
  switch ($('#unitFrom1').value) {
    case 'mm':
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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
      switch ($('#unitTo1').value) {
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

// 1 g = 0.03527396195 oz
// 1 lb = 453.592369999995 g
// 1 lb = 16 oz

function convertWeight(input) {
  switch ($('#unitFrom2').value) {
    case 'mg':
      switch ($('#unitTo2').value) {
        case 'g':
          return input / 1000
        case 'kg':
          return input / 1000000
        case 'oz':
          return input * 0.00003527396195 // 1 g = 0.03527396195 oz
        case 'lb':
          return input / 453592.369999995 // 1 lb = 453.592369999995 g
      }
      break
    case 'g':
      switch ($('#unitTo2').value) {
        case 'mg':
          return input * 1000
        case 'kg':
          return input / 1000
        case 'oz':
          return input * 0.03527396195 // 1 g = 0.03527396195 oz
        case 'lb':
          return input / 453.592369999995 // 1 lb = 453.592369999995 g
      }
      break

    case 'kg':
      switch ($('#unitTo2').value) {
        case 'mg':
          return input * 1000000
        case 'g':
          return input * 1000
        case 'oz':
          return input * 35.27396195 // 1 g = 0.03527396195 oz
        case 'lb':
          return input / 0.453592369999995 // 1 lb = 453.592369999995 g
      }
      break

    case 'oz': // 1 g = 0.03527396195 oz
      switch ($('#unitTo2').value) {
        case 'mg':
          return input / 0.00003527396195
        case 'g':
          return input / 0.03527396195
        case 'kg':
          return input / 35.27396195
        case 'lb':
          return input / 16 // 1 lb = 16 oz
      }
      break
    case 'lb': // 1 lb = 453.592369999995 g
      switch ($('#unitTo2').value) {
        case 'mg':
          return input * 453592.369999995
        case 'g':
          return input * 453.592369999995
        case 'kg':
          return input * 0.453592369999995
        case 'oz':
          return input * 16 // 1 lb = 16 oz
      }
      break
  }
}

// °F = °C * 1.8 + 32
// K = °C + 273.15
// °F = K * 1.8 - 459.67

function convertTemperature(input) {
  switch ($('#unitFrom3').value) {
    case '°C':
      switch ($('#unitTo3').value) {
        case '°F':
          return input * 1.8 + 32
        case 'K':
          return input + 273.15
      }
      break
    case '°F':
      switch ($('#unitTo3').value) {
        case '°C':
          return (input - 32) / 1.8
        case 'K':
          return (input + 459.67) / 1.8
      }
      break
    case 'K':
      switch ($('#unitTo3').value) {
        case '°C':
          return input - 273.15
        case '°F':
          return input * 1.8 - 459.67
      }
      break
  }
}
