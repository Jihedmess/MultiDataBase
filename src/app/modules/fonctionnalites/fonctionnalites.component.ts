import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute ,Router } from '@angular/router';
@Component({
  selector: 'app-fonctionnalites',
  templateUrl: './fonctionnalites.component.html',
  styleUrls: ['./fonctionnalites.component.scss']
})
export class FonctionnalitesComponent implements OnInit {
  data=new Array
  url:any
  private sub: any;
  constructor(private service:UserService, private route: ActivatedRoute , private router :Router) { }

  ngOnInit(): void {
    this.url=this.route.snapshot.params['url'];

    console.log(this.url)
    if(this.url=="base1"){
     this.service.getFonct1().subscribe((res=>{
       this.data=res
     }))
    } else
    if(this.url=="base2"){
     this.service.getFonct2().subscribe((res=>{
       this.data = res
     }))
    }
    
    
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
