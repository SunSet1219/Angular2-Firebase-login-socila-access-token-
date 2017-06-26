import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { GithubComponent } from './github/github.component';
import { GitlabComponent } from './gitlab/gitlab.component';
import { BitbucketComponent } from './bitbucket/bitbucket.component';


// Must export the config
export const firebaseConfig = {
  
  apiKey: "AIzaSyDGR9vT-rudgoRVs9qBjgbgkuFAGl5zAEA",
    authDomain: "auth-fa8a7.firebaseapp.com",
    databaseURL: "https://auth-fa8a7.firebaseio.com",
    projectId: "auth-fa8a7",
    storageBucket: "auth-fa8a7.appspot.com",
    messagingSenderId: "1073751426333"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    GithubComponent,
    GitlabComponent,
    BitbucketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
