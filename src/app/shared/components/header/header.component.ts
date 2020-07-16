import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  logout(){
    
      localStorage.removeItem('currentUser');
      localStorage.removeItem('IdDataBase');
      localStorage.removeItem('NameDataBase');
      localStorage.removeItem('role')
      localStorage.removeItem('email')
      localStorage.removeItem('username')
      localStorage.removeItem('DataBasename')
      this.router.navigate(['']);
  }

}
