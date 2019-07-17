// import { normalize, schema } from 'normalizr';

const { normalize, denormalize, schema } = require('normalizr');

const userSchema = new schema.Entity("users");
user.define({ supervisors: [user] });

const activitySchema = new schema.Entity("activities", {
});

const activityAttemptSchema = new schema.Entity('activityAttempts', {
    user: userSchema,
    activity: activitySchema,
});

const message = new schema.Entity("messages", {
    author: userSchema,
});

// const users = [
//     {
//         id: 1,
//         name: 'A'
//     },
//     {
//         id: 2,
//         name: 'B'
//     },
//     {
//         id: 3,
//         name: 'C',
//         supervisors: [
//             {
//                 id: 1,
//             },
//             {
//                 id: 2,
//             },
//         ]
//     },
// ]

// const normalizeAuthUser = normalize(users, [user]);
// console.log(normalizeAuthUser.entities.users);