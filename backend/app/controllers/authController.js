var mongoose = require('mongoose'),
    User = mongoose.model('users');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

exports.login = function(req, io) {
    let data = JSON.parse(req);
    const note = { 
        userName: data.username, 
        password: data.password
    };
    console.log(note);
    User.findOne(note, (err, user) => {
        if (!user) {
            io.emit("login server", 'User not found.');
            return;
        }
        if (err) {
            io.emit("login server", err);
            return;
        }
        user.token = generationToken(user);

        io.emit("login server", user);
    })
};

exports.registrate = function(req, io){
    let data = JSON.parse(req);
    const note = { 
        userName: data.username, 
        password: data.password
    };

    var new_task = new User(note);
        new_task.save(function(err, user) {
            if (err) {
                if (err.code === 11000) {
                    io.emit("registrate server", 'Account already exists.');
                    return;
                }
                io.emit("registrate server", err);
                return
            }
         else {
            user.token = generationToken(user);
            io.emit("registrate server", user);
        }
    });
}

let generationToken = (user) => {
    return jwt.sign({
        userName: user.userName
    }, auth.secretKey, {expiresIn: auth.expires});
};
