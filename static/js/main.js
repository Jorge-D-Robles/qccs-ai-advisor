/* START OF MODAL SECTION */

const modalOpen = document.querySelector(".modal-open"); // The element that opens the modal
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

/*

STATE MACHINE FOR PROMPTS

*/

let currentState = 0;
let currentAnswer = "";
const states = [
  {
    title: "Question 1",
    paragraph: "What is your primary goal?",
    inputType: "text",
    placeholder: "Type your answer...",
    onNext: () => transitionToState(1),
  },
  {
    title: "Question 2",
    paragraph: "How often do you use our product?",
    inputType: "text",
    placeholder: "Type your answer...",
    onNext: () => transitionToState(2),
  },
  {
    title: "Question 3",
    paragraph: "Choose your preferred option:",
    inputType: "radio",
    options: [
      { label: "Option 1", value: "GPT prompt text for option 1" },
      { label: "Option 2", value: "GPT prompt text for option 2" },
      // Add more options as needed
    ],
    onNext: () => transitionToState(3), // Adjust the index as per your sequence
  },
];

function transitionToState(index) {
  currentState = index;
  const state = states[index];
  updateHeroContent({
    titleText: state.title,
    paragraphText: state.paragraph,
    inputType: state.inputType,
    inputPlaceholder: state.placeholder,
    options: state.options, // Make sure to pass options here
    buttonText: "Next",
    buttonId: `nextButton${index + 1}`,
    onNext: state.onNext,
  });
}

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
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("flex", "justify-center", "w-full");

    // Prepare the button with your existing setup
    const startSurvey = document.createElement("button");
    startSurvey.textContent = "Click here to begin";
    startSurvey.classList.add(
      "mt-6",
      "inline-flex",
      "items-center",
      "px-6",
      "py-3",
      "border",
      "border-transparent",
      "text-base",
      "font-medium",
      "rounded-md",
      "text-white",
      "bg-red-600",
      "hover:bg-red-700"
    );
    startSurvey.id = "startSurvey";
    // Initial trigger
    startSurvey.addEventListener("click", () => transitionToState(0));

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

/*
.
.
UPDATING HERO CONTENT
.
*/

// Define default button classes if not provided
const defaultButtonClasses = [
  "mt-6",
  "inline-flex",
  "items-center",
  "px-6",
  "py-3",
  "border",
  "border-transparent",
  "text-base",
  "font-medium",
  "rounded-md",
  "text-white",
  "bg-red-600",
  "hover:bg-red-700",
];
const buttonClasses = defaultButtonClasses; // default set of button classes

// Define the updateHeroContent function with an options object parameter that includes all possible options.
function updateHeroContent({
  titleText,
  paragraphText,
  inputType,
  inputPlaceholder,
  options,
  buttonText,
  buttonId,
  onNext,
}) {
  // Clear existing content and set up the hero section.
  hero.innerHTML = "";
  hero.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-full"
  );

  // Append title.
  if (titleText) {
    const title = document.createElement("h2");
    title.textContent = titleText;
    title.classList.add("text-xl", "font-bold");
    hero.appendChild(title);
  }

  // Append paragraph.
  if (paragraphText) {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    paragraph.classList.add("mt-4");
    hero.appendChild(paragraph);
  }

  let actionButton; // Declare outside so it's accessible for enabling/disabling.

  // Handle input creation based on type.
  if (inputType === "text") {
    // Create a text input.
    const input = document.createElement("input");
    input.type = inputType;
    input.placeholder = inputPlaceholder || "";
    input.classList.add(
      "mt-4",
      "p-2",
      "border",
      "border-gray-300",
      "rounded-md"
    );
    hero.appendChild(input);

    input.addEventListener("input", () => {
      actionButton.disabled = input.value.trim() === "";
    });
  } else if (inputType === "radio" || inputType === "checkbox") {
    // Handle radio or checkbox options.
    const optionsContainer = document.createElement("div");
    options.forEach((option, index) => {
      const inputId = `${inputType}-${index}`;
      const optionInput = document.createElement("input");
      optionInput.type = inputType;
      optionInput.id = inputId;
      optionInput.name = inputType + "Group";
      optionInput.value = option.value;

      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.textContent = option.label;
      label.classList.add("ml-2");

      const optionContainer = document.createElement("div");
      optionContainer.appendChild(optionInput);
      optionContainer.appendChild(label);
      optionsContainer.appendChild(optionContainer);
    });
    hero.appendChild(optionsContainer);

    // Enable the Next button when any option is selected.
    optionsContainer.addEventListener("change", () => {
      actionButton.disabled = !optionsContainer.querySelector(
        `input[type="${inputType}"]:checked`
      );
    });
  }

  // Create the Next button.
  actionButton = document.createElement("button");
  actionButton.textContent = buttonText;
  actionButton.id = buttonId;
  actionButton.disabled = true; // Initially disabled.
  buttonClasses.forEach((cls) => actionButton.classList.add(cls));
  hero.appendChild(actionButton);

  actionButton.addEventListener("click", () => {
    if (typeof onNext === "function") {
      onNext(); // Proceed to the next state if validation passes.
    }
  });

  // Fade-in logic.
  hero.classList.add("opacity-0");
  setTimeout(() => {
    hero.classList.remove("opacity-0");
  }, 10);
}
