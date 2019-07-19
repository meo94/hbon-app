import uuidv4 from 'uuid/v4';

const users = [
    { // accounts
        id: 'me',
        name: 'Me',
    },
    {
        id: 'friend',
        name: 'Friend',
    },
    {
        id: 'expert',
        name: 'Expert',
    }
];
const devices = [{}];
const organizations = [{}];

const countries = [{}];
const cities = [{}];
const districts = [{}];
const wards = [{}];

const messages = [
    {
        id: uuidv4(),
        chatRoomId: '1:1',

    }
];
const chatrooms = [
    {
        id: '1:1',
        members: [
            {
                id: 'me',
                name: 'Me',
            },
            {
                id: 'expert',
                name: 'Expert',
            }]
    },
    {
        id: 'n',

    }
];

const assets = [{}];
const contents = [{}];
const wikis = [{}];
const quizzs = [{}];
const questions = [{}];

const activities = [{}];

const categories = [{}];
const tags = [{}];