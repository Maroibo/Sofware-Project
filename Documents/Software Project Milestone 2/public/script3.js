

// add an event listener when the page is loaded to call the function
window.addEventListener('load', async function() {
    // add the oraganizer username to the page 
    let oraganizerUsernameP= document.getElementById('organizer-username');
    oraganizerUsernameP.innerHTML=JSON.parse(this.localStorage.getItem("organizer"))._username;
    // send the username to the api to get the conferences put the oraganizer in the body of the request
    let data=await fetch('/conference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            organizer: JSON.parse(this.localStorage.getItem("organizer"))
        })
    })
    data=await data.json();
    let conferences=data.map(d=>createConferenceElement(d));
    let conferencesDiv=document.getElementById('conferences-container');
    conferences.forEach(conference => {
        conferencesDiv.appendChild(conference);
    });
});

function createConferenceElement(conference){
    let conferenceDiv= document.createElement('div');
    conferenceDiv.classList.add('flex','flex-col','items-center','mt-4');
    let conferenceDetailsDiv= document.createElement('div');
    conferenceDetailsDiv.classList.add('flex','items-center','flex-col','justify-between','shadow-lg','p-2','my-1','font-bold','w-full');
    let conferenceDetailsRow= document.createElement('div');
    conferenceDetailsRow.classList.add('flex','flex-row','justify-evenly','items-baseline','w-full');
    let conferenceNameSpan= document.createElement('span');
    conferenceNameSpan.classList.add('text-xl');
    conferenceNameSpan.innerHTML=conference._conference_name;
    let conferenceDateSpan= document.createElement('span');
    conferenceDateSpan.classList.add('text-lg');
    conferenceDateSpan.innerHTML=conference._date;
    conferenceDetailsRow.appendChild(conferenceNameSpan);
    conferenceDetailsRow.appendChild(conferenceDateSpan);
    conferenceDetailsDiv.appendChild(conferenceDetailsRow);
    let conferenceVenueSpan= document.createElement('span');
    conferenceVenueSpan.classList.add('text-lg','block');
    conferenceVenueSpan.innerHTML=conference._venue;
    conferenceDetailsDiv.appendChild(conferenceVenueSpan);
    let conferenceReviewersSpan= document.createElement('span');
    conferenceReviewersSpan.classList.add('text-lg','block');
    conferenceReviewersSpan.innerHTML=conference._reviewers_list;
    conferenceDetailsDiv.appendChild(conferenceReviewersSpan);
    conferenceDiv.appendChild(conferenceDetailsDiv);
    return conferenceDiv;
}

let logoutButton=document.getElementById('logout');
logoutButton.addEventListener('click',function(){
    localStorage.removeItem('organizer');
    window.location.href = "index.html";
})