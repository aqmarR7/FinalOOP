document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const reviewForm = document.getElementById('reviewForm');
    const successMessage = document.getElementById('successMessage');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const ratingValue = star.getAttribute('data-value');
            ratingInput.value = ratingValue; // Set the hidden input value
            updateStarDisplay(ratingValue);
        });
    });

    function updateStarDisplay(ratingValue) {
        stars.forEach(star => {
            star.classList.remove('selected');
            if (star.getAttribute('data-value') <= ratingValue) {
                star.classList.add('selected');
            }
        });
    }

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log(' Form submitted:', reviewForm);
        successMessage.style.display = 'block'; // Show success message
    });
});



