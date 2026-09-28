const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const menuIcon = mobileMenuBtn.querySelector("i")
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  if (mobileMenu.classList.contains("active")) {
    menuIcon.className = "fas fa-times"
  } else {
    menuIcon.className = "fas fa-bars"
  }
})
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }

    mobileMenu.classList.remove("active")
    menuIcon.className = "fas fa-bars"
  })
})
document.querySelector(".cta-btn").addEventListener("click", () => {
  const projectsSection = document.getElementById("projects")
  const headerHeight = document.querySelector(".header").offsetHeight
  const targetPosition = projectsSection.offsetTop - headerHeight

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  })
})

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")
  const headerHeight = document.querySelector(".header").offsetHeight

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")
  if (!name || !email || !message) {
    showMessage("Please fill in all fields.", "error")
    return
  }
  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error")
    return
  }
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true
  setTimeout(() => {
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    showMessage("Thank you for your message! I'll get back to you soon.", "success")
  }, 2000)
})
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
function showMessage(message, type) {
  formMessage.textContent = message
  formMessage.className = `form-message ${type}`
  formMessage.style.display = "block"
  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
}
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("skill-card")) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards"
      } else if (entry.target.classList.contains("project-card")) {
        entry.target.style.animation = "slideInLeft 0.8s ease-out forwards"
      } else if (entry.target.classList.contains("about-card")) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
      }
    }
  })
}, observerOptions)
document.querySelectorAll(".skill-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.animationDelay = `${index * 0.1}s`
  observer.observe(card)
})

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.animationDelay = `${index * 0.2}s`
  observer.observe(card)
})

document.querySelectorAll(".about-card").forEach((card) => {
  card.style.opacity = "0"
  observer.observe(card)
})
const scrollToTopBtn = document.getElementById("scrollToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.05)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}
window.addEventListener("load", () => {
  const heroDescription = document.querySelector(".hero-description")
  if (heroDescription) {
    const originalText = heroDescription.textContent
    setTimeout(() => {
      typeWriter(heroDescription, originalText, 30)
    }, 1000)
  }
})
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    if (!this.classList.contains("loading")) {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    }
  })
const revealElements = document.querySelectorAll(".section-title, .about-text, .contact-subtitle")

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 1s ease-out forwards"
      }
    })
  },
  { threshold: 0.1 },
)
revealElements.forEach((element, index) => {
  element.style.opacity = "0"
  element.style.animationDelay = `${index * 0.2}s`
  revealObserver.observe(element)
})
