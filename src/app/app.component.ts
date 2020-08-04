import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient,HttpResponse,HttpRequest } from '@angular/common/http';
import { Observable, of, pipe, from } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http'; 
import {  throwError } from 'rxjs';
import {  retry } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import{FormGroup,FormControl, RequiredValidator} from "@angular/forms"
import{Label} from './models/Label.models';
import{Taxonomy} from './models/Taxonomy.models';
import{Dictionary,ObjDictionary} from './models/Dictionary.models';
import{EmailApi} from './models/EmailApi.models';
import{Taxonomy1} from './models/Taxonomy1.models';
import {ApiService} from './api.service';
import{Email} from './models/Email.models'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    public http:HttpClient, public apiservice:ApiService,
     )
  {
    
    
}
  title = 'email';
  ngOnInit()
  {
   
      
    }
  

 


}




