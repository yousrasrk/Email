import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from '../services/email.service'
import { Router, RouterModule } from '@angular/router';
import {Email} from '../models/Email.models';
import { ObjDictionary } from '../models/Dictionary.models';
import {Label} from '../models/Label.models'
import {Filter} from '../models/Filter.models'

@Component({
  selector: 'app-email-model',
  templateUrl: './email-model.component.html',
  styleUrls: ['./email-model.component.css']
})
export class EmailModelComponent implements OnInit {
  @Input()id:number;
  @Input()sender:string;
  @Input()category:ObjDictionary;
  @Input()content:string;
  @Input()files:string;
  @Input()object:string;
  @Input()categoryProduct:string="Product";
  @Input()labelP:Label;
  @Input()firstName:string;
  @Input()lastName:string;
  @Input()filter:Filter;
  @Input()folder:string;
  @Input()email:Email;

  emails:Email[];
  constructor(private emailService :EmailService,
    private router:Router) { }

  ngOnInit(): void {
    //this.emailService.getAPIData().subscribe(data => this.emails=data['emails'] );
  }
  getGategory(s:string)
  {
   return  s=="Inbox";
  }
  NavigateToEmail()
  {
    this.router.navigate(['/emails',this.id]);
  }

  
}
