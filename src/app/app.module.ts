import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ConfigService} from './services/config.service';
import { EmailService } from './services/email.service';
import{ApiService} from './services/api.service'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MainNavComponent } from './main-nav/main-nav.component';
import { EmailFolderComponent } from './email-folder/email-folder.component';
import {EmailFolderResolve} from  './email-folder/email-folder-resolve';
import { EmailItemComponent } from './email-item/email-item.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { SingleEmailComponent } from './single-email/single-email.component';
import { SingleEmailResolve } from './single-email/single-email-resolve';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClassificationService } from './services/classification.service';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import{ToastService} from './services/toast.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogModule, MatDialog  , MatDialogConfig,MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import{NavTreeComponent} from './nav-tree/nav-tree.component'
import {LabelsService} from './services/labels.service';
import { RelcassifyComponent } from './relcassify/relcassify.component';
import { EmailLabelComponent } from './email-label/email-label.component';
import{FileDatabase}from './nav-tree/nav-tree.component';
import { SortDatePipe } from './pipe/sort-date.pipe';
import { ChangeDetectorRef ,AfterContentChecked} from '@angular/core';

/* Initialize application */
const appConfig=(config:ConfigService)=>{
  return()=>{
    return config.loadConfig();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    EmailFolderComponent,
    EmailItemComponent,
    SingleEmailComponent,
    NotFoundComponent,
    ComposeEmailComponent,
    NavTreeComponent,
    RelcassifyComponent,
    EmailLabelComponent,
    SortDatePipe,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    ScrollingModule,
    

  ],
  
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  FileDatabase,
    EmailService,
    EmailFolderResolve,
    SingleEmailResolve,
    ApiService,
    ToastService,
    MatSnackBar,
    ComposeEmailComponent,
    ClassificationService,
    NavTreeComponent,
    LabelsService,
    EmailFolderComponent,
    NavTreeComponent,
    SingleEmailComponent,
    ConfigService,
    
    {
      provide:APP_INITIALIZER,
      useFactory:appConfig,
      multi:true,
      deps:[ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
