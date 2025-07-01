// Global state
let currentTab = 'overview';
let typingComplete = false;

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    startTypingAnimation();
    startClock();
    animateStats();
    setupTabNavigation();
    updateLastUpdated();
}

// Typing animation
function startTypingAnimation() {
    const fullText = "ramokhele.manyeli@dev:~$ whoami";
    const typedTextElement = document.getElementById('typed-text');
    let i = 0;

    function typeCharacter() {
        if (i < fullText.length) {
            typedTextElement.textContent = fullText.slice(0, i + 1);
            i++;
            setTimeout(typeCharacter, 100);
        } else {
            typingComplete = true;
        }
    }

    typeCharacter();
}

// Real-time clock
function startClock() {
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('current-time').textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// Animated counters
function animateStats() {
    const targets = {
        'lines-of-code': 15420,
        'projects-completed': 12,
        'coffee-consumed': 847,
        'hours-coding': 2340
    };

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    // Wait for typing animation to complete
    setTimeout(() => {
        Object.keys(targets).forEach(id => {
            animateCounter(id, targets[id], duration, steps);
        });
    }, 1000);
}

function animateCounter(elementId, target, duration, steps) {
    const element = document.getElementById(elementId);
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current = Math.floor(increment * step);
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = current.toLocaleString();
    }, duration / steps);
}

// Tab navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    currentTab = tabName;

    // Trigger animations for specific tabs
    if (tabName === 'skills') {
        animateSkillBars();
    } else if (tabName === 'analytics') {
        animateAnalytics();
    }
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Analytics animations
function animateAnalytics() {
    const commitBars = document.querySelectorAll('.commit-progress');
    const languageBars = document.querySelectorAll('.language-progress');
    
    // Animate commit frequency bars
    commitBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 100);
    });

    // Animate language distribution bars
    languageBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, (commitBars.length * 100) + (index * 150));
    });
}

// Update last updated date
function updateLastUpdated() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    document.getElementById('last-updated').textContent = dateString;
}

// Smooth scrolling for any internal links (if added later)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stat-card, .project-card, .skill-card, .analytics-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add click handlers for download buttons
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText.includes('CV')) {
                // Handle CV download
                console.log('Downloading CV...');
                // You would implement actual download logic here
            } else if (buttonText.includes('PORTFOLIO')) {
                // Handle portfolio view
                console.log('Viewing portfolio...');
                // You would implement portfolio view logic here
            }
        });
    });
});

// Add click handlers for project action buttons
document.addEventListener('DOMContentLoaded', function() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('.project-name').textContent;
            
            if (buttonText.includes('CODE')) {
                console.log(`Opening code for ${projectName}...`);
                // You  {
                console.log(`Opening code for ${projectName}...`);
                // You would implement actual GitHub link opening here
                // window.open('https://github.com/ramokhele/project-name', '_blank');
            } else if (buttonText.includes('DEPLOY')) {
                console.log(`Opening deployment for ${projectName}...`);
                // You would implement actual deployment link opening here
                // window.open('https://project-demo-url.com', '_blank');
            }
        });
    });
});

// Add click handlers for contact methods
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodTitle = this.querySelector('.method-title').textContent;
            const methodValue = this.querySelector('.method-value').textContent;
            
            if (methodTitle.includes('EMAIL')) {
                window.location.href = `mailto:${methodValue}`;
            } else if (methodTitle.includes('GITHUB')) {
                window.open(`https://${methodValue}`, '_blank');
            } else if (methodTitle.includes('LINKEDIN')) {
                window.open(`https://${methodValue}`, '_blank');
            }
        });
        
        // Add hover effect
        method.style.cursor = 'pointer';
    });
});

// Responsive navigation for mobile (if you want to add a hamburger menu later)
function toggleMobileMenu() {
    // Implementation for mobile menu toggle
    console.log('Mobile menu toggled');
}

// Performance optimization: Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.addEventListener('DOMContentLoaded', function() {
        const animateElements = document.querySelectorAll('.stat-card, .project-card, .skill-card');
        animateElements.forEach(el => observer.observe(el));
    });
}

// Add CSS class for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Theme switching based on time
function setThemeByTime() {
    const hour = new Date().getHours();
    const isDark = (hour >= 18 || hour < 6);
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
}

// Run on load and every hour
document.addEventListener('DOMContentLoaded', () => {
    setThemeByTime();
    setInterval(setThemeByTime, 60 * 60 * 1000); // update every hour
});

// Console welcome message
console.log(`
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

Welcome to Ramokhele Manyeli's Portfolio
System Status: ONLINE
Version: 2.1.0
`);