// Configurações Globais
const CONFIG = {
    relationshipStartDate: '2025-01-01', // Formato: YYYY-MM-DD
    coupleNames: {
        first: 'Nome',
        second: 'Nome'
    },
    recipientName: 'Nome',
    senderName: 'Nome',
    enableParallaxEffect: true,
    enableFloatingHearts: true,
    enableMicroAnimations: true
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o preloader
    initPreloader();
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    // Inicializar o contador de tempo juntos
    initTimeCounter();
    
    // Inicializar efeito parallax
    if (CONFIG.enableParallaxEffect) {
        initParallaxEffect();
    }
    
    // Inicializar corações flutuantes
    if (CONFIG.enableFloatingHearts) {
        initFloatingHearts();
    }
    
    // Inicializar microanimações
    if (CONFIG.enableMicroAnimations) {
        initMicroAnimations();
    }
    
    // Personalizar nomes e datas
    customizeContent();
});

// Função para inicializar o preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const mainContainer = document.querySelector('.main-container');
    
    // Simular tempo de carregamento (pode ser removido em produção)
    setTimeout(() => {
        preloader.classList.add('hidden');
        mainContainer.classList.add('loaded');
        
        // Remover completamente o preloader após a animação
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
}

// Função para inicializar o contador de tempo juntos
function initTimeCounter() {
    const startDate = new Date(CONFIG.relationshipStartDate);
    
    function updateCounter() {
        const now = new Date();
        const difference = now - startDate;
        
        // Cálculo de tempo
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30);
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30) % 12);
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        
        // Atualização dos elementos
        document.getElementById('seconds').textContent = seconds;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('hours').textContent = hours;
        document.getElementById('days').textContent = days;
        document.getElementById('months').textContent = months;
        document.getElementById('years').textContent = years;
        
        // Adicionar efeito de pulso ao mudar os segundos
        const secondsElement = document.getElementById('seconds');
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 500);
    }
    
    // Atualizar a cada segundo
    setInterval(updateCounter, 1000);
    updateCounter(); // Chamada inicial
}

// Função para inicializar o efeito parallax
function initParallaxEffect() {
    const parallaxContainer = document.querySelector('.parallax-container');
    if (!parallaxContainer) return;
    
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 20;
            const offsetX = (x - 0.5) * speed;
            const offsetY = (y - 0.5) * speed;
            
            layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${4 - index})`;
        });
    });
    
    // Efeito parallax no scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.2;
            const yOffset = scrollPosition * speed;
            
            layer.style.transform = `translateY(${yOffset}px) scale(${4 - index})`;
        });
    });
}

// Função para inicializar corações flutuantes
function initFloatingHearts() {
    const container = document.querySelector('.animated-background');
    if (!container) return;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Posição aleatória
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 20 + 100 + 'vh';
        
        // Tamanho aleatório
        const size = Math.random() * 20 + 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Opacidade aleatória
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Velocidade aleatória
        heart.style.animationDuration = Math.random() * 15 + 10 + 's';
        
        // Atraso aleatório
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
        
        // Remover após a animação
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }
    
    // Criar 20 corações iniciais
    for (let i = 0; i < 20; i++) {
        createHeart();
    }
    
    // Adicionar novos corações periodicamente
    setInterval(createHeart, 3000);
    
    // Adicionar estilos CSS para os corações flutuantes
    const style = document.createElement('style');
    style.innerHTML = `
        .floating-heart {
            position: absolute;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d23669'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            pointer-events: none;
            z-index: 1;
            animation: floatUpHeart linear forwards;
        }
        
        @keyframes floatUpHeart {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
            }
            25% {
                transform: translateY(-25vh) rotate(90deg) scale(1.1);
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(1);
            }
            75% {
                transform: translateY(-75vh) rotate(270deg) scale(0.9);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para inicializar microanimações
function initMicroAnimations() {
    // Efeito hover nos itens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-image').style.transform = 'scale(1.05)';
            this.querySelector('.image-overlay').style.opacity = '1';
            this.querySelector('.overlay-content').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-image').style.transform = 'scale(1)';
            this.querySelector('.image-overlay').style.opacity = '0';
            this.querySelector('.overlay-content').style.transform = 'translateY(20px)';
        });
    });
    
    // Efeito de digitação na carta de amor
    const letterText = document.querySelector('.letter-text');
    if (letterText) {
        const originalText = letterText.innerHTML;
        letterText.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                letterText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Iniciar efeito quando a seção estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.love-letter-section'));
    }
    
    // Efeito de brilho nos contadores
    const counterValues = document.querySelectorAll('.counter-value');
    counterValues.forEach(value => {
        value.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        value.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Adicionar classe para animação de pulso
    const style = document.createElement('style');
    style.innerHTML = `
        .pulse {
            animation: pulse-animation 0.5s ease-out;
        }
        
        @keyframes pulse-animation {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para personalizar o conteúdo com base nas configurações
function customizeContent() {
    // Atualizar nomes do casal
    document.querySelector('.name-first').textContent = CONFIG.coupleNames.first;
    document.querySelector('.name-second').textContent = CONFIG.coupleNames.second;
    
    // Atualizar data de relacionamento
    const formattedDate = formatDate(CONFIG.relationshipStartDate);
    document.querySelector('.relationship-date').textContent = formattedDate;
    
    // Atualizar nome do destinatário no rodapé
    document.querySelector('.recipient-name').textContent = CONFIG.recipientName;
    
    // Atualizar assinatura
    const signatureElement = document.querySelector('.signature');
    if (signatureElement) {
        signatureElement.textContent = `Com todo meu amor, ${CONFIG.senderName}`;
    }
    
    // Atualizar assinatura na carta
    const letterText = document.querySelector('.letter-text');
    if (letterText) {
        const letterContent = letterText.innerHTML;
        const updatedContent = letterContent
            .replace('[Nome]', CONFIG.recipientName)
            .replace('Querida [Nome]', `Querida ${CONFIG.recipientName}`)
            .replace('[Nome]', CONFIG.senderName);
        letterText.innerHTML = updatedContent;
    }
}

// Função auxiliar para formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// Função para detectar quando elementos entram na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

// Adicionar evento de scroll para animações
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);
window.addEventListener('load', animateOnScroll);
