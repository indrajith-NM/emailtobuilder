import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {EmailComposer} from "@ionic-native/email-composer/ngx";
import { FlexLayoutModule } from '@angular/flex-layout';
import {Geolocation} from '@ionic-native/geolocation/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FlexLayoutModule ,
  ],
  providers: [
    EmailComposer,
    Geolocation
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
