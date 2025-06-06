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

        // Auto-slide for mobile with width less than 768 px
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

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after it's visible
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
});