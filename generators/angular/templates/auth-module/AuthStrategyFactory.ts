import {Proxy} from "./Proxy";
import {Authenticate} from "./Authenticate";
import {LocalStorageStrategy} from "./LocalStorageStrategy";
import {VolatileStrategy} from "./VolatileStrategy";

const Factory = (type: string) => {
  switch (type){
    case 'storage':
      return (http: Proxy) => new Authenticate(http, new LocalStorageStrategy());
    case 'volatile':
      return (http: Proxy) => new Authenticate(http, new VolatileStrategy());
  }
}
