// Sample way to send data to flask

// Example JavaScript code to send data to Flask using the fetch API
document.addEventListener("DOMContentLoaded", function () {
  var dataToSend = {
    name: "Bob",
    courses: ["111", "212", "220"],
  };

  const surveyDataForGptQuery = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  };

  fetch("/receive_data", surveyDataForGptQuery)
    .then(gptResponse)
    .catch((error) => onError(error, dataToSend));
});

function gptResponse(response) {
  console.log("Recieved response form gpt");
  console.log(response.json());
}

function onError(error, userInput) {
  console.error("Error sending data:", error);
  console.log("Using query/data", userInput);
  //   Redirect user to try again
}
