var mongoose = require('mongoose'),
    Task = mongoose.model('tasks');
    mongoose.set('useFindAndModify', false);

exports.getAllTasks = function(req, io){
    Task.find({user_id: new mongoose.Types.ObjectId(req)}, function(err, result){
        if (err) 
            io.emit("getTasks server", 'error: An error has occurred');
        else
            io.emit("getTasks server", result);
    });
}

exports.getSortedByDeadline = function(req, io){
    Task.find({user_id: new mongoose.Types.ObjectId(req)})
    .sort({deadline: 'asc'}).exec(function(err, result){
        if (err) 
            io.emit("getSortedByDeadline server", "error");
        else
            io.emit("getSortedByDeadline server", result);
    });
}

exports.getSortedByName = function(req, io){
    Task.find({user_id: new mongoose.Types.ObjectId(req)})
    .sort({name: 'asc'}).exec(function(err, result){
        console.log(result);
        if (err) 
            io.emit("getSortedByName server", "error");
        else
            io.emit("getSortedByName server", result);
    });
}

exports.getUnfinished = function(req, io){
    Task.find({user_id: new mongoose.Types.ObjectId(req), isMade: false})
    .exec(function(err, result){
        if (err) 
            io.emit("getUnfinished server", "error");
        else
            io.emit("getUnfinished server", result);
    });
}

exports.getTaskById = function(taskId, io){
    Task.findById(taskId, function(err, task) {
        if (err) 
            io.emit("getTask server", "error");
        else
            io.emit("getTask server", task);
     });
}

exports.createTask = function(req, io){
    let data = JSON.parse(req);

    const note = { 
        name: data.name, 
        deadline: data.deadline, 
        details: data.details, 
        isMade: data.isMade, 
        user_id: data.user_id,
    };

    var new_task = new Task(note);
        new_task.save(function(err, task) {
        if (err) 
            io.emit("addTask server", "error");
        else
            io.emit("addTask server", task);
    });
}
    
exports.updateTask = function(task, io){
    let data = JSON.parse(task);

    Task.findOneAndUpdate({_id: data._id}, data, {new: true}, function(err, task) {
        if (err) 
            io.emit("updateTask server", "error");
        else
            io.emit("updateTask server", task);
    });
}

exports.changeTaskStatus = function(task, status, io){
    let data = JSON.parse(task);
    data.isMade = status;
    Task.findOneAndUpdate({_id: data._id}, data, {new: true}, function(err, task) {
        if (err) 
            io.emit("setTaskStatus server", "error");
        else
            io.emit("setTaskStatus server", task);
    });
}   

exports.deleteTask = function(taskId, io){
    Task.deleteOne({_id: taskId}, function(err, task) {
        if (err) 
            io.emit("deleteTask server", "error");
        else
            io.emit("deleteTask server", "deleted");
    });
}