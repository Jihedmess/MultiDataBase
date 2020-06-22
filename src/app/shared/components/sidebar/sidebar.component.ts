import { Component, OnInit } from '@angular/core';
import { DatasourceService } from 'src/app/service/datasource.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  database :any
  visible = false
  username:any
  email:any
  role:any
  constructor(private service:DatasourceService) { }
   
  ngOnInit(): void {
    this.service.database.subscribe((res)=>{
      this.database = res
    })
    this.username = localStorage.getItem("username")
    this.email = localStorage.getItem("email")
    this.role = localStorage.getItem("role")
  }

}
