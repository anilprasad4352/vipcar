import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FranchiselistPage } from './franchiselist';

@NgModule({
  declarations: [
    FranchiselistPage,
  ],
  imports: [
    IonicPageModule.forChild(FranchiselistPage),
  ],
})
export class FranchiselistPageModule {}
