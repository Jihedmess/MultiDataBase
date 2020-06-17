import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DatasourceService } from 'src/app/service/datasource.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Fonctionalite} from '../../service/fonctionalite'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
      console.log(res)
      if(res){
        this.toastr.success('Add fonctionzlité with success','Add Fonctionalité')
        this.getAllfonctionalite()

      }
    }))
}
  
openAddDatasource(content ) {
    
  
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
    let fonct = new Fonctionalite(form.value.name,form.value.description, this.file1, this.file2, this.file3,form.value.url);
    console.log(form.value)
    this.service.updateFonct(fonct,localStorage.getItem('currentUser')).subscribe((res=>{
      console.log(res)
      if(res){
        
        this.getAllfonctionalite()

      }
    }))
   }
   Supprimer(item){
     this.service.deleteFonct(item,localStorage.getItem('currentUser')).subscribe((res)=>{
       
       this.getAllfonctionalite()
     })
   }

   
}
