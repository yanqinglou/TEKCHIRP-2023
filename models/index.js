const User = require("./User");
const Chirp = require("./Chirp");

Chirp.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Chirp)

module.exports = {
    User,
    Chirp
}