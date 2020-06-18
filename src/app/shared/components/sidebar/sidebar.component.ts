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
  constructor(private service:DatasourceService) { }
   
  ngOnInit(): void {
    this.service.database.subscribe((res)=>{
      this.database = res
    })
  }

}
