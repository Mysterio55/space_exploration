// Show Big Bang Effect on Load
window.onload = () => {
    const bigBang = document.getElementById("big-bang");
    const mainContent = document.getElementById("main-content");

    gsap.to(bigBang, { duration: 3, opacity: 1, ease: "power2.inOut" });
    gsap.to(bigBang.querySelector('.explosion'), { duration: 4, scale: 5, ease: "power2.inOut" });

    setTimeout(() => {
        gsap.to(bigBang, { duration: 1.15, opacity: 0, display: 'none', ease: "power2.inOut" });
        mainContent.classList.remove("hidden");
        gsap.from(mainContent, { duration: 1, opacity: 0 });
    }, 1000);
};

// Tooltip functionality
const tooltip = document.getElementById('tooltip');
const events = document.querySelectorAll('.event-content');

events.forEach(event => {
    event.addEventListener('mouseover', (e) => {
        tooltip.innerHTML = e.currentTarget.querySelector('p').innerText;
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    event.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    event.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});

// Generate Stars in Background
function createStars() {
    const starContainer = document.createElement('div');
    starContainer.className = 'stars';
    document.body.appendChild(starContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1; // Size between 1 and 4
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = Math.random() * 1 + 0.5 + 's'; // Random animation duration
        starContainer.appendChild(star);
    }
}
createStars();
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Left box animation
    gsap.to(".left-box", {
        x: 0,     // Moves from -100% to original position
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".container",
            start: "top 80%", // Animation starts when container reaches 80% of viewport
            toggleActions: "play none none none",
        }
    });

    // Right box animation
    gsap.to(".right-box", {
        x: 0,     // Moves from 100% to original position
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".container",
            start: "top 80%", // Animation starts when container reaches 80% of viewport
            toggleActions: "play none none none",
        }
    });
});


// Pop-up Messages
const messages = [
    "The Big Bang (13.8 billion years ago): The universe bursts into existence, creating time, space, and all matter in a colossal explosion.",
    "Dawn of Stars and Galaxies (13.5 billion years ago): Gas clouds collapse to form the first stars, lighting up the cosmos and creating galaxies.",
    "Birth of the Solar System (4.6 billion years ago): Our Sun forms, surrounded by a swirling disk that births planets, including Earth.",
    "Emergence of Life (3.5 billion years ago): Life begins in Earth's oceans with simple microbes, setting the stage for evolution.",
    "Age of Human Exploration (1960s - Present): The 20th century sees humanity's first steps into space, from Sputnik to moon landings.",
    "Quest for Life Beyond Earth (2000s - Present): We send rovers to Mars and use telescopes to explore the universe, seeking signs of life."
];

let currentPopup;
let popupIndex = 0; // Initialize the index to track the current popup

// Function to create pop-up
function createPopup(text, position) {
    // Remove the previous popup if it exists
    if (currentPopup) {
        breakAndFade(currentPopup); // Call breakAndFade on the existing popup
    }

    currentPopup = document.createElement('div');
    currentPopup.className = 'popup';
    currentPopup.innerText = text;
    currentPopup.style.position = 'absolute';
    currentPopup.style.top = position.top + 'px';
    currentPopup.style.left = position.left + 'px';
    document.getElementById('vid').appendChild(currentPopup);

    // Fade in the current popup
    setTimeout(() => {
        currentPopup.style.opacity = '1'; // Show the new popup
    }, 20); // Short delay to ensure opacity transition
}

// Function to randomly position pop-ups
function randomizePopups() {
    const positions = [
        { top: 100, left: 100 },
        { top: 490, left: 1150 },
        { top: 490, left: 100 },
        { top: 100, left: 1150 },
        { top: 250, left: 100 },
        { top: 250, left: 1150 },
    ];

    // Change popup every 3 seconds
    setInterval(() => {
        createPopup(messages[popupIndex], positions[popupIndex]);
        popupIndex = (popupIndex + 1) % messages.length; // Cycle through messages
    }, 4200);
}

// Function to break and fade the popup into pieces
function breakAndFade(popup) {
    const numPieces = 50; // Number of pieces to create
    const pieces = [];
    const popupRect = popup.getBoundingClientRect(); // Get the position of the popup

    // Create pieces
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'popup-piece';
        piece.style.position = 'absolute';
        piece.style.background = 'rgba(60, 30, 0, 1)';
        piece.style.width = '20px'; // Adjust size as needed
        piece.style.height = '20px'; // Adjust size as needed
        piece.style.opacity = '1';
        piece.style.pointerEvents = 'none'; // Prevent mouse interactions
        document.getElementById('vid').appendChild(piece);
        pieces.push(piece);
    }

    // Position pieces at the center of the popup
    const centerX = popupRect.left + popupRect.width / 2;
    const centerY = popupRect.top + popupRect.height / 2;

    pieces.forEach(piece => {
        piece.style.left = `${centerX}px`;
        piece.style.top = `${centerY}px`;
    });

    // Animate pieces to random locations
    pieces.forEach(piece => {
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        gsap.to(piece, {
            duration: 2,
            left: `${endX}px`,
            top: `${endY}px`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5, // Random scale for variation
            ease: "power2.out",
            onComplete: () => {
                piece.remove(); // Remove piece after animation
            }
        });
    });

    // Fade out original popup
    gsap.to(popup, {
        duration: 0.9,
        opacity: 0,
        scale: 0.1,
        onComplete: () => {
            popup.remove(); // Remove original popup after fading out
        }
    });
}

// Start the popups
randomizePopups();

// Scroll Event to Restart Pop-ups
const videoSection = document.getElementById('vid');

window.addEventListener('scroll', () => {
    const videoRect = videoSection.getBoundingClientRect();

    // Check if the video is in the viewport
    if (videoRect.top < window.innerHeight && videoRect.bottom > 0) {
        // Reset the pop-up index and remove current popup
        popupIndex = 0;
        if (currentPopup) {
            breakAndFade(currentPopup); // Call breakAndFade on the existing popup
        }
    }
});
// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Get the width of each section
const sectionWidth = document.querySelector(".horizontal-section").offsetWidth;
const totalWidth = sectionWidth * 3; // 5 sections

// Horizontal scroll animation for the horizontal-scroll-wrapper
gsap.to(".horizontal-scroll-wrapper", {
    x: -totalWidth + sectionWidth, // Adjust so it stops at the last section
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-scroll-wrapper",
        pin: true,
        scrub: 1,
        end: () => "+=" + totalWidth // End after the width of all 5 sections
    }
});

gsap.from("#apl", {
    y: -1000, // Moves from off-screen to its original position
    duration: 4.3,
    scrollTrigger: {
        trigger: "#brk", // The element that triggers the animation
        start: "top top", // Start the animation when the top of the element hits the bottom of the viewport
       
        
        
    }
});
const imageContainerEl = document.querySelector(".image-container");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");

let x = 0;
let timer;

// Event listener for the previous button
prevEl.addEventListener("click", () => {
    x += 90; // Rotate right
    clearTimeout(timer); // Clear the automatic timer
    updateGallery();
});

// Event listener for the next button
nextEl.addEventListener("click", () => {
    x -= 90; // Rotate left
    clearTimeout(timer); // Clear the automatic timer
    updateGallery();
});

// Function to update the gallery's rotation
function updateGallery() {
    imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`; // Use template literals
    timer = setTimeout(() => {
        x -= 90; // Rotate left automatically every 3 seconds
        updateGallery();
    }, 3000);
}

// Initialize the gallery rotation
updateGallery();

