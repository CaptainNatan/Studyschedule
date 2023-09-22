const api_url = "https://retoolapi.dev/eIJFdo/data";

async function check_login() {
  // Storing response
  const response = await fetch(api_url);

  // Storing data in form of JSON
  var data = await response.json();

  // Get the inputted email and password
  const userText = document.getElementById("UserText")
  const passwordText = document.getElementById("PasswordText")

    
  data.forEach(function(account){
    console.log(account.username)
    console.log(account.password)
    if(userText.value == account.username && passwordText.value == account.password) {
      alert("Login successful")
    
      // Set the session to logged in
      console.log("Setting session to logged in")
      sessionStorage.setItem('userStatus', 'loggedIn')
      location.href = 'index.html';
      // Task: What should happen once the user has logged in? Do they go to a dashboard?
    }
  })
}