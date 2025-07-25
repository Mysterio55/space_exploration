document.addEventListener("DOMContentLoaded", function () {
  let letter = 0;
  const text = "Lorem ipsum dolor sit amet consectetur.";
  const typeJsElement = document.getElementById("type-js");

  function typeText() {
    if (letter < text.length) {
      typeJsElement.innerHTML += text.charAt(letter);
      letter++;
      let speed = Math.floor(Math.random() * 150) + 50;
      setTimeout(typeText, speed);
    }
  }

  // Scroll trigger setup with IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeText();
          observer.unobserve(typeJsElement); // Stop observing after triggering once
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is in view
  );

  observer.observe(typeJsElement);
});
