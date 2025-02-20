/**
 * Contact Form JavaScript
 * - Handles form submission
 * - Validates input
 * - Shows success/error messages
 * - Manages FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Please fill out all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in a real application, this would be an AJAX request)
            showFormMessage('Sending your message...', '');
            
            // Simulate network delay
            setTimeout(function() {
                // Form submission success
                contactForm.reset();
                showFormMessage('Your message has been sent successfully! We\'ll get back to you soon.', 'success');
            }, 1500);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Display form status message
    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = type;
    }
    
    // FAQ Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accordionItem => {
                accordionItem.classList.remove('active');
                const accordionContent = accordionItem.querySelector('.accordion-content');
                accordionContent.style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});