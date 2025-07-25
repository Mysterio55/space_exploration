const stars = document.querySelectorAll('.star');
const tooltip = document.getElementById('tooltip');

const tl = gsap.timeline();

stars.forEach((star, index) => {
  tl.to(star, {
    duration: 2.5,
    opacity: 1,
    boxShadow: "0 0 20px white",
    ease: "power2.inOut",
  }, index * 0.3);

  star.addEventListener('mouseover', (event) => {
    tooltip.style.display = 'block';
    tooltip.innerHTML = star.getAttribute('data-info');
    tooltip.style.left = event.pageX + 'px';
    tooltip.style.top = event.pageY + 'px';
  });

  star.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
  });
});

window.addEventListener('DOMContentLoaded', () => {
  tl.play();
});
