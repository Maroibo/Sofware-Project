
// I need a User class with a constructor that takes a username and password.
// attrs: username, password, email , user_id with setter and getter methods





// add an event listener to the login button
// get the username and password from the input fields
// send a request to the server to check if the user is valid
// if the user is valid, log it to the console
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`/login?username=${username}&password=${password}`);
    const data = await response.json();
    const organizer = data.oraganizer;
    if (data.valid) {
        // remove the email and the password from the object
        delete data.organizer._password;
        // store the user in the local storage
        localStorage.setItem('organizer', JSON.stringify(data.organizer));
        // redirect the user to the home page
        window.location.href = 'conf.html';
    } else {
        // clear the input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        // alert the user
        alert('Invalid username or password');
    }
});

