const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('.nav-link');


window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navlinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active')
        }
    });
})


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        const imageEl = card.querySelector('img');
        const images = JSON.parse(card.getAttribute('data-images'));
        let index = 0;
        let intervalId;

        // Auto-slide for mobile
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            intervalId = setInterval(() => {
                index = (index + 1) % images.length;
                imageEl.src = images[index];
            }, 2000);
            return; // don't attach hover events on mobile
        }

        card.addEventListener('mouseenter', () => {
            intervalId = setInterval(() => {
                imageEl.style.opacity = 0;
                setTimeout(() => {
                    index = (index + 1) % images.length;
                    imageEl.src = images[index];
                    imageEl.style.opacity = 1;
                }, 300)
            }, 1300)
        })

        card.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
            imageEl.src = images[0]
        });
    });
});