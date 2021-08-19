import { UserService } from './../../services/user.service';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formTask: FormGroup | any;
  formTaskUpdate: FormGroup | any;
  tasks:any;
  idTaskUpdate:any;
  mailUser:any;

  responseTask:any;

  constructor(
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router
  ) {

    this.formTask = this.formBuilder.group({

      name: [ '' , [Validators.required ] ],
      description:  [ '' , [Validators.required ] ],
      estatus:['', [Validators.required ]]
    });

    this.formTaskUpdate = this.formBuilder.group({

      nameUpdate: [ '' , [Validators.required ] ],
      descriptionUpdate:  [ '' , [Validators.required ] ],
      estatusUpdate:['', [Validators.required ]]

    });



  }

  ngOnInit(): void {

    this.userService.getUserForId(
      {
        id:Number(localStorage.getItem("user"))
      }
    ).subscribe(response => {

      this.mailUser = response

    });


    this.taskService.getTasks(
      {
        id:Number(localStorage.getItem("user"))
      }
      ).subscribe(response =>{

      this.tasks = response;

    });
  }

  ngOnDestroy(){

    localStorage.removeItem("user");

  }

  logout(){

    if(confirm(`Estas seguro que quieres cerrar la sesion`)){

      localStorage.removeItem("user");

      this.router.navigate(['']);

    }


  }


  createTask(formTask:any){

    if(formTask.status != "INVALID"){

      this.taskService.addTask({

        Name: formTask.controls.name.value,
        Description: formTask.controls.description.value,
        Estatus: formTask.controls.estatus.value,
        Id:localStorage.getItem("user")

      }).subscribe(response =>{

        this.responseTask = response;

        this.toastrService.success('La tarea se creo exitosamente','Tarea creada');

        this.formTask.reset();
        this.taskService.getTasks(
          {
            id:Number(localStorage.getItem("user"))
          }
          ).subscribe(response =>{

          this.tasks = response;

        });

      })

    }

    else{

      this.toastrService.error('No debe de estar en blanco los campos','Fallo en crear tarea');

    }


  }

  deleteTask(item:any){

    if(confirm(`Estas seguro que quieres eliminar la tarea "${item.Name}"`)){
      this.taskService.deleteTask({
        "_id": item._id
      }).subscribe(response =>{

        this.toastrService.success(`La tarea con el nombre "${item.Name}" fue eliminada`,'Tarea Eliminada');
        this.taskService.getTasks(
          {
            id:Number(localStorage.getItem("user"))
          }
          ).subscribe(response =>{

          this.tasks = response;

        });

      });
    }

  }

  editTask(item:any){


    this.formTaskUpdate.controls['nameUpdate'].setValue(item.Name);
    this.formTaskUpdate.controls['descriptionUpdate'].setValue(item.Description);
    this.formTaskUpdate.controls['estatusUpdate'].setValue(item.Estatus);

    this.idTaskUpdate = item._id;

  }

  updatetaskselected(formTaskUpdate:any){



    if(confirm(`Estas seguro que quieres actualizar la tarea?`)){
      this.taskService.updateTask({
        _id: this.idTaskUpdate,
        Name: formTaskUpdate.controls.nameUpdate.value,
        Description: formTaskUpdate.controls.descriptionUpdate.value,
        Estatus: formTaskUpdate.controls.estatusUpdate.value,

      }).subscribe(response => {

        this.toastrService.success('Se actualizo la tarea',`Se actualizo la tarea ${formTaskUpdate.controls.nameUpdate.value}`);

        this.taskService.getTasks(
          {
            id:Number(localStorage.getItem("user"))
          }
          ).subscribe(response =>{

          this.tasks = response;
          this.formTaskUpdate.reset();

        });


      });
    }

  }

}
