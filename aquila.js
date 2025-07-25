// Select all stars
const stars = document.querySelectorAll('.star');
const tooltip = document.getElementById('tooltip');

// Create a GSAP timeline for sequential animations
const tl = gsap.timeline();

// Add animations to the timeline for each star
stars.forEach((star, index) => {
  tl.to(star, {
    duration: 2.5,   // Duration of each glow animation
    opacity: 1,      // Fade in the star
    boxShadow: "0 0 20px white",  // Glowing effect
    ease: "power2.inOut",  // Smooth easing
  }, index * 0.3);   // Delay between each star animation (0.3 seconds)

  // Event listener for showing tooltip on mouseover
  star.addEventListener('mouseover', (event) => {
    tooltip.style.display = 'block';
    tooltip.innerHTML = star.getAttribute('data-info'); // Get info from data attribute
    tooltip.style.left = event.pageX + 'px'; // Position tooltip at mouse location
    tooltip.style.top = event.pageY + 'px';
  });

  // Event listener for hiding tooltip on mouseout
  star.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
  });
});

// Automatically start the animation when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  tl.play();
});
