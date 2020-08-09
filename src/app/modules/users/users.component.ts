import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserService } from '../../service/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserUpdate} from '../../service/userUpadate'
import { NgForm } from '@angular/forms';
import {User} from '../../service/User'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data = new Array()
  token :any
  id:any
  username:any
  email:any
  password:any
  role:any
  roleConnect :any
  emailconnect :any
  ListeRole = new Array()
  closeResult: string;
  roleupdate:any
  dataarrived = false
  constructor(private service : UserService , private route :Router,
    private servicemodal :NgbModal ,private router:Router,private toastr: ToastrService) { }
  ngOnInit() {  
    this.roleConnect = localStorage.getItem("role")
    this.emailconnect = localStorage.getItem("email")
    this.getAllUser()
  

   }
   delete(){
    this.dataarrived = false
    this.data = new Array()
     this.service.deleteUser(this.id).subscribe((res)=>{
       
        

     
       
     })
     this.servicemodal.dismissAll()
         
         this.toastr.success('Utilisateur supprimé avec succès.','Utilisateur')
         this.getAllUser()
   }

   getAllUser(){
     this.dataarrived = false
     this.data = new Array()
    this.service.getUsers(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     for(let item of res){
       this.data.push(item)
     }
   })
   setTimeout (() => {
    this.dataarrived = true
 }, 1000);
   
   }

   openAddUser(content ) {
    
  
    this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

   
   openAddDatasource(content,id ) {
    
     this.id = id;
     this.service.getUserbyId(id,localStorage.getItem('currentUser')).subscribe((res)=>{
       console.log("eeeeeeeeeeeeeeeeeeeeeeee")
       console.log(res)
       this.username = res.username
       this.password= res.password
       this.email = res.email
       this.role = res.roles[0].name
     })
    this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }


 updateUser(){
   
   console.log(this.role)
   if(this.role == 1){
     this.roleupdate = "admin";

   }else{
     this.roleupdate ="user";
   }
   let user = new UserUpdate (this.id,this.username,this.password,this.email,this.roleupdate);
   this.service.updateUser(user).subscribe((res)=>{
   
       this.getAllUser()
       this.servicemodal.dismissAll()
       this.toastr.success('Utilisateur '+this.username+' modifiée  avec succès.','Utilisateur')

   })
 }
 onSubmit(form: NgForm) {
   this.ListeRole = new Array()
   if(form.value.selectePlateforme == 1){
   this.ListeRole.push("admin")
   }else{
    this.ListeRole.push("user")
   
   }
   let user = new User (form.value.name,form.value.mail,form.value.password,this.ListeRole)
   
   this.service.saveUser(user).subscribe((res)=>{
    console.log(res)
    this.getAllUser()
    this.servicemodal.dismissAll()
    this.toastr.success('Utilisateur '+form.value.name+' ajoutée avec succès.','Utilisateur')
    

    
  })    
}




 
  

  }


