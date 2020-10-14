import {  Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Email} from '../models/Email.models'
import { EmailService } from '../services/email.service';
import {ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import { Observable} from 'rxjs';

@Injectable()
export class SingleEmailResolve implements Resolve<Email> {

  constructor(private emailService:EmailService) { }

  resolve(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Email> 
    {
      return this.emailService.getEmail((route.params.id))
    }

}
