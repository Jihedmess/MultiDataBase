import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DatasourceService } from 'src/app/service/datasource.service';
import {Request} from '../../service/request';
import { from } from 'rxjs';
import { SQLBody } from 'src/app/service/SQLBody';
import {ActivateDesactivite} from 'src/app/service/ActivateDesactivite'
import { ToastrService } from 'ngx-toastr';

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
  filtre:any


  constructor(private service:UserService, private route: ActivatedRoute ,
     private router :Router ,private dataservice:DatasourceService,private toastr: ToastrService) { }

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

  filtrevalue(){
    if(this.filtre == 1){
      this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
        let  sqlbody = new SQLBody(res.url,res.user,res.password,res.plateforme)
        
        this.dataservice.ChekSQLDataSource(sqlbody).subscribe((res)=>{
          console.log('test check datasource with fonct')
          console.log(res)
          this.data = res
        })
        
      })
    }else if(this.filtre == 1){
      this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
        let  sqlbody = new SQLBody(res.url,res.user,res.password,res.plateforme)
        
        this.dataservice.ChekSQLDataSource(sqlbody).subscribe((res)=>{
          console.log('test check datasource with fonct')
          console.log(res)
          for (let item of res){
            if(item.result == 1){
              this.data.push(item)
            }
          }
          
        })
        
      })
    }else {
      this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
        let  sqlbody = new SQLBody(res.url,res.user,res.password,res.plateforme)
        
        this.dataservice.ChekSQLDataSource(sqlbody).subscribe((res)=>{
          console.log('test check datasource with fonct')
          console.log(res)
          for (let item of res){
            if(item.result == 0){
              this.data.push(item)
            }
          }
        })
        
      })
    }
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


   UpdateSQLActivite(item1,item2){
    this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
      let   activateDesactivite = new ActivateDesactivite(res.url,res.user,res.password,res.plateforme,item1,item2)
      
      this.dataservice.UpdateSql(activateDesactivite).subscribe((res)=>{
        console.log('test update sql with fonct')
        console.log(res)
        this.data = res
      })
      this.toastr.success("fonctionnalité "+ item1 +"est activé avec succès" ,'Activé fonctionnalité')
      
    })
    

   }


   UpdateSQLDesactivite(item1,item2){
    this.dataservice.getDataSourcebyId(localStorage.getItem('IdDataBase'),localStorage.getItem('currentUser')).subscribe((res)=>{
     
      let   activateDesactivite = new ActivateDesactivite(res.url,res.user,res.password,res.plateforme,item1,item2)
      
      this.dataservice.UpdateSql(activateDesactivite).subscribe((res)=>{
        console.log('test update sql with fonct')
        console.log(res)
        this.data = res
      })
      this.toastr.success("fonctionnalité "+ item1 +"est désactivé avec succès" ,'Désactivé fonctionnalité')
      
    })
    

   }

   
}
