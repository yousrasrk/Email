import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmailService } from './services/email.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MailFolderComponent } from './mail-folder/mail-folder.component';
import { EmailComponent } from './email/email.component';
import { EmailModelComponent } from './email-model/email-model.component';
import { SingleEmailComponent } from './single-email/single-email.component';
import { NewEmailComponent } from './new-email/new-email.component';
//import {FolderResolverService} from './folder-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTreeModule } from '@angular/material/tree';  
import {ApiService} from './api.service';
import { ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { SentDraftEmailComponent } from './sent-draft-email/sent-draft-email.component';

import { DraftComponent } from './draft/draft.component';
import { SingleDraftComponent } from './single-draft/single-draft.component';
import { TrashComponent } from './trash/trash.component';
import { NewEmail2Component } from './new-email2/new-email2.component';
import { NavTreeComponent } from './nav-tree/nav-tree.component';
import { FolderModelComponent } from './folder-model/folder-model.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MailFolderComponent,
    EmailComponent,
    EmailModelComponent,
    SingleEmailComponent,
    NewEmailComponent,
    EmailDetailComponent,
    SentDraftEmailComponent,
    DraftComponent,
    SingleDraftComponent,
    TrashComponent,
    NewEmail2Component,
    NavTreeComponent,
    FolderModelComponent,
    
 
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTreeModule,
    ScrollingModule,
    MatMenuModule

  ],
  providers: [
    EmailService,
    ApiService,
    AppComponent,
    EmailComponent 
    
    
    
 //   MatDialogRef, 

   // FolderResolverService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
