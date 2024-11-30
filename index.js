// Detect device type and adjust the background
window.addEventListener("load", function() {
    let deviceType = "desktop"; // Default device type

    if (window.innerWidth <= 768) {
        deviceType = "mobile";
    } else if (window.innerWidth <= 1024) {
        deviceType = "tablet";
    }

    // Change background based on device type
    const body = document.querySelector('body');
    if (deviceType === "mobile") {
        body.style.backgroundImage = "url('mobile-background.jpg')";
    } else if (deviceType === "tablet") {
        body.style.backgroundImage = "url('tablet-background.jpg')";
    } else {
        body.style.backgroundImage = "url('desktop-background.jpg')";
    }
});

// Search flights
function searchFlights() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;

    fetch(`http://localhost:3000/flights/search?origin=${origin}&destination=${destination}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = ""; // Clear previous results

            if (data.length > 0) {
                data.forEach(flight => {
                    const flightDetails = `
                        <div class="flight">
                            <p>From: ${flight.origin}</p>
                            <p>To: ${flight.destination}</p>
                            <p>Date: ${flight.date}</p>
                            <p>Time: ${flight.time}</p>
                            <p>Price: $${flight.price}</p>
                            <button onclick="bookFlight(${flight.id})">Book Now</button>
                        </div>`;
                    resultsContainer.innerHTML += flightDetails;
                });
            } else {
                resultsContainer.innerHTML = "<p>No flights found.</p>";
            }
        })
        .catch(error => console.error("Error fetching flights:", error));
}

// Book flight
function bookFlight(flightId) {
    const user = "admin"; // Replace with the logged-in user name
    const passengers = 1; // Update as needed (or make dynamic)

    fetch("http://localhost:3000/bookings/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, flightId, passengers }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Booking successful") {
                alert("Flight booked successfully! Booking ID: " + data.bookingId);
            } else {
                alert("Failed to book flight. Please try again.");
            }
        })
        .catch(error => console.error("Error booking flight:", error));
}

// User login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                alert("Welcome, " + data.user.username + "!");
                // Redirect to dashboard or perform further actions
            } else {
                alert("Invalid credentials. Please try again.");
            }
        })
        .catch(error => console.error("Error during login:", error));
}
