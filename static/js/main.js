/* START OF MODAL SECTION */

const modalOpen = document.querySelector(".modal-open"); // Assuming you have a trigger element with this class
const modalCloseButtons = document.querySelectorAll(".modal-close"); // Selects all close buttons, including the "X"
const modal = document.getElementById("modal"); // The modal itself
const modalOverlay = document.getElementById("modalOverlay"); // The overlay

// Function to open the modal
const openModal = () => {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

// Function to close the modal
const closeModal = () => {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

// Open modal event (if you have a button or another element to open the modal)
if (modalOpen) {
  modalOpen.addEventListener("click", openModal);
}

// Close modal when clicking on the overlay
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Close modal when clicking the "X" or any .modal-close element
modalCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", closeModal);
});

// Close modal with the ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
/* END OF MODAL SECTION */

/* START OF GET STARTED SECTION */

// Click event for the "Get Started" button
const startButton = document.querySelector("#getStarted");
const hero = document.querySelector("#hero");
hero.classList.add("transition-opacity", "duration-1000");

startButton.addEventListener("click", () => {
  // Fade out the hero section smoothly
  hero.classList.add("opacity-0");

  // Wait for the fade-out to complete
  setTimeout(() => {
    // Update the hero section content
    const readMore = document.querySelector("#readMore");
    const title = document.querySelector("#title");
    const innerPara = document.querySelector("#innerPara");
    const modalTrigger = document.querySelector("#modal-trigger");

    if (title) title.textContent = "Let's get started.";
    if (innerPara)
      innerPara.textContent =
        "You will be answering a set of questions to help us understand your needs. Choose each answer based off your personal experience and preferences in order to receive a personalized recommendation.";
    if (readMore) readMore.remove();
    if (modalTrigger) modalTrigger.remove();
    if (startButton) startButton.remove();
    // Create a wrapper div for the button
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add("flex", "justify-center", "w-full");

    // Prepare the button with your existing setup
    const startSurvey = document.createElement('button');
    startSurvey.textContent = "Click here to begin";
    startSurvey.classList.add("mt-6", "inline-flex", "items-center", "px-6", "py-3", "border", "border-transparent", "text-base", "font-medium", "rounded-md", "text-white", "bg-indigo-600", "hover:bg-indigo-700");
    startSurvey.id = "startSurvey";

    // Append the button to the wrapper, then the wrapper to the hero section
    buttonWrapper.appendChild(startSurvey);
    hero.appendChild(buttonWrapper);



    // Prepare for fade-in by making the hero invisible and then triggering reflow
    hero.classList.add("opacity-0");
    void hero.offsetWidth; // Trigger reflow to ensure the next opacity change is animated

    // Fade in the hero section smoothly with the new content
    setTimeout(() => {
      hero.classList.remove("opacity-0");
    }, 10); // A short delay to ensure the opacity change triggers a transition
  }, 1000); // This timeout should match the fade-out transition duration
});

// clears the body of any elements below the header. Keeps the header.
function clearHero() {
  // delete hero section
  hero.remove();
}
