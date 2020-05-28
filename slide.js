const sections = document.querySelectorAll("section")

// nice easing!
const easeInCubic = function(x) {
  return x * x * x;
}

// work it out on scroll
const calculate = function () {
  // how many pixels down the page are we?
  const pixels = window.pageYOffset
  
  sections.forEach((section, index) => {
    
    // 1500px per section
    // 1000px scroll within each section
    // increase 1500 for distance between section one
    // increase 1000 for slower movement
    let pc = (pixels - (index * 1500)) / 1000
        
    // make each between 0 and 1
    pc = Math.min(pc, 1)
    pc = Math.max(0, pc)
    
    // add easing
    pc = easeInCubic(pc)
    
    // pick left and right
    const leftDiv = section.querySelector("div")
    const rightDiv = section.querySelector("div:last-child")
    
    // move them out in each direction
    leftDiv.style.transform = `translate(${-100 * pc}%, 0)`
    rightDiv.style.transform = `translate(${100 * pc}%, 0)`
    
    // work out differences between two oranges
    // light orange is rgb(248, 245, 221)
    // dark orange is rgb(217, 134, 1)
    const r = 248 - (31 * pc)
    const g = 245 - (111 * pc)
    const b = 221 - (220 * pc)

    // rgb me up
    leftDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    rightDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  })
}

// make the first section on top
sections.forEach((section, index) => {
  section.style.zIndex = 1000 - index
})

// run on load
calculate()

// and on scroll
window.addEventListener("scroll", function () {
  calculate()
})