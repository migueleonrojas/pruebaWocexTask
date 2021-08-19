import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup | any;

  respuestaLogin:any;




  constructor(
    private router: Router,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService

  ) {

    this.formLogin = this.formBuilder.group({

      mail: [ '' , [Validators.required ] ],
      password:  [ '' , [Validators.required ] ],
    });

  }

  ngOnInit(): void {



  }

  loginUser():void{

    const mail = (document.querySelector('#emailInput') as HTMLInputElement ).value;

    const password = (document.querySelector('#passwordInput') as HTMLInputElement ).value;

    this.userService.getUser({

      mail:mail,
      password:password

    }).subscribe(response =>{

      this.respuestaLogin = response;


      if(this.respuestaLogin.usuario != null){

        localStorage.setItem("user", this.respuestaLogin.usuario.id);

        this.toastrService.success(`Accedio con exito el usuario: ${this.respuestaLogin.usuario.mail} con exito `,'Acceso exitoso');

        this.router.navigate(['home']);

      }


    });




  }
}
