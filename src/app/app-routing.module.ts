//<!-- app-routing.module.ts -->
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/page4', pathMatch: 'full'},
  { path: 'page1', component:Page1Component},
  { path: 'page2', component:Page2Component},
  { path: 'page3', component:Page3Component, canActivate: [AuthGuard]},
  { path: 'page4', component:Page4Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
