
// menu toggler
function toggler() {
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)

        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu')
            toggle.classList.toggle('show-icon')
        })
    }

    showMenu('nav-toggle', 'nav-menu')

    const dropdownItems = document.querySelectorAll('.dropdown__item')

    dropdownItems.forEach((item) => {
        const dropdownButton = item.querySelector('.dropdown__button')

        dropdownButton.addEventListener('click', () => {
            const showDropdown = document.querySelector('.show-dropdown')

            toggleItem(item)

            if (showDropdown && showDropdown !== item) {
                toggleItem(showDropdown)
            }
        })
    })

    const toggleItem = (item) => {
        const dropdownContainer = item.querySelector('.dropdown__container')

        if (item.classList.contains('show-dropdown')) {
            dropdownContainer.removeAttribute('style')
            item.classList.remove('show-dropdown')
        } else {
            dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
            item.classList.add('show-dropdown')
        }
    }

    const mediaQuery = matchMedia('(min-width: 1118px)'),
        dropdownContainer = document.querySelectorAll('.dropdown__container')

    const removeStyle = () => {
        if (mediaQuery.matches) {
            dropdownContainer.forEach((e) => {
                e.removeAttribute('style')
            })

            dropdownItems.forEach((e) => {
                e.classList.remove('show-dropdown')
            })
        }
    }

    addEventListener('resize', removeStyle)
}
toggler()


// Hero section carousel
function heroSection() {
    const carousel = document.querySelector('.carousel');

    let index = 0;
    const images = document.querySelectorAll('.carousel img');
    const totalImages = images.length;

    const firstClone = images[0].cloneNode(true);
    const lastClone = images[totalImages - 1].cloneNode(true);

    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, images[0]);

    carousel.style.transform = `translateX(-100%)`;

    const updateCarousel = () => {
        carousel.style.transform = `translateX(-${(index + 1) * 100}%)`;
        carousel.style.transition = 'transform 0.5s ease-in-out';
    };

    const handleTransitionEnd = () => {
        if (index === totalImages) {
            index = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${(index + 1) * 100}%)`;
        } else if (index === -1) {
            index = totalImages - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${(index + 1) * 100}%)`;
        }
    };

    carousel.addEventListener('transitionend', handleTransitionEnd);

    const slideNext = () => {
        index++;
        updateCarousel();
    };

    setInterval(slideNext, 3000);
}

heroSection();

function faq() {
    document.querySelectorAll('.faq-button').forEach(button => {
        button.addEventListener('click', () => {
            const faqAnswer = button.nextElementSibling;
            faqAnswer.style.display = faqAnswer.style.display === 'block' ? 'none' : 'block';

        });
    });
}
faq();



function scroll() {
    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.partnerCourosel');
        const images = carousel.querySelectorAll('img');
        const speed = 15;
        const totalWidth = carousel.scrollWidth;

        images.forEach(image => {
            const clone = image.cloneNode(true);
            carousel.appendChild(clone);
        });

        const resetPosition = () => {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0)`;
            setTimeout(() => {
                carousel.style.transition = `transform ${speed * 2}s linear`;
            }, 50);
        };

        let scrollAnimation = carousel.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(-${totalWidth / 2}px)` }
            ],
            {
                duration: speed * 2000,
                iterations: Infinity,
                easing: 'linear'
            }
        );

        carousel.addEventListener('mouseover', () => scrollAnimation.pause());
        carousel.addEventListener('mouseout', () => scrollAnimation.play());

        carousel.addEventListener('transitionend', resetPosition);
    });

}
scroll()
