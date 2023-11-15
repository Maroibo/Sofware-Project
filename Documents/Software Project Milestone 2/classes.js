import { nanoid } from 'nanoid';

export class User {
    constructor(username, password, email) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._user_id = nanoid();
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get user_id() {
        return this._user_id;
    }

    login(username, password) {
        return username === this._username && password === this._password;
    }
    static fromJSON(json) {
        const user = Object.create(User.prototype);
        return Object.assign(user, json);
    }
}

export class Organizer extends User {
    constructor(username, password, email, organizer_name) {
        super(username, password, email);
        this._organizer_name = organizer_name;
        this._organizer_id = nanoid();
        this._conference_list = [];
    }

    get organizer_name() {
        return this._organizer_name;
    }

    set organizer_name(organizer_name) {
        this._organizer_name = organizer_name;
    }

    get organizer_id() {
        return this._organizer_id;
    }

    set organizer_id(organizer_id) {
        this._organizer_id = organizer_id;
    }

    get conference_list() {
        return this._conference_list;
    }

    set conference_list(conference_list) {
        this._conference_list = conference_list;
    }

    registerConference(conference) {
        this._conference_list.push(conference);
    }

    assignReviewer(conference, reviewers) {
        conference.set_reviewers(reviewers);
    }
    static fromJSON(json) {
        const organizer = Object.create(Organizer.prototype);
        return Object.assign(organizer, json);
    }
}

export class Conference {
    constructor(conference_name, date, venue, reviewers_list) {
        this._conference_name = conference_name;
        this._conference_code = nanoid();
        this._date = date;
        this._venue = venue;
        this._reviewers_list = reviewers_list;
        this._papers_list = [];
        this._proceedings = '';
    }

    get conference_name() {
        return this._conference_name;
    }

    set conference_name(conference_name) {
        this._conference_name = conference_name;
    }

    get conference_code() {
        return this._conference_code;
    }

    set conference_code(conference_code) {
        this._conference_code = conference_code;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get venue() {
        return this._venue;
    }

    set venue(venue) {
        this._venue = venue;
    }

    get reviewers_list() {
        return this._reviewers_list;
    }

    set reviewers_list(reviewers_list) {
        this._reviewers_list = reviewers_list;
    }

    get papers_list() {
        return this._papers_list;
    }

    set papers_list(papers_list) {
        this._papers_list = papers_list;
    }

    get proceedings() {
        return this._proceedings;
    }

    set proceedings(proceedings) {
        this._proceedings = proceedings;
    }

    set_reviewers(reviewers) {
        this._reviewers_list = reviewers;
    }
    static fromJSON(json) {
        const conference = Object.create(Conference.prototype);
        return Object.assign(conference, json);
    }
}
