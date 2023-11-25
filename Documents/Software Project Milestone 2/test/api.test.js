import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api.js';
import * as classes from '../classes.js';

const expect = chai.expect;
chai.use(chaiHttp);

// Test the login endpoint
describe('Login endpoint', () => {
    it('should return a valid user', async () => {
        const username = 'org1';
        let password = 'password1';
        // hash the password
        password = classes.hashPassword(password);
        const res = await chai.request(app).get(`/login?username=${username}&password=${password}`);
        expect(res).to.have.status(200);
        expect(res.body.valid).to.equal(true);
        expect(res.body.organizer._username).to.equal('org1');
    });

    it('should return an invalid user', async () => {
        const username = 'org1';
        let password = 'not the password';
        // hash the password
        password = classes.hashPassword(password);
        const res = await chai.request(app).get(`/login?username=${username}&password=${password}`);
        expect(res).to.have.status(200);
        expect(res.body.valid).to.equal(false);
        expect(res.body.organizer).to.equal(null);
    });
});


describe('Conference endpoint PUT Method', () => {
    it('should return a success message', async () => {
        const res = await chai.request(app).put('/conference').send({
            conference: {
                conference_name: 'Test Conference',
                date: '2020-10-10',
                venue: ['Test Venue'],
                reviewers_list: ['Test Reviewer']
            },
            organizer: {
                _username: 'org1'
            }
        });

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Conference registered successfully');
        expect(res.body.conferences).to.be.an('object');
    });
});




// Test the conference endpoint (POST method)
describe('Conference endpoint POST Method', () => {
    it('should return a list of conferences for the specified organizer', async () => {
        const res = await chai.request(app).post('/conference').send({
            organizer: {
                _username: 'org1'
            }
        });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
    // terminate the test after it is done
    after(() => {
        process.exit();
    });
});

