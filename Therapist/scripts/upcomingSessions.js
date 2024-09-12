document.addEventListener('DOMContentLoaded', () => {
    // Select all session cards
    const sessionCards = document.querySelectorAll('.session-card');

    // Add click event to each session card to toggle session details
    sessionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove 'expanded' class from all session cards except the clicked one
            sessionCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded'); // Collapse all other session details
                }
            });

            // Toggle 'expanded' class on the clicked session card
            card.classList.toggle('expanded');
        });
    });

    // Redirect to the editSession page when the edit icon is clicked
    const editIcons = document.querySelectorAll('.edit-icon');
    editIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the session card from expanding
            const sessionId = icon.getAttribute('data-session');
            window.location.href = `editSession.html?session=${sessionId}`;
        });
    });
});
