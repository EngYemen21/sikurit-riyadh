// Main JavaScript file for Securit Glass Website
// Enhanced with modern interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initGalleryGrid();
    initFAQAccordion();
    initContactForm();
    initScrollToTop();
    initWhatsapp();
    initLazyLoading();
    initPerformanceOptimizations();
    initCounterAnimations();
    initParallaxEffects();
    
});

function initGalleryGrid(){
      const galleryGrid = document.getElementById('galleryGrid');
     if(galleryGrid){
    const galleryImages = [
      './assets/images/1.jpg','assets/images/2.jpg','assets/images/3.jpg','assets/images/4.jpg',
      'assets/images/5.jpg','assets/images/6.jpg','assets/images/7.jpg','assets/images/8.jpg',
    ];
    galleryImages.forEach(src => {
      const div = document.createElement('div');
      div.className = 'overflow-hidden rounded-xl shadow hover:shadow-xl transition';
      div.innerHTML = `<img src="${src}" alt="عمل من أعمالنا" class="w-full h-64 object-cover hover:scale-105 transition duration-500" />`;
      galleryGrid.appendChild(div);
    });
  }
}
// Mobile Menu Toggle with Enhanced Animation
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Toggle menu
    mobileMenuBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // منع فقاعات الحدث
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';

            requestAnimationFrame(() => {
                mobileMenu.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                mobileMenu.style.opacity = '1';
            });

            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        } else {
            mobileMenu.style.transition = 'max-height 0.3s ease-in, opacity 0.3s ease-in';
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';

            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);

            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    });

    // منع إغلاق القائمة عند النقر داخلها
    mobileMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function() {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.style.transition = 'max-height 0.3s ease-in, opacity 0.3s ease-in';
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);

            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.transition = 'max-height 0.3s ease-in, opacity 0.3s ease-in';
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);

                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            }
        });
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Track scroll event
                trackEvent('smooth_scroll', {
                    target_section: href
                });
            }
        });
    });
}

// Advanced Scroll Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stagger-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-fade-in');
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll, section, .card, .service-item, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (parallaxElements.length > 0) {
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleScroll);
    }
}

// Enhanced FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    
    // FAQ Question Toggle with smooth animation
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            const isOpen = !answer.classList.contains('hidden');
            
            if (isOpen) {
                // Close
                answer.style.maxHeight = answer.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                    answer.style.maxHeight = '0px';
                    answer.style.opacity = '0';
                });
                
                setTimeout(() => {
                    answer.classList.add('hidden');
                }, 300);
                
                icon.style.transform = 'rotate(0deg)';
                faqItem.classList.remove('bg-blue-50');
            } else {
                // Close other open FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        const otherItem = otherQuestion.closest('.faq-item');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherQuestion.querySelector('.faq-icon');
                        
                        if (!otherAnswer.classList.contains('hidden')) {
                            otherAnswer.style.maxHeight = '0px';
                            otherAnswer.style.opacity = '0';
                            setTimeout(() => otherAnswer.classList.add('hidden'), 300);
                            otherIcon.style.transform = 'rotate(0deg)';
                            otherItem.classList.remove('bg-blue-50');
                        }
                    }
                });
                
                // Open current
                answer.classList.remove('hidden');
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                });
                
                icon.style.transform = 'rotate(180deg)';
                faqItem.classList.add('bg-blue-50');
            }
            
            // Track FAQ interaction
            trackEvent('faq_toggle', {
                question: this.textContent.trim()
            });
        });
    });
    
    // FAQ Category Filter with animation
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter FAQ sections with animation
            const faqSections = document.querySelectorAll('.faq-section');
            
            faqSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.classList.remove('hidden');
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        section.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    });
                } else {
                    section.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        section.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Track category filter
            trackEvent('faq_filter', {
                category: category
            });
        });
    });
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        // Real-time validation with visual feedback
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                
                // Real-time validation for certain fields
                if (this.type === 'email' || this.type === 'tel') {
                    debounce(() => validateField(this), 500)();
                }
            });
            
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('field-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('field-focused');
            });
        });
        
        // Form submission with enhanced UX
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                handleFormSubmission(this, data);
            } else {
                showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
                
                // Focus on first error field
                const firstError = this.querySelector('.border-red-500');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

// Enhanced Form Validation
function validateContactForm(data) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = ['name', 'phone', 'service', 'message'];
    
    requiredFields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'هذا الحقل مطلوب');
            isValid = false;
        }
    });
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        const phoneInput = document.querySelector('[name="phone"]');
        showFieldError(phoneInput, 'رقم الهاتف غير صحيح (مثال: 0501234567)');
        isValid = false;
    }
    
    // Email validation (if provided)
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.querySelector('[name="email"]');
        showFieldError(emailInput, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }
    
    // Name validation
    if (data.name && data.name.trim().length < 2) {
        const nameInput = document.querySelector('[name="name"]');
        showFieldError(nameInput, 'الاسم يجب أن يكون أكثر من حرفين');
        isValid = false;
    }
    
    // Message validation
    if (data.message && data.message.trim().length < 10) {
        const messageInput = document.querySelector('[name="message"]');
        showFieldError(messageInput, 'الرسالة يجب أن تكون أكثر من 10 أحرف');
        isValid = false;
    }
    
    // Privacy agreement
    if (!data.privacy) {
        const privacyInput = document.querySelector('[name="privacy"]');
        showFieldError(privacyInput, 'يجب الموافقة على سياسة الخصوصية');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    
    clearFieldError(field);
    
    if (field.required && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    if (name === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'رقم الهاتف غير صحيح (مثال: 0501234567)');
        return false;
    }
    
    if (name === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'البريد الإلكتروني غير صحيح');
        return false;
    }
    
    if (name === 'name' && value && value.length < 2) {
        showFieldError(field, 'الاسم يجب أن يكون أكثر من حرفين');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    field.classList.remove('border-gray-300', 'focus:ring-primary', 'focus:border-primary');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message with animation
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1 opacity-0 transform translate-y-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    
    // Animate in
    requestAnimationFrame(() => {
        errorDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        errorDiv.classList.remove('opacity-0', 'translate-y-1');
    });
}

