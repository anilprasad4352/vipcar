import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
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
useramount:'0'
ref:''
title:''
url:''
textd:''
totalf:''
  constructor(private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP,  public toastCtrl: ToastController) {
     let headers = {
            'Content-Type': 'application/json'
        };
		 
		 this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
	
    this.http.get('http://preferwork.com/apiproject/api/wallet', this.ldata, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.useramount=d.useramount;
}else{
	
	
}
  })
  .catch(error => {
  });
  
    this.http.get('http://preferwork.com/apiproject/api/getShare', this.ldata, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.ref=d.ref;
this.title=d.title;
this.url=d.url;
this.textd=d.textd;
this.totalf=d.totalf;
}else{
	
	
}
  })
  .catch(error => {
  });
  
  
  }
sharenow(){
	this.socialSharing.share(this.textd,this.title,'',this.url).then(function() {
  console.log('Successful share');
}).catch(function(error) {
  console.log('Error sharing:', error)
})
}
 



}
