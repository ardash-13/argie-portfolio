// CLEAR TEXT-AREA
window.onbeforeunload = () => {
    const forms = document.getElementsByTagName('form');
    for (const form of forms) {
      form.reset();
    }
};

// BACK-TO-TOP
window.onscroll = function() {
    var section = document.querySelector('.project-section');
    var backToTop = document.querySelector('.back-to-top');

    if (section && backToTop) {
        // Calculate the distance from the top of the page to the start of the section
        var sectionTop = section.getBoundingClientRect().top + window.scrollY;
        
        // Show button if the bottom of the screen has reached the top of the section
        if ((window.innerHeight + window.scrollY) >= sectionTop) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }
};

// PROJECT LINKS
document.querySelectorAll(".project-link").forEach(link => {
  link.addEventListener("click", function() {
    const projectName = this.querySelector("img").alt;

    gtag('event', 'project_click', {
      event_category: 'engagement',
      event_label: projectName
    });
  });
});

// TESTIMONIALS AUTO-SCROLL
const wrapper = document.querySelector('.testimonial-wrapper');
let isAutoScrolling = true;

const autoScroll = () => {
    if (!isAutoScrolling) return;

    const cardWidth = wrapper.querySelector('.testimonial-card').offsetWidth + 20; // Card + Gap
    const maxScroll = wrapper.scrollWidth - wrapper.offsetWidth;

    // If we are at the end (or very close to it), reset to start
    if (wrapper.scrollLeft >= maxScroll - 5) {
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        // Scroll exactly one card at a time
        wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
};

let scrollInterval = setInterval(autoScroll, 2000);

// Pause on interaction
wrapper.addEventListener('mouseenter', () => isAutoScrolling = false);
wrapper.addEventListener('mouseleave', () => isAutoScrolling = true);
wrapper.addEventListener('touchstart', () => isAutoScrolling = false);
wrapper.addEventListener('touchend', () => {
    setTimeout(() => isAutoScrolling = true, 2000);
});