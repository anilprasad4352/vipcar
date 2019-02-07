import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderconfirmPage } from './orderconfirm';

@NgModule({
  declarations: [
    OrderconfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderconfirmPage),
  ],
})
export class OrderconfirmPageModule {}
