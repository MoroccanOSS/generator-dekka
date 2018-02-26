import {Observable} from 'rxjs/Observable';

export interface AuthStrategy {
  save(user: any, token: string): Observable<any>;
  destroy(): Observable<any>;
  load(): string;
  retriveCurrentUser(): any;
}
