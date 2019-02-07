import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the OrderconfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderconfirm',
  templateUrl: 'orderconfirm.html',
})
export class OrderconfirmPage {
 langdata:any;
  ldata={
	uid:'',
	lang:''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP) {
	     let headers = {
            'Content-Type': 'application/json'
        };
		
		  this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderconfirmPage');
  }

}
