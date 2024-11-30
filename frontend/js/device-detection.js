// device-detection.js

// Function to detect device type and update background image
function updateBackground() {
    const background = document.querySelector('.background');
    const width = window.innerWidth;

    if (width <= 768) {
        // Mobile background
        background.style.backgroundImage = "url('assets/mobile-bg.jpg')";
    } else if (width > 768 && width <= 1024) {
        // Tablet background
        background.style.backgroundImage = "url('assets/tablet-bg.jpg')";
    } else {
        // Desktop background
        background.style.backgroundImage = "url('assets/desktop-bg.jpg')";
    }
}

// Run the function on page load
window.onload = updateBackground;

// Update background on window resize
window.onresize = updateBackground;
