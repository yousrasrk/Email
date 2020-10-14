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
import {ApiService} from './api.service'
import "isomorphic-fetch"
import { forkJoin } from 'rxjs';
export class FileNode {
  children: FileNode[];
  name:string;
  notif:number
}
@Injectable({
  providedIn: 'root'
})

export class ClassificationService {
  constructor(private emailService:EmailService,
    private _http:HttpClient ,
    private api:ApiService) { }
    readonly API_LABEL:string="http://localhost:3000/Classification";

    emails:Email[]
    classification:FileNode[]

  /*addEmail(Email:Email)
  {

  }
*/
  getData(): Observable<any> {
    const response1 = this.emailService.getEmailsData()
    const response2 = this._http.get<FileNode[]>(this.API_LABEL);
    return forkJoin([response1, response2]);
}
   
  checkSubLabels()
  {
    this.getData()

    .subscribe(res => {
      this.emails = res[0] as Email[];
      this.classification = res[1];
      for(let i in this.emails)
{
        if(this.emails[i].category== null)
        {  this.emails[i].category=new ObjDictionary({});

           this.api.getClassification(this.emails[i],(obj1:Email)=>
           {
            this.emails[i]=obj1
         
             this.emailService.update(this.emails[i]);
             //check if labels exist in  tree
              //check Product
             // if(  data[0].children.find(FileNode => FileNode.name==s1))
              //check//Issue
  
           })
        }
      }
         
    }, err => {
      console.log(err);
      
    });
    }
  
}