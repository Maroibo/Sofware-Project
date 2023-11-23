
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    password = await hashPassword(password);
    const response = await fetch(`/login?username=${username}&password=${password}`);
    const data = await response.json();
    const organizer = data.oraganizer;
    // check if the user is valid
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

async function hashPassword(password) {
    // Convert the password to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Hash the password using the SubtleCrypto API
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

