import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private httpClient: HttpClient) { }


  getUser(user:any){

    let json = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post("http://localhost:3000/consultUser", json, {headers : headers});

  }

  getUserForId(id:any){

    let json = JSON.stringify(id);

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post("http://localhost:3000/consultUserForId", json, {headers : headers});


  }



  addUser(){



  }


  updateUser(){



  }

  deleteUser(){



  }


}
