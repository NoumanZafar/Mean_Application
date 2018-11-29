import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
/**
 * Import the angular animation
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Import the componenets and services used in the applications
 */
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { CreatUsersComponent } from './components/creat-users/creat-users.component';
import { StudentService } from './student.service';

/**
 * Import the rounting module to navigate between pages
 */
import { RouterModule, Routes } from '@angular/router';

/**
 * Import the angular material
 */
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
  MatDividerModule, MatSnackBarModule, MatPaginatorModule,MatSortModule
} from '@angular/material';

/**
 * Http client and Guards to navigate and safely navigate in the application
 */
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './authentication.guard'; 

/**
 * Create the routes
 */
const routes: Routes = [
  { path: 'create', component: CreateComponent,canActivate:[AuthenticationGuard] },//Authentication is required
  { path: 'edit/:id', component: EditComponent,canActivate:[AuthenticationGuard] },//Authentication is required
  { path: 'list', component: ListComponent,canActivate:[AuthenticationGuard] },//Authentication is required
  {path:'login/register',component:CreatUsersComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }//if no path is entered Bring to login page
];

@NgModule({
  declarations: [
    /**
     * Add the components 
     */
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,
    CreatUsersComponent
  ],
  imports: [
    /**
     * Import the modules and components.
     * Or Angular material Modules in order to use in the application
     */
    BrowserModule,
    BrowserAnimationsModule,
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
    MatPaginatorModule,
    MatSortModule
  ],

  /**
   * Bootstrap and providers (Services and Guards)
   */
  providers: [StudentService,AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
