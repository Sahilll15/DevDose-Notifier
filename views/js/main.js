// Main JavaScript functionality for Learning Notifier

class LearningNotifier {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupRegistrationForm();
        this.setupApiDocs();
    }

    // Navigation functionality
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle (if needed)
        this.setupMobileMenu();
    }

    setupMobileMenu() {
        // Add mobile menu functionality if needed
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }

    // Scroll effects
    setupScrollEffects() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animation setup
    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all feature cards and stat items
        document.querySelectorAll('.feature-card, .stat-item, .api-endpoint').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Registration form functionality
    setupRegistrationForm() {
        const registrationForm = document.getElementById('registrationForm');
        if (!registrationForm) return;

        const isAdminCheckbox = document.getElementById('isAdmin');
        const adminCodeGroup = document.getElementById('adminCodeGroup');
        const adminCodeInput = document.getElementById('adminCode');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        const loading = document.getElementById('loading');
        const registerBtn = document.getElementById('registerBtn');

        // Toggle admin code field
        if (isAdminCheckbox && adminCodeGroup) {
            isAdminCheckbox.addEventListener('change', function () {
                if (this.checked) {
                    adminCodeGroup.style.display = 'block';
                    if (adminCodeInput) adminCodeInput.required = true;
                } else {
                    adminCodeGroup.style.display = 'none';
                    if (adminCodeInput) {
                        adminCodeInput.required = false;
                        adminCodeInput.value = '';
                    }
                }
            });
        }

        // Form submission
        registrationForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Hide previous messages
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';

            // Show loading state
            if (loading) loading.style.display = 'block';
            if (registerBtn) {
                registerBtn.disabled = true;
                registerBtn.innerHTML = '<span>⏳</span> Registering...';
            }

            try {
                // Prepare form data
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    type: document.getElementById('type').value,
                    isAdmin: isAdminCheckbox ? isAdminCheckbox.checked : false
                };

                // Add admin code if admin is selected
                if (formData.isAdmin && adminCodeInput) {
                    formData.adminCode = adminCodeInput.value.trim();
                }

                // Make API request
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Success
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    registrationForm.reset();
                    if (adminCodeGroup) adminCodeGroup.style.display = 'none';
                    if (adminCodeInput) adminCodeInput.required = false;
                } else {
                    // Error
                    if (errorText) {
                        errorText.textContent = result.message || 'Registration failed. Please try again.';
                    }
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            } catch (error) {
                console.error('Registration error:', error);
                if (errorText) {
                    errorText.textContent = 'Network error. Please check your connection and try again.';
                }
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } finally {
                // Hide loading state
                if (loading) loading.style.display = 'none';
                if (registerBtn) {
                    registerBtn.disabled = false;
                    registerBtn.innerHTML = '<span>🚀</span> Register for Daily Learning';
                }
            }
        });

        // Form validation
        const inputs = registrationForm.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (!this.value.trim()) {
                    this.style.borderColor = 'var(--error)';
                } else {
                    this.style.borderColor = 'var(--border)';
                }
            });

            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--border)';
                }
            });
        });
    }

    // API Documentation functionality
    setupApiDocs() {
        // Copy code functionality
        document.querySelectorAll('.copy-code').forEach(button => {
            button.addEventListener('click', function () {
                const codeBlock = this.parentElement.querySelector('code');
                if (codeBlock) {
                    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                        this.textContent = 'Copied!';
                        setTimeout(() => {
                            this.textContent = 'Copy';
                        }, 2000);
                    });
                }
            });
        });

        // API endpoint testing
        this.setupApiTesting();
    }

    setupApiTesting() {
        // Add API testing functionality if needed
        const testButtons = document.querySelectorAll('.test-api');
        testButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const endpoint = this.dataset.endpoint;
                const method = this.dataset.method;

                try {
                    const response = await fetch(endpoint, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    const result = await response.json();
                    console.log('API Response:', result);

                    // Show result in a modal or alert
                    alert(`API Response: ${JSON.stringify(result, null, 2)}`);
                } catch (error) {
                    console.error('API Test Error:', error);
                    alert('API Test Failed: ' + error.message);
                }
            });
        });
    }

    // Utility methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // GitHub integration
    openGitHub() {
        window.open('https://github.com/yourusername/learning-notifier', '_blank');
    }

    // Social sharing
    shareOnTwitter() {
        const text = 'Check out Learning Notifier - Daily AI-powered learning topics for developers!';
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    }

    shareOnLinkedIn() {
        const url = window.location.href;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LearningNotifier();
});

// Export for use in other scripts
window.LearningNotifier = LearningNotifier;
