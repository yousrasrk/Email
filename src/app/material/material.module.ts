import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';  
import {MatTreeModule} from '@angular/material/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const matetials=[
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  CdkScrollableModule,
  MatCardModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatTreeModule,
  MatCheckboxModule,
  MatBadgeModule,
  DragDropModule,
  FlexLayoutModule,
  MatProgressBarModule


  
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matetials,
    
  ],
  exports:[
    matetials 
  ]
})
export class MaterialModule { }
