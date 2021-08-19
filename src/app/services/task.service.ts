import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }


  addTask(task:any){

    let json = JSON.stringify(task);

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post("http://localhost:3000/addTask", json, {headers : headers});

  }

  getTasks(id:any){

    let json = JSON.stringify(id);

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post("http://localhost:3000/showTask",  json, {headers : headers});

  }

  deleteTask(_id:any){


    return this.httpClient.request('delete','http://localhost:3000/deleteTask', {body:{ _id: _id }});

  }

  updateTask(_id:any){

    let json = JSON.stringify(_id);

    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this.httpClient.put("http://localhost:3000/upDateTask", json, {headers : headers});

  }

}