function clearFieldError(field) {
    field.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    field.classList.add('border-gray-300', 'focus:ring-primary', 'focus:border-primary');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
        errorMessage.classList.add('opacity-0', 'translate-y-1');
        setTimeout(() => errorMessage.remove(), 300);
    }
}

function handleFormSubmission(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        جاري الإرسال...
    `;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
        form.reset();
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Track form submission
        trackEvent('form_submit', {
            form_type: 'contact',
            service_type: data.service
        });
    }, 2000);
}

// Validation helper functions
function isValidPhone(phone) {
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-all duration-300`;
    
    // Set notification style based on type
    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${styles[type] || styles.info}`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-1">${message}</div>
            <button class="ml-4 text-white hover:text-gray-200 transition-colors" onclick="this.parentNode.parentNode.remove()">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform translate-y-16 opacity-0 z-40';
    scrollBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        trackEvent('scroll_to_top');
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    const handleScroll = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.transform = 'translateY(0)';
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.transform = 'translateY(16px)';
            scrollBtn.style.opacity = '0';
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
}

// Whatsapp  Button
function initWhatsapp() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'fixed bottom-36  right-6 bg-white text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform translate-y-16  z-60';
    scrollBtn.innerHTML = `
     <a href="https://wa.me/966558107645" class="text-secondary font-bold text-lg hover:underline">
       <svg class="w-7 h-7" fill="#12ba1e" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#12ba1e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g></svg>
                                </a>
    `;
    

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        trackEvent('scroll_to_top');
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    // const handleScroll = throttle(() => {
    //     if (window.pageYOffset > 300) {
    //         scrollBtn.style.transform = 'translateY(0)';
    //         scrollBtn.style.opacity = '1';
    //     } else {
    //         scrollBtn.style.transform = 'translateY(16px)';
    //         scrollBtn.style.opacity = '0';
    //     }
    // }, 100);
    
    // window.addEventListener('scroll', handleScroll);
}


// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            imageObserver.observe(img);
        });
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
   
    

  
    
    // Optimize scroll events
    let ticking = false;
    const scrollEvents = [];
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                scrollEvents.forEach(callback => callback());
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics and Tracking
function trackEvent(eventName, eventData = {}) {
    
    // Google Analytics integration
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel integration
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Track page interactions
document.addEventListener('click', function(e) {
    // Track phone clicks
    if (e.target.matches('a[href^="tel:"]') || e.target.closest('a[href^="tel:"]')) {
        const link = e.target.matches('a[href^="tel:"]') ? e.target : e.target.closest('a[href^="tel:"]');
        trackEvent('phone_click', {
            phone_number: link.href.replace('tel:', '')
        });
    }
    
    // Track email clicks
    if (e.target.matches('a[href^="mailto:"]') || e.target.closest('a[href^="mailto:"]')) {
        const link = e.target.matches('a[href^="mailto:"]') ? e.target : e.target.closest('a[href^="mailto:"]');
        trackEvent('email_click', {
            email: link.href.replace('mailto:', '')
        });
    }
    
    // Track CTA button clicks
    if (e.target.matches('.cta-button') || e.target.closest('.cta-button')) {
        const button = e.target.matches('.cta-button') ? e.target : e.target.closest('.cta-button');
        trackEvent('cta_click', {
            button_text: button.textContent.trim(),
            button_location: button.closest('section')?.id || 'unknown'
        });
    }
});

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
});

// Add CSS animations and styles
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .field-focused {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }
    
    .gradient-text {
        background: linear-gradient(135deg, #1e40af, #059669);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .glass-effect {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .stagger-animation {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(style);

// Export functions for global use
window.SecuritGlass = {
    showNotification,
    trackEvent,
    validateField,
    debounce,
    throttle
};
