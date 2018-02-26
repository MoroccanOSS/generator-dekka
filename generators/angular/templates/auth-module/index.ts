import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {Proxy} from './Proxy';
import {Authenticate} from './Authenticate';
import {LocalStorageStrategy} from './LocalStorageStrategy';

@NgModule({
  imports: [HttpModule],
  providers: [Proxy,
    {
      provide: Authenticate,
      useFactory: AuthStrategy,
      deps: [Proxy],
    }
  ]
})
export class AuthModule {}

export function AuthStrategy(http: Proxy){
  return new Authenticate(http, new LocalStorageStrategy());
}
