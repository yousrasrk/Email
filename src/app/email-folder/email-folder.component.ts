import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute,Router ,Params} from '@angular/router';
import {Email} from '../models/Email.models';
import { Observable, of, pipe, from, observable ,Subject} from 'rxjs';
import { pluck } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import { map ,switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

import{NavTreeComponent} from '../nav-tree/nav-tree.component'

export class FileNode {
  children: FileNode[];

  name:string;
  notif:number
}
@Component({
  selector: 'app-email-folder',
  templateUrl: './email-folder.component.html',
  styleUrls: ['./email-folder.component.css']
})
export class EmailFolderComponent implements OnInit  {
  previousUrl: string;
  constructor(private route:ActivatedRoute, private EmailService:EmailService,private router:Router,) 
    {}
  
private subscription: Subscription;
private refreshemail=new Subject<void>();//for refresh
emails:Email[] 
folder:string=""
length:number=0;

//get email list 

    ngOnInit(): void {
      this.EmailService.refreshemail.subscribe(()=>{
         this.getData()
      });
        this.getData();
    }
  
   getData()//get emails based on folder
   {
      //get emails
      this.route.paramMap.subscribe(params => { 
       this.EmailService.getFolder(params.get('name')).subscribe(
      (data:Email[])=>
      {
        this.folder = params.get('name'); 
        this.emails=data;
        this.emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())//sort base on date of post
        this.emails.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())//sort bse on date of latet update
      });  
      });
  }
}
