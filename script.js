// ============================================
// INITIALISATION
// ============================================

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupEventListeners();
    checkResponsiveElements();
});

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
    handleResize
};

// Message de bienvenue dans la console
console.log('%c🎨 Portfolio d\'Alexis KOUAKOU - Version Responsive', 'color: #2563eb; font-size: 14px; font-weight: bold;');
console.log('%c📱 Optimisé pour mobile, tablette et desktop', 'color: #8b5cf6; font-size: 12px;');