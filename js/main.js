//Write your pseduo code first! 

document.querySelector('#inputOne').addEventListener('keyup', function(){conversion('inputOne', 'inputTwo')})
document.querySelector('#inputTwo').addEventListener('keyup', function(){conversion('inputTwo', 'inputOne')})
document.querySelector("#inputOne").addEventListener("keypress", highlightEnter);
document.querySelector("#inputTwo").addEventListener("keypress", highlightEnter);
document.querySelector("#inputOne").addEventListener("click", highlightClick);
document.querySelector("#inputTwo").addEventListener("click", highlightClick);
window.addEventListener("click", function(event) {
    hideDropdown(event, 'buttonOne', 'dropdownOne')
});
window.addEventListener("click", function(event) {
    hideDropdown(event, 'buttonTwo', 'dropdownTwo')
});
document.querySelector("#buttonOne").addEventListener("click", function(){showDropdown("dropdownOne", "buttonOne")})
document.querySelector("#buttonTwo").addEventListener("click", function(){showDropdown("dropdownTwo", "buttonTwo")})
document.querySelector('#buttonOne_a').addEventListener('click', function(){changeUnit('buttonOne', 'buttonTwo', 'a', 'inputOne', 'inputTwo')})
document.querySelector('#buttonOne_b').addEventListener('click', function(){changeUnit('buttonOne', 'buttonTwo', 'b', 'inputOne', 'inputTwo')})
document.querySelector('#buttonOne_c').addEventListener('click', function(){changeUnit('buttonOne', 'buttonTwo', 'c', 'inputOne', 'inputTwo')})
document.querySelector('#buttonTwo_a').addEventListener('click', function(){changeUnit('buttonTwo', 'buttonOne', 'a', 'inputOne', 'inputTwo')})
document.querySelector('#buttonTwo_b').addEventListener('click', function(){changeUnit('buttonTwo', 'buttonOne', 'b', 'inputOne', 'inputTwo')})
document.querySelector('#buttonTwo_c').addEventListener('click', function(){changeUnit('buttonTwo', 'buttonOne', 'c', 'inputOne', 'inputTwo')})

function hideUnit(button) {
    let unit = document.getElementById(button).innerText.toLowerCase()
    let a = document.getElementById(button+"_a")
    let b = document.getElementById(button+"_b")
    let c = document.getElementById(button+"_c")
    if (unit === "celsius") {
        a.classList.add('hide')
        b.classList.remove('hide')
        c.classList.remove('hide')
    } else if (unit === "fahrenheit") {
        a.classList.remove('hide')
        b.classList.add('hide')
        c.classList.remove('hide')
    } else if (unit === "kelvin") {
        a.classList.remove('hide')
        b.classList.remove('hide')
        c.classList.add('hide')
    } 
}
function changeFormula() {
    let unitOne = document.getElementById('buttonOne').innerText.toLowerCase()
    let unitTwo = document.getElementById('buttonTwo').innerText.toLowerCase()
    if (unitOne == 'celsius' && unitTwo == 'fahrenheit') {
        document.getElementById('formula').innerHTML = '(<span id="inputOneValue"></span>°C × 9/5) + 32 = <span id="inputTwoValue"></span>°F'
    } else if (unitOne == 'celsius' && unitTwo == 'kelvin') {
        document.getElementById('formula').innerHTML = '<span id="inputOneValue"></span>°C + 273.15 = <span id="inputTwoValue"></span>K'
       } else if (unitOne == 'fahrenheit' && unitTwo == 'celsius') {
        document.getElementById('formula').innerHTML = '(<span id="inputOneValue"></span>°F - 32) × 5/9 = <span id="inputTwoValue"></span>°C'
    } else if (unitOne == 'fahrenheit' && unitTwo == 'kelvin') {
        document.getElementById('formula').innerHTML = '(<span id="inputOneValue"></span>°F - 32) × 5/9 + 273.15 = <span id="inputTwoValue"></span>°C'
    } else if (unitOne == 'kelvin' && unitTwo == 'celsius') {
        document.getElementById('formula').innerHTML = '<span id="inputOneValue"></span>K - 273.15 = <span id="inputTwoValue"></span>°C'
    } else if (unitOne == 'kelvin' && unitTwo == 'fahrenheit') {
        document.getElementById('formula').innerHTML = '(<span id="inputOneValue"></span>K - 273.15) × 9/5 + 32 = <span id="inputTwoValue"></span>°F'
    }
}
function changeUnit(start, end, unit, primary, secondary) {
    let oldUnit = document.getElementById(start).innerText
    let currentUnit = document.getElementById(start+"_"+unit).innerText
    let endUnit = document.getElementById(end).innerText
    if (currentUnit == endUnit ) {
        document.getElementById(end).innerText = oldUnit
    }
    document.getElementById(start).innerText = currentUnit      
    changeFormula()  
    conversion(primary, secondary)
}

function showDropdown(menu, button) {
    document.getElementById(menu).classList.toggle("show");
    document.getElementById(button).classList.toggle("borderHighlight");
    hideUnit(button)

  }
function highlightEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        this.select();
      }
}
function highlightClick() {
    this.select();
}
function hideDropdown(event, button, menu) {
    if (!event.target.matches('#'+button)) {
        let openDropdown = document.getElementById(menu);
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          document.getElementById(button).classList.remove("borderHighlight");
        }
      }
}
function equation(start, end, value, decimals) {
    if (start == 'celsius' && end == 'fahrenheit') {
        output = (value * (9/5)) + 32;
    } else if (start == 'celsius' && end == 'kelvin') {
        output = value + 273.15;
    } else if (start == 'fahrenheit' && end == 'celsius') {
        output = (value - 32) * (5/9);
    } else if (start == 'fahrenheit' && end == 'kelivin') {
        output = (value - 32) * (5/9) + 273.15;
    } else if (start == 'kelvin' && end == 'celsius') {
        output = value - 273.15;
    } else if (start == 'kelvin' && end == 'fahrenheit') {
        output = (value - 273.15) * (9/5) + 32;
    }
    return Number(Math.round(output+'e'+decimals)+'e-'+decimals);
}
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
function conversion(primary, secondary) {
    let input = document.getElementById(primary)
    let value = document.getElementById(primary).value
    let start = document.getElementById('buttonOne').innerText.toLowerCase()
    let end = document.getElementById('buttonTwo').innerText.toLowerCase()
    let output = equation(start, end, value, 4)

    if (input === document.activeElement ||  document.getElementById('dropdownOne').classList.contains('show') == false || document.getElementById('dropdownTwo').classList.contains('show') == false) {
        if (value === "" || isNaN(output)) {
            document.getElementById(secondary).value = ""
            document.getElementById(primary+'Value').innerText = ""
            document.getElementById(secondary+'Value').innerText = ""
        } else {
            document.getElementById(secondary).value = output
            document.getElementById(primary+'Value').innerText = value
            document.getElementById(secondary+'Value').innerText = round(output, 2)  
        } 
    }
}