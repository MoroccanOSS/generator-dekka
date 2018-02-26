import {Injectable} from "@angular/core";
import {Proxy} from './Proxy';
import {AuthStrategy} from './AuthStrategy';
import {Observable} from 'rxjs';

@Injectable()
export class LocalStorageStrategy implements AuthStrategy{
  constructor() {}

  load(): string{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token;
  }
  save(user: any, token: string): Observable<any> {
    const obj = {token, ...user}
    localStorage.setItem('currentUser', JSON.stringify(obj));
    return Observable.of(obj);
  }

  destroy(): Observable<any> {
    localStorage.removeItem('currentUser');
    return Observable.of(true);
  }
  retriveCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
