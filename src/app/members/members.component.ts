import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
  name: any;
  state: string = '';
  result:any;
  access_token:string = '';
  code:string = '';
  userid:any;
  
  private client_id = '002b48413bb8039722a1';
  private client_secret = 'd8a93aedc4dedb0f8b71dbbbe7a9359a5706cb33';
  constructor(public af: AngularFire,private router: Router,private _http:Http ) {    
    
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
       
      }
     
    });
    
    
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }
 
  ngOnInit() {
  }
}
