import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasourceService} from '../../service/datasource.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataSource} from '../../service/Datasource'
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
  constructor(private service:DatasourceService , private servicemodal :NgbModal) { }

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
    })
  }
    

  open(content ) {
    
  
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
}
