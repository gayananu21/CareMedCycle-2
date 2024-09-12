// Get modal elements
const modal = document.getElementById("popup-modal");
const saveButton = document.getElementById("save-button");
const closeBtn = document.querySelector(".close-btn");

// Show the modal when the "Save" button is clicked
saveButton.addEventListener("click", function() {
    // Add form validation or any saving logic here

    // Show the modal
    modal.style.display = "flex";
});

// Close the modal when the "x" button is clicked
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
