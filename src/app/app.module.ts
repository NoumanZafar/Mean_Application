import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
//import here
import { RouterModule, Routes } from '@angular/router';
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
  MatDividerModule, MatSnackBarModule, MatPaginatorModule
} from '@angular/material';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CreatUsersComponent } from './components/creat-users/creat-users.component';
import { AuthenticationGuard } from './authentication.guard';

//create the routes
const routes: Routes = [
  { path: 'create', component: CreateComponent,canActivate:[AuthenticationGuard] },
  { path: 'edit/:id', component: EditComponent,canActivate:[AuthenticationGuard] },
  { path: 'list', component: ListComponent,canActivate:[AuthenticationGuard] },
  {path:'login/register',component:CreatUsersComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,
    CreatUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //import the route here
    RouterModule.forRoot(routes),
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [StudentService,AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
