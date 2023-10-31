const api_url = "https://retoolapi.dev/9tJEF3/data";

// Defining async function
async function check_login() {
  // Storing response
  const response = await fetch(api_url);

  // Storing data in form of JSON
  var data = await response.json();

  // Get the inputted email and password
  const userText = document.getElementById("UserText")
  const passwordText = document.getElementById("PasswordText")


  try {
    data.forEach(function(account) {
      if (userText.value == account.username && passwordText.value == account.password) {
        alert("Login successful")

        // Set the session to logged in
        console.log("Setting session to logged in")
        sessionStorage.setItem('userStatus', 'loggedIn')
        sessionStorage.setItem('username', account.username)

        location.href = "/index.html"
        // Task: What should happen once the user has logged in? Do they go to a dashboard?
        throw new Error("Shush")
      } else {
        alert("Invalid username/password")
      }
    })
  } catch (err) {

  }
}