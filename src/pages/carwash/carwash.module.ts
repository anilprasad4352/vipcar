import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarwashPage } from './carwash';

@NgModule({
  declarations: [
    CarwashPage,
  ],
  imports: [
    IonicPageModule.forChild(CarwashPage),
  ],
})
export class CarwashPageModule {}
