// Previne flash de conteúdo não estilizado
document.body.classList.add('loading');

// Animação de fade-in ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const heroContainer = document.querySelector('.hero-container');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Remove classe de loading
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 50);
    
    // Fade-in suave do conteúdo da hero
    if (heroContainer) {
        heroContainer.style.opacity = '0';
        heroContainer.style.transform = 'translateY(30px)';
        heroContainer.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            heroContainer.style.opacity = '1';
            heroContainer.style.transform = 'translateY(0)';
        }, 150);
    }
    
    // Fade-in das setas com delay
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'opacity 1.2s ease-in';
        
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
        }, 1000);
    }
});

// Smooth scroll ao clicar no botão de orçamento (preparação para seções futuras)
const btnOrcamento = document.querySelector('.btn-orcamento');
if (btnOrcamento) {
    btnOrcamento.addEventListener('click', (e) => {
        e.preventDefault();
        const calculatorSection = document.querySelector('#calculator');
        if (calculatorSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = calculatorSection.offsetTop - headerHeight - 4; // 20px extra de respiro
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Adiciona pequena interação ao scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adiciona sombra ao header quando houver scroll
    if (currentScroll > 10) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });