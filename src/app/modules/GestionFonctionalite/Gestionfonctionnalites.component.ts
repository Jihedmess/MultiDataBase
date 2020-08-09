import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DatasourceService } from 'src/app/service/datasource.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Fonctionalite} from '../../service/fonctionalite'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FonctionaliteUpdate } from 'src/app/service/fonctionaliteupdate';
@Component({
  selector: 'app-Gestionfonctionnalites',
  templateUrl: './Gestionfonctionnalites.component.html',
  styleUrls: ['./Gestionfonctionnalites.component.scss']
})
export class GestionFonctionnalitesComponent implements OnInit {
  data=new Array
  file1:any
  file2:any
  file3:any
  file1_string:any
  file2_string:any
  file3_string:any
  closeResult: string;
  id_delete :any
  name:any
  description :any
  url:any
  id_update :any
  data_arrived = false
 
name_delete:any


  constructor(private service:UserService, private route: ActivatedRoute , private router :Router ,private dataservice:DatasourceService
    ,private toastr: ToastrService,private servicemodal :NgbModal) { 
   
    }

  ngOnInit(): void {
 
    
    this.getAllfonctionalite()
    
  }

  onFileSelected1(event) {
    if(event.target.files.length > 0) 
     {
      
       this.file1 = event.target.files[0].name
     }

     var file: File = event.target.files[0];
var myReader: FileReader = new FileReader();
var fileType = event.target.parentElement.id;
let test;
myReader.onloadend =  (e)=> {
    //myReader.result is a String of the uploaded file
    
    this.file1_string = myReader.result;
    console.log(this.file1_string);
    //fileString = myReader.result would not work, 
    //because it is not in the scope of the callback
}



myReader.readAsText(file);


   }

   onFileSelected2(event) {
    if(event.target.files.length > 0) 
     {
       
       this.file2 = event.target.files[0].name;
     }

     var file: File = event.target.files[0];
var myReader: FileReader = new FileReader();
var fileType = event.target.parentElement.id;
myReader.onloadend =  (e) =>{
    //myReader.result is a String of the uploaded file
    console.log(myReader.result);
    console.log(myReader.result);
    this.file2_string = myReader.result
    //fileString = myReader.result would not work, 
    //because it is not in the scope of the callback
}

myReader.readAsText(file);
   }

   onFileSelected3(event) {
    if(event.target.files.length > 0) 
     {
      
       this.file3 = event.target.files[0].name
     }
     var file: File = event.target.files[0];
var myReader: FileReader = new FileReader();
var fileType = event.target.parentElement.id;
myReader.onloadend =  (e)=> {
    //myReader.result is a String of the uploaded file
    console.log(myReader.result);
    console.log(myReader.result);
    this.file3_string = myReader.result
    //fileString = myReader.result would not work, 
    //because it is not in the scope of the callback
}

myReader.readAsText(file);
   }


  getAllfonctionalite(){
    this.data_arrived = false
    this.service.getFonct1(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     this.data = res
     this.data_arrived = true
   })
   }
   

   onSubmit(form: NgForm) {
    console.log("teste1*******************************************************************")
    console.log(this.file1_string)
    console.log("teste1*******************************************************************")
    console.log(this.file2_string)
    console.log("teste1*******************************************************************")
    console.log(this.file3_string)

   
    let fonct = new Fonctionalite(form.value.name,form.value.description, this.file1, this.file2, this.file3,form.value.url,this.file1_string,this.file2_string,this.file3_string);
    console.log(form.value)
    this.service.savefonct1(fonct,localStorage.getItem('currentUser')).subscribe((res=>{
      this.getAllfonctionalite()
      
    }))
    this.servicemodal.dismissAll()
    this.toastr.success('Fonctionnalité '+ form.value.name +' ajoutée avec succès.','Fonctionnalité')
    
}
  
openAddDatasource(content ) {
    
  
  this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

openUpdateFonctionalite(content ,item ) {
    this.id_update = item
  this.service.getFoncbyId(item,localStorage.getItem('currentUser')).subscribe((res)=>{
    console.log("test api getFonct by id")
    console.log(res)
    this.name = res.name
    this.description = res.desscription
    this.url = res.url
    this.file1 =  res.fileActivation
    this.file2 = res.filaDesactivation
    this.file3 = res.fileChek
    
  })
  this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


openDelete(content ,item ,name ) {
    this.name_delete = name
  this.id_delete = item
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
  
   Modifier(form: NgForm){
    this.data_arrived = false
    let fonct = new FonctionaliteUpdate(this.id_update,form.value.name,form.value.description, this.file1, this.file2, this.file3,form.value.url);
    console.log(form.value)
    this.service.updateFonct(fonct,localStorage.getItem('currentUser')).subscribe((res=>{ 
      this.getAllfonctionalite()
      
     
    }))
    this.getAllfonctionalite()
    this.servicemodal.dismissAll()
    this.toastr.success('Fonctionnalité '+form.value.name +' modifiée avec succès.','Fonctionnalité')
   
   }
   Supprimer(){
    this.data_arrived = false
     this.service.deleteFonct(this.id_delete,localStorage.getItem('currentUser')).subscribe((res)=>{
      this.getAllfonctionalite()
     })
     this.servicemodal.dismissAll()
     this.getAllfonctionalite()
     this.toastr.success('Fonctionnalité supprimée avec succès.','Fonctionnalité')
   }

   onNavigate(item){
    window.open("http://"+item, '_blank');
   }


   changeListener($event): void {
    this.readThis($event.target);
}

readThis(inputValue: any): void {
var file: File = inputValue.files[0];
var myReader: FileReader = new FileReader();
var fileType = inputValue.parentElement.id;
myReader.onloadend = function (e) {
    //myReader.result is a String of the uploaded file
    console.log(myReader.result);
    console.log(myReader.result);
    //fileString = myReader.result would not work, 
    //because it is not in the scope of the callback
}

myReader.readAsText(file);
}
}
