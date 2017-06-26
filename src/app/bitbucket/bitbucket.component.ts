import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-bitbucket',
  templateUrl: './bitbucket.component.html',
  styleUrls: ['./bitbucket.component.css'],
   animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class BitbucketComponent implements OnInit {
  name: any;
  state: string = '';
  result:any;
  access_token:string = '';
  code:string = '';
  userid:any;
  
  private client_id = 'Yy5KeJYpenUDsGBDkn';
  private client_secret = 'cpByZT537yfjEmP4qzs3Dt5JySXnEcRg';
  constructor(public af: AngularFire,private router: Router,private _http:Http) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this.userid = auth.uid;
      }
     
    });
     
     this.access_token = location.href.split('#')[1].split('&')[0].split('=')[1];
     this.af.database.object('users/'+this.userid+'/bitbucket_token').set(this.access_token);
    
   }
logout(){
     this.router.navigateByUrl('/members');
   }
  ngOnInit() {
  }

}
