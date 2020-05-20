import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DatasourceService } from 'src/app/service/datasource.service';
import {Request} from '../../service/request';
import { from } from 'rxjs';

@Component({
  selector: 'app-fonctionnalites',
  templateUrl: './fonctionnalites.component.html',
  styleUrls: ['./fonctionnalites.component.scss']
})
export class FonctionnalitesComponent implements OnInit {
  data=new Array
  url:any
  private sub: any;
  request_url:any;
  request_Driver:any;
  request_user:any;
  request_password:any;

  constructor(private service:UserService, private route: ActivatedRoute , private router :Router ,private dataservice:DatasourceService) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['url'];

    console.log(this.url)
    this.dataservice.getDataSourcebyId(this.url).subscribe((res=>{
      console.log("teste get database by id")
      console.log(res)
      this.request_url = res.url
      this.request_Driver = res.plateform
      this.request_password = res.password
      this.request_user = res.user
      let request = new Request(this.request_url,this.request_user,this.request_password,this.request_Driver)
      this.service.getfonctbyData(request).subscribe((res=>{
        console.log(res)
        this.data = res
      }))
    }))
  
    
    
  }

  getAllfonctionalite(){
    this.service.getFonct1().subscribe((res)=>{
      console.log(res)
     this.data = res
   })
   }
   AddFonctionalite(){
    this.router.navigate(['/home/addfonct/'+this.url]);
   }

}
