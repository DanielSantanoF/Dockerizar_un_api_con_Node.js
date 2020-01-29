const _ = require('lodash')
const bcrypt = require('bcryptjs')

const users = [
    {
        id: 1,
        username: "dsantano",
        password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS)),
        rol: "USER"
    },
    {
        id: 2,
        username: "admin",
        password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS)),
        rol: "ADMIN"
    },
    {
        id: 3,
        username: "super_admin",
        password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS)),
        rol: "SUPER_ADMIN"
    }
]


let service = {
    findUser: (user) => {
        return _.find(users, u => u.username == user.username);
    },
    findById: (id) => {
        return _.find(users, u => u.id == id);
    },
    insertUser: (user) => {
        users.push({
            id: users.length,
            username: user.username,
            password: user.password,
            rol: user.rol
        });
    }
}

module.exports = service