import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.component.html',
  styleUrls: ['./gitlab.component.css'],
   animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class GitlabComponent implements OnInit {
  name: any;
  state: string = '';
  result:any;
  access_token:string = '';
  code:string = '';
  userid:any;
   private client_id = '920c164df2b8551b4441ec856acb3c45c1d72649cbe3abc305a3366bc81c5f0b';
  private client_secret = '99618f55f959107574fb69643704420472de43f7684fb58b56dd07c02791fee7';
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
    const bodyString = `client_id=${this.client_id}&client_secret=${this.client_secret}&code=${this.code}&grant_type=authorization_code&redirect_uri=http://localhost:4200/gitlab`;
    console.log(bodyString);
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    const url = 'http://gitlab.com/oauth/token';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com'
    this.af.database.object('users/'+this.userid+'/gitlab_token').set(this.code);
    this._http
      .post(`${url}`, bodyString,options)
      .toPromise()
      .then(data =>{ 
              console.log('hey getting data', data)
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
