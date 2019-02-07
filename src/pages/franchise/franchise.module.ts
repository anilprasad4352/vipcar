import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FranchisePage } from './franchise';

@NgModule({
  declarations: [
    FranchisePage,
  ],
  imports: [
    IonicPageModule.forChild(FranchisePage),
  ],
})
export class FranchisePageModule {}
