import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { AddUserComponent } from 'src/app/modules/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UpdateUserComponent } from 'src/app/modules/update-user/update-user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostsComponent,
    DefaultComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    ToastrModule.forRoot()

  ]
})
export class DefaultModule { }
