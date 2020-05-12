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
   platform :any
   idupadate:any
   urlupdate :any
   passwordupdate :any
   userupdate :any
   platformupdate :any
  constructor(private service:DatasourceService , private servicemodal :NgbModal,private router:Router) { }

  ngOnInit(): void {
    this.getAllDataSource()
  }
  

  getAllDataSource(){
    this.service.getDataSources().subscribe((res)=>{
    this.listDataSource =res
    })
  }


  delete(id:any){
    this.service.deleteDataSources(id).subscribe((res)=>{
      if(res){
        
        this.getAllDataSource()

      }
      this.getAllDataSource()
    })
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
  let datasource = new DataSource(this.url,this.user,this.password,this.platform)
  this.service.saveDataSource(datasource).subscribe((res)=>{
    if(res){
      this.servicemodal.dismissAll()
      this.getAllDataSource()
    }
  })
}



UpdateAddDatasource(content,id){
  this.idupadate=id
  this.service.getDataSourcebyId(id).subscribe((res)=>{
    
    this.urlupdate=res.url
    this.userupdate=res.user
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
  let datasource = new DataSourceupdate(this.idupadate,this.urlupdate,this.userupdate,this.passwordupdate,this.platformupdate);
  this.service.updateDataSource(datasource).subscribe((res)=>{
    if(res){
      this.getAllDataSource()
      this.servicemodal.dismissAll()
    }
  })
}


connect(url){
  this.router.navigate(['/home/fonctionnalites/'+url]);
}
}
