import fs from 'fs';
import * as classes from './classes.js';
// Function to hash the password


// Read the <link>organizers.json</link> file
fs.readFile('./public/organizers.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON data
    let organizers = JSON.parse(data);
    organizers=organizers.map(organizer=>{
        return classes.Organizer.fromJSON(organizer)
    })  
    // Hash the passwords of each organizer
    const hashedOrganizers = organizers.map((organizer) => ({
      ...organizer,
      password: classes.hashPassword(organizer.password)
    }));

    // Convert the hashed organizers back to JSON string
    const hashedOrganizersJSON = JSON.stringify(hashedOrganizers, null, 2);

    // Write the hashed organizers back to the file
    fs.writeFile('./public/organizers.json', hashedOrganizersJSON, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }

      console.log('Passwords hashed and saved successfully!');
    });
  } catch (error) {
    console.error('Error parsing the JSON:', error);
  }
});
