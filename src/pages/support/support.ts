import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
loginv={
	a:''
}
langdata:any;
  ldata={
	uid:'',
	lang:''
}
sphone:any;
semail:any;

list1:any;
support={
	name:'',
email:'',
subject:'',
msg:'',
user_id:''
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP, public toastCtrl: ToastController) {
     let headers = {
            'Content-Type': 'application/json'
        };
		 
		 this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
		  this.http.get('http://preferwork.com/apiproject/api/getProducts/support_info', this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.products;
this.sphone=this.list1[0].phone;
this.semail=this.list1[0].email;
}else{
	const alert = this.alertCtrl.create({
      title: '',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
  })
  .catch(error => {
  });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }
  
  gotoCheckout(){
	  const alert = this.alertCtrl.create({
      title: 'Request sent',
      subTitle: 'Request Sent succesfully',
      buttons: ['OK']
    });
    alert.present();
	
	  this.support.user_id=localStorage.getItem("user_id");
	    let headers = {
            'Content-Type': 'application/json'
        };
	 	  this.http.get('http://preferwork.com/apiproject/api/supportRequest', this.support, headers)
  .then(data => {

let d= JSON.parse(data.data);	
	this.support.name='';
	this.support.email='';
	this.support.subject='';
	this.support.msg='';

const alert = this.alertCtrl.create({
      title: 'Request sent',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();

  })
  .catch(error => {
  }); 
  }

}
