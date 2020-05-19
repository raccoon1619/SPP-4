import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, onErrorResumeNext } from 'rxjs';
import { Task } from '../models/task';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
});
  private socket = io(environment.SOCKET_ENDPOINT);

  constructor(private http: HttpClient) { }

  getTasks(userId: Object): Observable<Array<Task>>{
    this.socket.emit('getTasks', userId);
    return new Observable<Array<Task>>(observer => {
      this.socket.on('getTasks server', (data: Array<Task>) =>
      {
          observer.next(data);
      });
  });
  }

  getSortedByDeadlineTasks(userId: Object): Observable<Array<Task>> {
    this.socket.emit('getSortedByDeadline', userId);
    return new Observable<Array<Task>>(observer => {
      this.socket.on('getSortedByDeadline server', (data: Array<Task>) =>
      {
          observer.next(data);
      });
    });
  }

  getSortedByNameTasks(userId: Object): Observable<Array<Task>> {
    this.socket.emit('getSortedByName', userId);
    return new Observable<Array<Task>>(observer => {
      this.socket.on('getSortedByName server', (data: Array<Task>) =>
      {
          observer.next(data);
      });
    });
  }

  getUnfinished(userId: Object): Observable<Array<Task>> {
    this.socket.emit('getUnfinished', userId);
    return new Observable<Array<Task>>(observer => {
      this.socket.on('getUnfinished server', (data: Array<Task>) =>
      {
          observer.next(data);
      });
    });
  }

  getTask(taskId: number): Observable<Task> {
    this.socket.emit('getTask',taskId);
    return new Observable<Task>(observer => {
      this.socket.on('getTask server', (data: Task) =>
      {
          observer.next(data);
      });
    });
  }

  addTask(task: Task) : Observable<Task> {
    this.socket.emit('addTask', JSON.stringify(task));
    return new Observable<Task>(observer => {
      this.socket.on('addTask server', (data: Task) =>
      {
          observer.next(data);
      });
    });
  }

  updateTask(task: Task): Observable<Task>{
    this.socket.emit('updateTask', JSON.stringify(task));
    return new Observable<Task>(observer => {
      this.socket.on('updateTask server', (data: Task) =>
      {
          observer.next(data);
      });
    });
  }

  setTaskStatus(task: Task, status: boolean): Observable<Object> {
    this.socket.emit('setTaskStatus', JSON.stringify(task), status);
    return new Observable<Task>(observer => {
      this.socket.on('setTaskStatus server', (data: Task) =>
      {
          observer.next(data);
      });
    });
  }

  deleteTask(taskId: object): Observable<Object> {
    this.socket.emit('deleteTask', taskId);
    return new Observable<Object>(observer => {
      this.socket.on('deleteTask server', (message: String) =>
      {
          observer.next(message);
      });
    });
  }
}
