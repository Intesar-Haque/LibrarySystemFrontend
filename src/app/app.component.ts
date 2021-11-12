import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public http: HttpClient){}
  ngOnInit() {
    console.log('Checking if logged in');
    if (!this.isLoggedIn()){
      console.log('Logging in');
      this.login();
    }
  }

  login() {
    const params = new HttpParams().set('username', 'DSAfsheen').set('password', 'bKash123').set('grant_type', 'password');
    const headers = {Authorization: `Basic ${btoa('client:secret')}`, 'Content-type': 'application/x-www-form-urlencoded'};
    this.http.post('http://192.168.1.252:8003/oauth/token', params, {headers}).subscribe(
      data => this.setSession(data),
      err => console.log(err));
  }
  public setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_at);
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
