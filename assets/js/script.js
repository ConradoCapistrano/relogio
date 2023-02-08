let digitalElement = document.querySelector('.digital');
let clock = document.querySelector('#utility-clock');

utilityClock(clock)

autoResize(clock, 295 + 32)

function utilityClock(container) {
    let dynamic = container.querySelector('.dynamic')
    let hourElement = container.querySelector('.hour')
    let minuteElement = container.querySelector('.minute')
    let secondElement = container.querySelector('.second')
    let minute = function(n) {
        return n % 5 == 0 ? minuteText(n) : minuteLine(n)
    }
    let minuteText = function(n) {
        let element = document.createElement('div')
        element.className = 'minute-text'
        element.innerHTML = (n < 10 ? '0' : '') + n
        position(element, n / 60, 135)
        dynamic.appendChild(element)
    }
    let minuteLine = function(n) {
        let anchor = document.createElement('div')
        anchor.className = 'anchor'
        let element = document.createElement('div')
        element.className = 'element minute-line'
        rotate(anchor, n)
        anchor.appendChild(element)
        dynamic.appendChild(anchor)
    }
    let hour = function(n) {
        let element = document.createElement('div')
        element.className = 'hour-text hour-' + n
        element.innerHTML = n
        position(element, n / 12, 105)
        dynamic.appendChild(element)
    }
    let position = function(element, phase, r) {
        let theta = phase * 2 * Math.PI
        element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
        element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
    }
    let rotate = function(element, second) {
        element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
    }
    let animate = function() {
        let now = new Date()
        let time = now.getHours() * 3600 +
                    now.getMinutes() * 60 +
                    now.getSeconds() * 1 +
                    now.getMilliseconds() / 1000
        
        digitalElement.innerHTML = `${fixZero(now.getHours())}:${fixZero(now.getMinutes())}:${fixZero(now.getSeconds())}`;
        
        rotate(secondElement, time)
        rotate(minuteElement, time / 60)
        rotate(hourElement, time / 60 / 12)
        requestAnimationFrame(animate)
    }
    for (let i = 1; i <= 60; i ++) minute(i)
    for (let i = 1; i <= 12; i ++) hour(i)
    animate()
}

function fixZero(timeDigital) {
    return timeDigital < 10 ? `0${timeDigital}` : timeDigital;
}

function autoResize(element, nativeSize) {
  let update = function() {
    let parent = element.offsetParent
    let scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize
    element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
  }
  update()
  window.addEventListener('resize', update)
}
