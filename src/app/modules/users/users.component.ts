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
  data:any
  token :any
  id:any
  username:any
  email:any
  password:any
  role:any
  ListeRole = new Array()
  closeResult: string;
  constructor(private service : UserService , private route :Router,
    private servicemodal :NgbModal ,private router:Router,private toastr: ToastrService) { }
  ngOnInit() {  
    this.getAllUser()
  

   }
   delete(){
     this.service.deleteUser(this.id).subscribe((res)=>{
       
        


       
     })
     this.servicemodal.dismissAll()
         this.getAllUser()
   }

   getAllUser(){
    this.service.getUsers(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     this.data = res
   })
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
       this.role = res.role
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
   let user = new UserUpdate (this.id,this.username,this.password,this.email,this.role);
   this.service.updateUser(user).subscribe((res)=>{
   
       this.getAllUser()
       this.servicemodal.dismissAll()
       this.toastr.success('Update User with success','Update User')

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
    this.toastr.success('Add User with success','Add User')
    
  })    
}




 
  

  }


