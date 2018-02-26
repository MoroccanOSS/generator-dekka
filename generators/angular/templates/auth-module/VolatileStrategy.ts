import {AuthStrategy} from './AuthStrategy';
import {Observable} from 'rxjs/Observable';


export class VolatileStrategy implements AuthStrategy {
  constructor() {
  }

  load(): string {
    const currentUser = window['currentUser'];
    const token = currentUser && currentUser.token;
    return token;
  }

  save(user: any, token: string): Observable<any> {
    window['currentUser'] = {token,...user};
    return Observable.of(window['currentUser']);
  }

  destroy(): Observable<any> {
    window.location.reload();
    return null;
  }
  retriveCurrentUser(): any {
    return window["currentUser"];
  }
}
