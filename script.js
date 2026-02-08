// ============================================
// DONNÉES DES CITATIONS
// ============================================

const citations = [
    "Quand l'avancée est dure, seuls les durs avancent.",
    "La création est l'art de donner une forme à l'invisible et une voix au silence.",
    "Chaque obstacle est une opportunité déguisée en difficulté.",
    "La persévérance transforme l'impossible en possible.",
    "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
    "La créativité, c'est l'intelligence qui s'amuse.",
    "Les données sont le nouveau pétrole, mais raffinées, elles deviennent l'énergie de l'innovation.",
    "L'IA ne remplacera pas les humains, mais les humains qui utilisent l'IA remplaceront ceux qui ne le font pas.",
    "En data science, chaque problème est une opportunité d'apprentissage.",
    "Le machine learning, c'est apprendre à un ordinateur à apprendre par lui-même.",
    "La data visualisation, c'est l'art de raconter des histoires avec des chiffres.",
    "L'autodidaxie est le chemin de la liberté intellectuelle.",
    "Le scoutisme n'est pas seulement une activité, c'est une école de vie.",
    "L'entrepreneuriat, c'est transformer ses idées en réalité, pas seulement en rêves.",
    "La culture ivoirienne est un trésor à valoriser et à partager.",
    "Le design graphique, c'est communiquer sans mots.",
    "La technologie doit servir l'humain, pas l'inverse.",
    "L'apprentissage continu est la clé de l'évolution personnelle.",
    "La résilience se construit dans l'adversité.",
    "Chaque projet est une aventure humaine avant d'être technique."
];

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupEventListeners();
    checkResponsiveElements();
    
    // Initialiser le bouton de citations
    setupQuotesButton();
});

// ============================================
// GÉNÉRATEUR DE 3 CITATIONS
// ============================================

function setupQuotesButton() {
    const generateBtn = document.getElementById('generateQuotesBtn');
    const quotesContainer = document.getElementById('quotesContainer');
    
    if (!generateBtn || !quotesContainer) return;
    
    // État pour suivre si les citations sont affichées
    let isShowingQuotes = false;
    
    generateBtn.addEventListener('click', () => {
        if (isShowingQuotes) {
            // Cacher les citations
            quotesContainer.classList.remove('show');
            setTimeout(() => {
                quotesContainer.innerHTML = '';
                generateBtn.innerHTML = '<i class="fas fa-quote-right"></i> Voir 3 citations inspirantes';
                isShowingQuotes = false;
                generateBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
            }, 300);
        } else {
            // Générer et afficher 3 citations aléatoires
            const randomQuotes = getThreeRandomQuotes();
            displayQuotes(randomQuotes);
            quotesContainer.classList.add('show');
            generateBtn.innerHTML = '<i class="fas fa-times"></i> Cacher les citations';
            isShowingQuotes = true;
            generateBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
            
            // Animation du bouton
            generateBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                generateBtn.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

function getThreeRandomQuotes() {
    // Créer une copie du tableau de citations
    const availableQuotes = [...citations];
    const selectedQuotes = [];
    
    // Sélectionner 3 citations aléatoires sans doublons
    for (let i = 0; i < 3; i++) {
        if (availableQuotes.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        selectedQuotes.push(availableQuotes[randomIndex]);
        
        // Retirer la citation sélectionnée pour éviter les doublons
        availableQuotes.splice(randomIndex, 1);
    }
    
    return selectedQuotes;
}

function displayQuotes(quotes) {
    const quotesContainer = document.getElementById('quotesContainer');
    if (!quotesContainer) return;
    
    // Vider le conteneur
    quotesContainer.innerHTML = '';
    
    // Créer et ajouter chaque citation
    quotes.forEach((quote, index) => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.style.animationDelay = `${index * 0.1}s`;
        quoteCard.innerHTML = `
            <p><i class="fas fa-quote-left"></i> ${quote}</p>
        `;
        quotesContainer.appendChild(quoteCard);
    });
    
    // Animer l'apparition
    setTimeout(() => {
        document.querySelectorAll('.quote-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        });
    }, 100);
}

// ============================================
// ANIMATIONS RESPONSIVE
// ============================================

function initAnimations() {
    // Animation d'entrée pour les sections
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Ajouter des styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Animation pour la timeline */
        .timeline-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Animation pour les cartes */
        .passion-card, .experience-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .passion-card.visible, .experience-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Observer les éléments de la timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Observer les cartes de passions
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.passion-card, .experience-item').forEach(item => {
        cardObserver.observe(item);
    });
}

// ============================================
// GESTION DES ÉVÉNEMENTS
// ============================================

function setupEventListeners() {
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion du redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Gestion du scroll
    window.addEventListener('scroll', handleScroll);
}

// ============================================
// FONCTIONS RESPONSIVES
// ============================================

function checkResponsiveElements() {
    const screenWidth = window.innerWidth;
    
    // Ajuster la timeline pour les mobiles
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        if (screenWidth <= 480) {
            timeline.style.paddingLeft = '0';
        } else {
            timeline.style.paddingLeft = '';
        }
    }
    
    // Ajuster la grille des passions
    const passionsGrid = document.querySelector('.passions-grid');
    if (passionsGrid) {
        if (screenWidth <= 768) {
            passionsGrid.style.gap = '1.5rem';
        } else {
            passionsGrid.style.gap = '2rem';
        }
    }
}

function handleResize() {
    checkResponsiveElements();
    
    // Réinitialiser les animations si nécessaire
    document.querySelectorAll('.timeline-item, .passion-card').forEach(item => {
        item.classList.remove('visible');
    });
    
    // Réobserver les éléments
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach(item => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(item);
        });
    }, 100);
}

function handleScroll() {
    // Effet sur la navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.backdropFilter = 'none';
        }
    }
    
    // Animation progressive
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop - windowHeight + 100 && 
            scrollPosition < sectionTop + sectionHeight) {
            section.style.opacity = 1 - (scrollPosition - sectionTop) / (windowHeight * 2);
        }
    });
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Styles de base pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
    `;
    
    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Fermer automatiquement après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// ============================================
// FONCTIONNALITÉS MOBILES
// ============================================

function detectTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

// Ajouter des classes pour les appareils tactiles
if (detectTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Ajouter des styles pour améliorer l'expérience tactile
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .passion-card,
        .touch-device .experience-item {
            min-height: 44px;
            min-width: 44px;
        }
        
        .touch-device .hobby {
            padding: 0.75rem;
        }
        
        .touch-device .tag {
            padding: 0.5rem 1rem;
        }
        
        .touch-device #generateQuotesBtn {
            padding: 1rem 1.5rem;
        }
    `;
    document.head.appendChild(touchStyle);
}

// ============================================
// EXPORT DES FONCTIONS UTILES
// ============================================

// Exposer certaines fonctions globalement si nécessaire
window.App = {
    showNotification,
    checkResponsiveElements,
    handleResize,
    getThreeRandomQuotes,
    displayQuotes
};

// Message de bienvenue dans la console
console.log('%c🎨 Portfolio d\'Alexis KOUAKOU - Version Responsive', 'color: #2563eb; font-size: 14px; font-weight: bold;');
console.log('%c📱 Optimisé pour mobile, tablette et desktop', 'color: #8b5cf6; font-size: 12px;');
console.log('%c💡 Cliquez sur "Voir 3 citations inspirantes" pour découvrir des citations aléatoires!', 'color: #10b981; font-size: 12px;');
