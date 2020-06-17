import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DatasourceService } from 'src/app/service/datasource.service';
import {Request} from '../../service/request';
import { from } from 'rxjs';
import { SQLBody } from 'src/app/service/SQLBody';
import {ActivateDesactivite} from 'src/app/service/ActivateDesactivite'

@Component({
  selector: 'app-fonctionnalites',
  templateUrl: './fonctionnalites.component.html',
  styleUrls: ['./fonctionnalites.component.scss']
})
export class FonctionnalitesComponent implements OnInit {
  data=new Array
  url:any
  search='';
  private sub: any;
  request_url:any;
  request_Driver:any;
  request_user:any;
  request_password:any;
  id_base :any


  constructor(private service:UserService, private route: ActivatedRoute , private router :Router ,private dataservice:DatasourceService) { }

  ngOnInit(): void {
    this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
      let  sqlbody = new SQLBody(res.url,res.user,res.password,res.plateforme)
      
      this.dataservice.ChekSQLDataSource(sqlbody).subscribe((res)=>{
        console.log('test check datasource with fonct')
        console.log(res)
        this.data = res
      })
      
    })
    
    //this.getAllfonctionalite()
    
  }

  getAllfonctionalite(){
    this.service.getFonct1(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     this.data = res
   })
   }
   AddFonctionalite(){
    this.router.navigate(['/home/addfonct/'+this.url]);
   }


   UpdateSQL(item1,item2){
    this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
      let   activateDesactivite = new ActivateDesactivite(res.url,res.user,res.password,res.plateforme,item1,item2)
      
      this.dataservice.UpdateSql(activateDesactivite).subscribe((res)=>{
        console.log('test update sql with fonct')
        console.log(res)
        this.data = res
      })
      
    })
    

   }

   
}
