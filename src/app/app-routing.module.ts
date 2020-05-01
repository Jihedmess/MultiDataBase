import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './modules/users/users.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import {AuthGuard} from '../app/auth.guard';
import { FonctionnalitesComponent } from './modules/fonctionnalites/fonctionnalites.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  }
  ,{
  path : 'home',
  component: DefaultComponent,
  children : [{
    path: 'environnements', 
    component: DashboardComponent , canActivate:[AuthGuard]},
    {
      path:'addfonct',
      component: PostsComponent ,canActivate:[AuthGuard]
    
   },
   {
     path:'fonctionnalites',
     component: FonctionnalitesComponent, canActivate:[AuthGuard]
   },
    {
      path:'users',
      component: UsersComponent,canActivate:[AuthGuard]

    },
        {path: 'addUser',
        component:AddUserComponent ,canActivate:[AuthGuard]
      },
    {
      path:'updateUser/:id',
      component: UpdateUserComponent ,canActivate:[AuthGuard]
    }]
    

 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
