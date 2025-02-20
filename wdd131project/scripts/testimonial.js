document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    nextBtn.addEventListener("click", nextTestimonial);
    prevBtn.addEventListener("click", prevTestimonial);
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Auto-slide testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    showTestimonial(currentIndex);
});
