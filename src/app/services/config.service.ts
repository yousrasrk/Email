import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Dictionary,ObjDictionary} from '../models/Dictionary.models';
import{Label} from '../models/Label.models';
import {Email} from '../models/Email.models'
import{ApiService} from './api.service'
import {ClassificationService} from './classification.service'

@Injectable()
export class ConfigService {
  private appConfig:any;
  private classification:any;
  url="http://109.135.0.135/cc_demo/classifyEmail";

  constructor(private _http: HttpClient,
    private api:ClassificationService) { }

  loadConfig()//loading before the app initilize
  {
    // return this.api.checkSubLabels();
     /*this._http.get('http://localhost:3000/emails')
     .toPromise()
     .then(res=>{
       this.appConfig=res;
       console.log(res);
       //this.getClassification(" ")
     })

     */
  }

  loadEmails()//loading before the app initilize
  {
     return this._http.get('http://localhost:3000/emails')
     .toPromise()
     .then(res=>{
       this.appConfig=res;
     })
  }



  
  

 


       
}
