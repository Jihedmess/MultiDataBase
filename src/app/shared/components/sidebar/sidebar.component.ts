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
  databasename :any
  constructor(private service:DatasourceService) { }
   
  ngOnInit(): void {
    this.service.database.subscribe((res)=>{
      this.database = res
    })
   console.log("teste la valeur database")
    console.log(this.database)
    console.log("teste la valeur databasename")
    console.log(this.databasename)
    this.databasename = localStorage.getItem("DataBasename")

    this.username = localStorage.getItem("username")
    this.email = localStorage.getItem("email")
    this.role = localStorage.getItem("role")
  }

}
