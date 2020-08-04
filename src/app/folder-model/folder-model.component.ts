import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from '../services/email.service'
import { Router, RouterModule } from '@angular/router';
import {Email} from '../models/Email.models';
import {ObjDictionary} from '../models/Dictionary.models';
import {Label} from '../models/Label.models';


@Component({
  selector: 'app-folder-model',
  templateUrl: './folder-model.component.html',
  styleUrls: ['./folder-model.component.css']
})
export class FolderModelComponent implements OnInit {



  @Input()id:number;
  @Input()sender:string;
  @Input()category:ObjDictionary;
  @Input()content:string;
  @Input()files:string;
  @Input()object:string;
  @Input()categoryProduct:string;
  @Input()labelP:Label;
  @Input()labelI:Label;
  @Input()folder:String;

  emails:Email[];
  constructor(private emailService :EmailService,
    private router:Router) { }

  ngOnInit(): void {
    //this.emailService.getAPIData().subscribe(data => this.emails=data['emails'] );
  }
  getGategory()
  {
   return  this.category;
  }
  NavigateToEmail()
  {
    this.router.navigate(['/emails',this.id]);
  }

  /*get1()
  {
    this.apiservice. classify((  (obj2:Email[])=>
    {
      this.emails=obj2
    }));
  }
*/
}