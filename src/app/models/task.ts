export class Task {

  $key!: string;
  name!: string;
  description!: string;
  status!:UserType;
  id!:string;
}

export enum UserType{

  Pendiente,
  Completado

}
