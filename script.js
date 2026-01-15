document.addEventListener('DOMContentLoaded', () => {
    // 1. Balloon Spawner (Floating up)
    function spawnBalloon() {
        // Mobile Optimization: Fewer balloons on small screens to prevent lag
        const isMobile = window.innerWidth < 768;
        if(isMobile && document.getElementsByClassName('balloon-anim').length > 5) return;

        const balloon = document.createElement('div');
        balloon.classList.add('balloon-anim');
        
        // Random colors - MORE COLORFUL! 🌈
        const colors = [
            '#FF9EAA', // Baby Rose
            '#89CFF0', // Baby Blue
            '#FFD54F', // Sunny Yellow
            '#81C784', // Mint Green
            '#BA68C8', // Lavender
            '#FF8A65', // Peach
            '#4DD0E1', // Cyan
            '#FFD180'  // Orange Pastel
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position and size
        const size = Math.floor(Math.random() * 30) + 40; // 40-70px
        const left = Math.floor(Math.random() * 100); // 0-100%
        
        balloon.style.background = randomColor;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`; // Oval shape
        balloon.style.left = `${left}%`;
        balloon.style.bottom = '-100px';
        
        document.body.appendChild(balloon);

        // Remove after animation
        setTimeout(() => {
            balloon.remove();
        }, 10000); // Match CSS animation duration
    }

    // Spawn a balloon every 300ms
    setInterval(spawnBalloon, 300);

    // 2. Confetti Cannon (Shoots on load and scroll)
    function fireConfetti() {
        const container = document.body;
        const colors = ['#FF9EAA', '#89CFF0', '#FFC4D6', '#BDE0FE', '#FFF'];
        
        // Mobile Optimization: Reduce particle count from 50 to 20
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 20 : 50;

        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-anim');
            
            // Random start position (center-ish)
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            
            // Random explosion direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 30 + 10;
            const tx = Math.cos(angle) * 200 * (Math.random() + 0.5);
            const ty = Math.sin(angle) * 200 * (Math.random() + 0.5);

            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.setProperty('--tx', `${tx}px`);
            confetti.style.setProperty('--ty', `${ty}px`);
            
            // Random rotation
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }

    // Fire confetti on load
    setTimeout(fireConfetti, 500);
    
    // Auto-fire confetti removed for performance
    // setInterval(fireConfetti, 5000);

    // Fire confetti when clicking the CTA button
    const btn = document.querySelector('.btn');
    if(btn) {
        btn.addEventListener('click', (e) => {
            fireConfetti();
        });
    }

    // 3. Scroll To Top Button Logic
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // 4. Calculator Logic
    const packageSelect = document.getElementById('package-select');
    const extraKidsInput = document.getElementById('extra-kids');
    const addons = document.querySelectorAll('.calc-addon');
    const totalDisplay = document.getElementById('calc-total');

    function calculateTotal() {
        let total = 0;

        // 1. Base Package Price
        if(packageSelect) {
            total += parseInt(packageSelect.value);
        }

        // 2. Extra Kids
        if(extraKidsInput) {
            const kidsCount = Math.max(0, parseInt(extraKidsInput.value) || 0); // basic sanity check
            total += kidsCount * 10;
        }

        // 3. Checkbox Addons
        addons.forEach(addon => {
            if(addon.checked) {
                total += parseInt(addon.value);
            }
        });

        // Update Display with Animation
        if(totalDisplay) {
            animateValue(totalDisplay, parseInt(totalDisplay.innerText), total, 500);
        }
    }

    // Attach listeners
    if(packageSelect) packageSelect.addEventListener('change', calculateTotal);
    if(extraKidsInput) extraKidsInput.addEventListener('input', calculateTotal);
    addons.forEach(addon => addon.addEventListener('change', calculateTotal));

    // Number animation function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // 5. Cookie Consent Logic 🍪
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    // Check if user has already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        // Wait a bit before showing to not be annoying immediately
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if(acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // Save preference
            localStorage.setItem('cookiesAccepted', 'true');
            // Hide banner
            cookieBanner.classList.remove('show');
        });
    }

    // 6. Scroll Reveal Animation Logic ✨
    // Removed .package-card from animation list as requested
    const revealElements = document.querySelectorAll("section, h2, .service-item, .testimonial-card, .gallery-item");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

});
