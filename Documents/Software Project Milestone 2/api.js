import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import * as classes from "./classes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
export default app;
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Function to read data from the organizers.json file
async function readOrganizers() {
    try {
        const data = await fs.readFile('./public/organizers.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading organizers.json:', error.message);
        return [];
    }
}

// Endpoint for user authentication
// Endpoint for user authentication
app.get('/login', async (req, res) => {
    const { username, password } = req.query;
    const organizers = await readOrganizers();
    // Check if the provided username and password match any user
   let validUser=false
   organizers.forEach(organizer => {
        if (organizer._username === username && organizer._password === password) {
            validUser=true
        }
    });
    const organizer = organizers.find(organizer => organizer._username === username);

    if (organizer) {
        res.json({ valid: validUser, organizer: organizer });
    } else {
        res.json({ valid: validUser, organizer: null });
    }
});

// Endpoint for retrieving conference objects
app.put('/conference', async (req, res) => {
    let { conference,  organizer } = req.body;
    const newConference = new classes.Conference(conference.conference_name, conference.date, conference.venue, conference.reviewers_list);
    const conferences = await readConferences();
    // validate if the conference name already exists in the database replace the conference object
    const organizers = await readOrganizers();
    const index = conferences.findIndex(c => c._conference_name === conference.conference_name);
    let currentOrganizer = organizers.find(o => o._username === organizer._username);
    currentOrganizer=classes.Organizer.fromJSON(currentOrganizer);
    if (index !== -1) {
        conferences[index] = newConference;
        // find the organizer with a conference the matches the conference name
        const conferenceOrganizer = organizers.find(o => o._conference_list.some(c => c._conference_name === conference.conference_name));
        // if the organizer is the same as the current organizer update the conference list
        if (conferenceOrganizer._username === organizer._username) {
            const conferenceIndex = conferenceOrganizer._conference_list.findIndex(c => c._conference_name === conference.conference_name);
            conferenceOrganizer._conference_list[conferenceIndex] = newConference;
            const organizerIndex = organizers.findIndex(o => o._username === organizer._username);
            organizers[organizerIndex] = conferenceOrganizer;
        } else {
            // if the organizer is different remove the conference from the old organizer and add it to the new one
            const conferenceIndex = conferenceOrganizer._conference_list.findIndex(c => c._conference_name === conference.conference_name);
            conferenceOrganizer._conference_list.splice(conferenceIndex, 1);
            const organizerIndex = organizers.findIndex(o => o._username === conferenceOrganizer._username);
            organizers[organizerIndex] = conferenceOrganizer;
            currentOrganizer.registerConference(newConference);
        }
    } else {
    conferences.push(newConference);
    currentOrganizer.registerConference(newConference);
    }
    await fs.writeFile('./public/conferences.json', JSON.stringify(conferences, null, 4)); 
    await fs.writeFile('./public/organizers.json', JSON.stringify(organizers, null, 4));

    res.json({
        message: 'Conference registered successfully',
        conferences: newConference
    });
});

// create /conference endpoint with a get method to retrieve all conferences 
// for a specific organizer the body of the request should contain the organizer object
app.post('/conference', async (req, res) => {
    const { organizer } = req.body;
    const organizers = await readOrganizers();   
    let currentOrganizer = organizers.find(o => o._username === organizer._username);
    currentOrganizer=classes.Organizer.fromJSON(currentOrganizer);
    const conferences = currentOrganizer._conference_list;
    res.json(conferences);
});


async function readConferences() {
    const data = await fs.readFile('./public/conferences.json', 'utf8');
    return JSON.parse(data);
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
