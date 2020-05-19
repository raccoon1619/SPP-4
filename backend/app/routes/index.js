'use strict';

module.exports = function(app, io) {
  var controller = require('../controllers/tasksController');
  var authController = require('../controllers/authController');

  app.on('getTasks', (req) => controller.getAllTasks(req, io));
  app.on('getSortedByName', (req) => controller.getSortedByName(req, io));
  app.on('getSortedByDeadline', (req) => controller.getSortedByDeadline(req, io));
  app.on('getUnfinished', (req) => controller.getUnfinished(req, io));
  app.on('getTask', (taskId) => controller.getTaskById(taskId, io));

  app.on('addTask', (task) => controller.createTask(task, io));
  app.on('updateTask', (task) => controller.updateTask(task, io));
  app.on('deleteTask', (taskId) => controller.deleteTask(taskId, io));

  app.on('setTaskStatus', (task, status) => controller.changeTaskStatus(task, status, io));

  app.on('login', (req) => authController.login(req, io));
  app.on('registrate', (req) => authController.registrate(req, io));
};