function createMonths () {
  var months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]

  var monthsEl = document.createElement('select')

  months.forEach(function (month, value) {
    var monthEl = document.createElement('option')
    monthEl.value = value + 1
    monthEl.innerText = month
    monthsEl.appendChild(monthEl)
  })

  return monthsEl
}

function modifyDays (year, month, daysEl) {
  var elChildren = daysEl.children;
  var lastEl = null

  for (var i = 0; i < elChildren.length; i++) {

    var el = elChildren[i]
    var day = parseInt(el.value, 10)

    if (new Date(year, month - 1, day).getDate() === day) {
      el.disabled = false
      lastEl = el
    } else {
      el.disabled = true
      if (el.selected) {
        lastEl.selected = true
      }
    }

  }

}

function createDays () {
  var currentDay = new Date().getDate()
  var dayMin = 1
  var dayMax = 31
  var daysEl = document.createElement('select')

  for (var day = dayMin; day <= dayMax; day++) {
    var dayEl = document.createElement('option')
    dayEl.value = day
    dayEl.innerText = day

    if (day === currentDay) {
      dayEl.selected = true
    }

    daysEl.appendChild(dayEl)

  }

  return daysEl
}

function createYears () {
  var currentYear = new Date().getFullYear()
  var yearMin = currentYear - 50
  var yearMax = currentYear + 1

  var yearsEl = document.createElement('select')
  for (var year = yearMin; year <= yearMax; year++) {
    var yearEl = document.createElement('option')
    yearEl.value = year
    yearEl.innerText = year
    if (year === currentYear) {
      yearEl.selected = true
    }
    yearsEl.appendChild(yearEl)
  }
  return yearsEl
}

jQuery('input[data-schema-key*="date"]').each(function (i, el) {
  // Generate
  var datePicker = document.createElement('div')
  var months = createMonths()
  var years = createYears()
  var days = createDays()
  var currentDate;

  function updateDate () {
    modifyDays(years.value, months.value, days)
    currentDate = months.value + "/" + days.value + "/" + years.value
    el.value = currentDate
  }

  // Watch
  years.addEventListener('change', updateDate)
  months.addEventListener('change', updateDate)
  days.addEventListener('change', updateDate)

  // Render
  datePicker.appendChild(months)
  datePicker.appendChild(days)
  datePicker.appendChild(years)
  el.parentNode.insertBefore(datePicker, el)
  el.hidden = true

  // Set default value
  updateDate()
})

document.querySelector('button').addEventListener('click', function() {
  alert(
    'Value of input is: ' + document.querySelector('input').value
  );
});
