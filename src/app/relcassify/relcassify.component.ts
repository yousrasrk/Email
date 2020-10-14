import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import {Email} from '../models/Email.models';

@Component({
  selector: 'app-relcassify',
  templateUrl: './relcassify.component.html',
  styleUrls: ['./relcassify.component.css']
})
export class RelcassifyComponent implements OnInit {
  emails:Email[]
  length:number
  folder:string
  constructor(
    private EmailService:EmailService
  ) { }
//emails sent for reclassification == that contain filter ==1
  ngOnInit(): void {
    this.EmailService.getFilter()
    .subscribe
    ((data: Email[]) => {
    this.emails=data
    this.emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    this.emails.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    this.length=this.emails.length
    this.folder="Reclassify"
      });

      
  }

}
