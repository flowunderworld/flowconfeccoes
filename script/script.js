// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic form submission (can be expanded for actual backend integration)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Formulário enviado! Entraremos em contacto em breve.');
    this.reset(); // Clear the form
});

// Dynamic Top Strip and Logo on Scroll
window.addEventListener("scroll", function() {
    const topStrip = document.querySelector(".top-strip");
    const logo = document.querySelector(".top-strip .logo-initial");
    const scrollPosition = window.scrollY;

    const scrollThreshold = 50; // Posição de scroll para ativar a mudança

    if (scrollPosition > scrollThreshold) {
        topStrip.classList.add("scrolled");
        // O filtro de cor do logo é alterado via CSS com a classe .scrolled
    } else {
        topStrip.classList.remove("scrolled");
    }
});

