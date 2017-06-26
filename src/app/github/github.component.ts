import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class GithubComponent implements OnInit {

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
        this.userid = auth.uid;
      }
     
    });
    this.code = location.search.split('=')[1];
    const body = {
      client_id:this.client_id,
      client_secret :this.client_secret,
      code:this.code,
    };
    const bodyString = `code=${this.code}&client_id=${this.client_id}&client_secret=${this.client_secret}`;
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    const url = 'https://github.com/login/oauth/access_token';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com'

    this._http
      .post(`${proxyUrl}/${url}`, bodyString, options)
      .toPromise()
      .then(data =>{ 
              console.log('hey getting data', data.json()['access_token'])
              this.access_token = data.json()['access_token'];
              this.af.database.object('users/'+this.userid+'/github_token').set(data.json()['access_token']);
            })
      .catch(error => console.log('why', error));
  }
logout(){
     this.router.navigateByUrl('/members');
   }
  ngOnInit() {
  }

}
