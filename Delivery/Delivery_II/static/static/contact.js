// contact.js - Add this before closing </body>
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-4';
        alert.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            Your message has been sent successfully!
        `;
        form.parentNode.insertBefore(alert, form.nextSibling);

        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    });

    // Add Bootstrap validation styles
    Array.prototype.slice.call(document.querySelectorAll('.form-control'))
        .forEach(function(input) {
            input.addEventListener('input', function() {
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                }
            });
        });
});