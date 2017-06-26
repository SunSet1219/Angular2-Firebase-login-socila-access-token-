import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { GithubComponent } from './github/github.component';
import { GitlabComponent } from './gitlab/gitlab.component';
import { BitbucketComponent } from './bitbucket/bitbucket.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'github', component: GithubComponent, canActivate: [AuthGuard] },
    { path: 'gitlab', component: GitlabComponent, canActivate: [AuthGuard] },
    { path: 'bitbucket', component: BitbucketComponent, canActivate: [AuthGuard] }


]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);