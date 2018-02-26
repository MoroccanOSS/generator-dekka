import {Injectable} from "@angular/core";
import {Proxy} from './Proxy';
import {Headers} from "@angular/http"
import {AuthStrategy} from './AuthStrategy';
import {Observable} from 'rxjs';

export class Authenticate {
  public token: string;

  constructor(private Proxy: Proxy, private authStrategy: AuthStrategy) {
    this.Proxy.token = this.authStrategy.load();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.Proxy.post('login', {username: username, password: password})
      .switchMap((response) => {
        const token = response.headers && response.headers.get('Authorization');
        if (token) {
          this.token = token.slice('Bearer '.length);
          this.Proxy.token = this.token;
          return this.authStrategy.save(response.json(), this.token);
        } else {
          return Observable.of(false);
        }
      });
  }

  logout(): Observable<any> {
    this.Proxy.token = null;
    return this.authStrategy.destroy();
  }

  retriveUser(): any {
    return this.authStrategy.retriveCurrentUser();
  }
  save({token,...user}){
    this.authStrategy.save(user,token)
  }

}
