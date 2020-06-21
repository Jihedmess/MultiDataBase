import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasourceService} from '../../service/datasource.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataSource} from '../../service/Datasource';
import {DataSourceupdate} from '../../service/Datasourceupdate'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   listDataSource :any
   closeResult: string;
   url :any
   password :any
   user :any
   name:any
   platform :any
   idupadate:any
   urlupdate :any
   passwordupdate :any
   userupdate :any
   platformupdate :any
   nameupdate:any
   disabled_button = true
   selectePlateforme:any
   is_data_arrived = false
   nameupdatenotif :any
   data_arrived = false
   
  constructor(private service:DatasourceService , private servicemodal :NgbModal,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllDataSource()
  }
  

  getAllDataSource(){
    this.listDataSource = null
  this.data_arrived = false
    console.log(localStorage.getItem('currentUser').valueOf())
    this.service.getDataSources(localStorage.getItem('currentUser').valueOf()).subscribe((res)=>{
    this.listDataSource =res
    this.data_arrived = true
    })
  }


  delete(id:any){
  
  
    this.service.deleteDataSources(this.idupadate,localStorage.getItem('currentUser').valueOf()).subscribe((res)=>{
     if(res){this.getAllDataSource()} 
     this.getAllDataSource()
    })
    
    this.servicemodal.dismissAll()
 
  

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
onSubmit(form: NgForm){
  this.listDataSource = null
  this.data_arrived = false
  console.log(form.value)
  
  if(form.value.selectePlateforme == 1){
    this.selectePlateforme = "com.mysql.jdbc.Driver"
  }
  if(form.value.selectePlateforme == 2){
    this.selectePlateforme = "org.postgresql.Driver"
  }
  
  
  let datasource = new DataSource(form.value.url,form.value.user,form.value.password,this.selectePlateforme,form.value.name)
  this.service.saveDataSource(datasource,localStorage.getItem('currentUser')).subscribe((res)=>{
    this.data_arrived = true
    this.getAllDataSource()
  })
  this.toastr.success('Add Enveronnement'+form.value.name +' with success','Add Enveronnement')
  this.servicemodal.dismissAll()
  

}



UpdateAddDatasource(content,id ,name){
 
  this.idupadate=id
  this.nameupdatenotif = name
  this.service.getDataSourcebyId(id,localStorage.getItem('currentUser')).subscribe((res)=>{
    console.log(res)
    this.urlupdate=res.url
    this.userupdate=res.user
    this.nameupdate = res.name
    this.passwordupdate = res.password
    if(res.platform == "com.mysql.jdbc.Driver") this.platformupdate = 1
    if(res.platform == "org.postgresql.Driver") this.platformupdate = 2
console.log("test la valeur de la plateforme")
console.log(res.platform)
    console.log(this.platformupdate)
    
  })
  
  this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title-update'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


updateDatsource(){
  
  
  let datasource = new DataSourceupdate(this.idupadate,this.urlupdate,this.userupdate,this.passwordupdate,this.platformupdate,this.nameupdate);
  this.service.updateDataSource(datasource,localStorage.getItem('currentUser')).subscribe((res)=>{
    
    this.getAllDataSource()
  })
  this.servicemodal.dismissAll()
 
  this.toastr.success('Update Enveronnement '+this.nameupdate+' with success','Update Enveronnement')
}


connect(item){
  localStorage.setItem('IdDataBase',item.id);
 this.service.changevalue(item.name)
  this.router.navigate(['/home/fonctionnalites']);
  
}
}
