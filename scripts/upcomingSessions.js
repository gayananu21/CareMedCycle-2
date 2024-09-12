document.addEventListener('DOMContentLoaded', () => {
    // Select all session cards
    const sessionCards = document.querySelectorAll('.session-card');

    // Add click event to each session card to toggle session details
    sessionCards.forEach(card => {
        card.addEventListener('click', function() {
            // First remove 'active' class from all cards
            sessionCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active'); // Collapse all other session details
                }
            });

            // Toggle 'active' class on the clicked session card
            card.classList.toggle('active');
        });
    });
});
