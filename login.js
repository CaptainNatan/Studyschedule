// Define the API endpoint URL
const api_url = "https://retoolapi.dev/9tJEF3/data";

// Function to check user login
async function check_login() {
  try {
    // Fetch data from the API
    const response = await fetch(api_url);

    // Convert the response to JSON format
    const data = await response.json();

    // Get the inputted email and password from the HTML elements
    const userText = document.getElementById("UserText");
    const passwordText = document.getElementById("PasswordText");

    // Flag to track if login was successful
    let isLoginSuccessful = false;

    // Iterate through the data to check for a matching username and password
    data.forEach(function(account) {
      if (userText.value === account.username && passwordText.value === account.password) {
        // Display an alert for successful login
        alert("Login successful");

        // Set session status to logged in
        console.log("Setting session to logged in");
        sessionStorage.setItem('userStatus', 'loggedIn');

        // Set the username in sessionStorage
        sessionStorage.setItem('username', account.username);

        // Update the flag to indicate a successful login
        isLoginSuccessful = true;

        // Redirect to index.html upon successful login
        location.href = "/index.html";
      }
    });

    // If login was not successful, display an alert
    if (!isLoginSuccessful) {
      alert("Invalid username/password");
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error:", error);
    // Handle the error appropriately
  }
}
