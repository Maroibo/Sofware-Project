const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', async () => {
    const conferenceName = document.getElementById('conferenceName').value;
    const conferenceDate = document.getElementById('date').value;
    const venue = document.getElementById('venue').value.split(',');
    const reviewers = document.getElementById('reviewers').value.split(',');
    const organizer = JSON.parse(localStorage.getItem('organizer'));
    delete organizer._password;
    const response = await fetch('/conference', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            conference: {
                conference_name: conferenceName,
                date: conferenceDate,
                venue: venue,
                reviewers_list: reviewers
            },
            organizer: organizer
        })
    });

    const data = await response.json();
    if(data){
        window.location.href = 'organizer-conf.html';
    }
});

let logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', function () {
    localStorage.removeItem('organizer');
    window.location.href = 'index.html';
});
