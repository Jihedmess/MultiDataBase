import { Component, OnInit } from '@angular/core';
import {Fonctionalite} from '../../service/fonctionalite'
import {UserService} from '../../service/user.service'
import { ActivatedRoute ,Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  id:any
  name:any
  description:any
  file1:any
  file2:any
  file3:any
  url:any
  constructor(private service:UserService,private route: ActivatedRoute , private router :Router ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['url'];
    console.log(this.url)
  }

  onFileSelected1(event) {
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
       this.file1 = event.target.files[0].name
     }
   }

   onFileSelected2(event) {
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
       this.file2 = event.target.files[0].name;
     }
   }

   onFileSelected3(event) {
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
       this.file3 = event.target.files[0].name
     }
   }

   addFonctionalite(){
     let fonct = new Fonctionalite(this.name,this.description,this.file1,this.file2,this.file3,this.url);
    
       
     this.service.savefonct1(fonct,localStorage.getItem('currentUser')).subscribe((res=>{
       console.log(res)
     }))
    
   
    }

    onSubmit(form: NgForm) {
      let fonct = new Fonctionalite(form.value.name,form.value.description,form.value.file1,form.value.file2,form.value.file3,form.value.url);
      console.log(form.value)
      this.service.savefonct1(fonct,localStorage.getItem('currentUser')).subscribe((res=>{
        console.log(res)
        if(res){
          this.toastr.success('Add fonctionzlité with success','Add Fonctionalité')
        }
      }))
  }
}
