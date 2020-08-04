import { Injectable } from '@angular/core';
import {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot,Router,Params} from '@angular/router';
import {Email} from './models/Email.models'
import { EmailService } from './services/email.service';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class FolderResolverService implements Resolve<Email[]> {
category : Email[] ;
 constructor(private emailService:EmailService,
    private router: Router) { }
  resolve(route:ActivatedRouteSnapshot,state: RouterStateSnapshot)
  {
  return this.emailService.getCategory(route.params.category);
//console.log(this.category);*/
  }

 
  /*
 getCategory(category)
 {
    //retuen this.
    return this.emailService.getCategory(category).subscribe((data)=>{
      this.category =data;
        })
 }*/
 
}

