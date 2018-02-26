import {Injectable} from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, ResponseContentType } from '@angular/http';
import {environment} from '../../environments/environment';
import { ResponseType } from '@angular/http/src/enums';

@Injectable()
export class Proxy {
  constructor(private http: Http) {
  }

  private _token: string;

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  AuthorizationHeader(headers: Headers) {
    headers.set('Authorization', this._token);
    headers.set('Content-Type', 'application/json; charset=UTF-8');
  }

  get (uri, headers?:any) {
    const RequiredHeaders = new Headers();
    this._token && this.AuthorizationHeader(RequiredHeaders);
    this.mutateHeaders(RequiredHeaders, headers)
    return this.http.get(`${environment.apiEndpoint}/${uri}`, new RequestOptions({
      method: RequestMethod.Get,
      headers: RequiredHeaders
    })).map((e) => e.json());
  }

  getBlob (uri, headers?:any) {
    const RequiredHeaders = new Headers();
    this._token && this.AuthorizationHeader(RequiredHeaders);
    this.mutateHeaders(RequiredHeaders, headers)
    return this.http.get(`${environment.apiEndpoint}/${uri}`, {
      headers: RequiredHeaders,
      responseType: ResponseContentType.Blob
    });
  }

  post(uri, data: any, headers?: any) {
    const RequiredHeaders = new Headers();
    this._token && this.AuthorizationHeader(RequiredHeaders);
    this.mutateHeaders(RequiredHeaders, headers)
    return this.http.post(`${environment.apiEndpoint}/${uri}`, data, {
      headers: RequiredHeaders
    });
  }
  private mutateHeaders(oldheader:Headers,newheader:any){
    if (newheader) {
      Object.keys(newheader).forEach((e) => {
        oldheader.delete(e)
        oldheader.set(e, newheader[e])
      });
    }
  }
  put(uri, data: any, headers?:any) {
    const RequiredHeaders = new Headers();
    this._token && this.AuthorizationHeader(RequiredHeaders);
    this.mutateHeaders(RequiredHeaders, headers)
    return this.http.put(`${environment.apiEndpoint}/${uri}`, data, {
      headers: Object.assign(RequiredHeaders, headers)
    });
  }
  delete(uri, headers?:any) {
    const RequiredHeaders = new Headers();
    this._token && this.AuthorizationHeader(RequiredHeaders);
    this.mutateHeaders(RequiredHeaders, headers)
    return this.http.delete(`${environment.apiEndpoint}/${uri}`, {
      headers: Object.assign(RequiredHeaders, headers)
    });
  }

}
