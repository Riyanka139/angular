import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { ServersService } from '../servers.service';
interface Server{
    id: number;
    name:string;
    status:string;
}

@Injectable()
export class ServerResolver implements Resolve<Server>{
    constructor(private serverService:ServersService){}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<Server> | Promise<Server> | Server{
        return this.serverService.getServer(+route.params['id'])
    }
}