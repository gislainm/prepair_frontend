import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//Ngx spinner imports
import { NgxSpinnerModule } from 'ngx-spinner';

import { StudentsRoutingModule } from './students-routing.module';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MessageComponent,
    ProfileComponent,
    HomeComponent,
    FindMentorComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatGridListModule,
    LayoutModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    NgbPopoverModule,
    NgxSpinnerModule
  ]
})
export class StudentsModule { }
