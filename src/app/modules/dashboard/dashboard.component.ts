import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasourceService} from '../../service/datasource.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataSource} from '../../service/Datasource';
import {DataSourceupdate} from '../../service/Datasourceupdate'
import { Router } from '@angular/router';
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
  constructor(private service:DatasourceService , private servicemodal :NgbModal,private router:Router) { }

  ngOnInit(): void {
    this.getAllDataSource()
  }
  

  getAllDataSource(){
    console.log(localStorage.getItem('currentUser').valueOf())
    this.service.getDataSources(localStorage.getItem('currentUser').valueOf()).subscribe((res)=>{
    this.listDataSource =res
    })
  }


  delete(id:any){
    this.service.deleteDataSources(id,localStorage.getItem('currentUser').valueOf()).subscribe((res)=>{
      if(res){
        
      this.getAllDataSource()

      }
      
    })
    this.getAllDataSource()
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
add(){
  if(this.platform == 1){
    this.platform = "com.mysql.jdbc.Driver"
  }
  if(this.platform == 2){
    this.platform = "org.postgresql.Driver"
  }
  let datasource = new DataSource(this.url,this.user,this.password,this.platform,this.name)
  this.service.saveDataSource(datasource,localStorage.getItem('currentUser')).subscribe((res)=>{
    if(res){
      this.servicemodal.dismissAll()
      this.getAllDataSource()
    }
  })
}



UpdateAddDatasource(content,id){
  this.idupadate=id
  this.service.getDataSourcebyId(id,localStorage.getItem('currentUser')).subscribe((res)=>{
    
    this.urlupdate=res.url
    this.userupdate=res.user
    this.nameupdate = res.name
    this.passwordupdate = res.password
    this.platformupdate = res.platform
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
    if(res){
      this.getAllDataSource()
      this.servicemodal.dismissAll()
    }
  })
}


connect(url){
  this.router.navigate(['/home/fonctionnalites']);
}
}
