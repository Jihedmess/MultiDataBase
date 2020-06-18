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
  closeResult: string;
  id_delete :any
  name:any
  description :any
  url:any
  id_update :any
 



  constructor(private service:UserService, private route: ActivatedRoute , private router :Router ,private dataservice:DatasourceService
    ,private toastr: ToastrService,private servicemodal :NgbModal) { }

  ngOnInit(): void {
 
    
    this.getAllfonctionalite()
    
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


  getAllfonctionalite(){
    this.service.getFonct1(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     this.data = res
   })
   }
   

   onSubmit(form: NgForm) {
    console.log('test la valeur du champ description ')
    console.log(form.value.description)
    let fonct = new Fonctionalite(form.value.name,form.value.description, this.file1, this.file2, this.file3,form.value.url);
    console.log(form.value)
    this.service.savefonct1(fonct,localStorage.getItem('currentUser')).subscribe((res=>{
      this.getAllfonctionalite()
      
    }))
    this.servicemodal.dismissAll()
    this.toastr.success('Add fonctionzlité with success','Add Fonctionalité')
       
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


openDelete(content ,item ) {
    
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
    let fonct = new FonctionaliteUpdate(this.id_update,form.value.name,form.value.description, this.file1, this.file2, this.file3,form.value.url);
    console.log(form.value)
    this.service.updateFonct(fonct,localStorage.getItem('currentUser')).subscribe((res=>{ 
      this.getAllfonctionalite()
      
     
    }))
    this.getAllfonctionalite()
    this.servicemodal.dismissAll()
    this.toastr.success('Update fonctionzlité with success','Update Fonctionalité')
   }
   Supprimer(){
     this.service.deleteFonct(this.id_delete,localStorage.getItem('currentUser')).subscribe((res)=>{
      this.getAllfonctionalite()
     })
     this.servicemodal.dismissAll()
     this.getAllfonctionalite()
   }

   
}
