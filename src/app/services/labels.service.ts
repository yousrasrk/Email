import { Injectable } from '@angular/core';
import {Email} from '../models/Email.models'
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import{Label} from '../models/Label.models';
import {  throwError } from 'rxjs';
import { Observable, of, pipe, from } from 'rxjs';
import { HttpHeaders, HttpParams ,HttpEvent,HttpEventType} from '@angular/common/http'; 
import {catchError, tap, map} from 'rxjs/operators';
import fetch from 'node-fetch';
import { EmailService } from '../services/email.service';

import "isomorphic-fetch"
import { forkJoin } from 'rxjs';
export class Node {
  children: Node[];
  name:string;
  notif:number
}
@Injectable({
  providedIn: 'root'
})
export class LabelsService {

 
  readonly API_LABEL:string="http://localhost:3000/Classification";
  constructor(private emailService:EmailService,private _http:HttpClient ) { }
  private handleError(error)
  {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side 
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side 
          errorMessage = `Error Code: ${error.status}\n message: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

  /* get labels */
  getLabels():Observable<Node[]>| null | undefined 
      {
         return this._http.get<Node[]>(this.API_LABEL)
         .pipe(
          tap(data => console.log(data)),
          catchError(this.handleError)
      );
      }
   /* post labels */


  /** get one sub label*/
  getNode(id:number):Observable<Node>
  {
     return this._http.get<Node>("http://localhost:3000/Classification/"+id)
     .pipe(
      tap(data => console.log('Allsublabels: ' +JSON.stringify(data))),
      catchError(this.handleError)
  );
  }

getNodeParent(name:string):Observable<Node>
      { 
        let httpParams = new HttpParams()
        .set('name', name);
        return this._http.get<Node>(this.API_LABEL,{params:httpParams})
      }
}


