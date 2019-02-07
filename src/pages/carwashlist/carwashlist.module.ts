import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarwashlistPage } from './carwashlist';

@NgModule({
  declarations: [
    CarwashlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CarwashlistPage),
  ],
})
export class CarwashlistPageModule {}
