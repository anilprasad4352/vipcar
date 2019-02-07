import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {
fbdata={
	name:'',
	email:'',
	pic:'',
}
ldata={
	uid:'',
	lang:''
}
languaged:any;
language:any;
clanguage:any;
langdata:any;
xd:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP) {
    let headers = {
            'Content-Type': 'application/json'
        };
 // this.xd={"status":true,"language":{"LanguageSettings":"\u092d\u093e\u0937\u093e \u092c\u0926\u0932\u0947\u0902 ","Yourorderhasbeenconfirmed":"\u0906\u092a\u0915\u093e \u0906\u091c\u094d\u091e\u093e \u0915\u0928\u094d\u092b\u0930\u094d\u092e \u0939\u094b \u091a\u0942\u0915\u093e \u0939\u0948 ","OrderConfirmation":"\u0906\u0930\u094d\u0921\u0930 \u0915\u0928\u094d\u092b\u0930\u094d\u092e\u0947\u0936\u0928 ","PaymentMode":"\u092a\u0947\u092e\u0947\u0902\u091f \u092e\u094b\u0921 ","ShippingDetails":"\u0936\u093f\u092a\u093f\u0902\u0917 \u0921\u093f\u091f\u0947\u0932\u094d\u0938 ","WriteReview":"\u0930\u093f\u0935\u094d\u092f\u0941 \u0932\u093f\u0916\u0947\u0902","OrderDetails":"\u0906\u091c\u094d\u091e\u093e \u092a\u0924\u093e","ProductHighlights":"\u0909\u0924\u094d\u092a\u093e\u0926 \u0939\u093e\u0907\u0932\u093e\u0907\u091f","BuyNow":"\u0905\u092d\u0940 \u0916\u0930\u0940\u0926\u0947\u0902","Reviews":"\u0930\u0947\u0935\u093f\u090f\u0935\u0938","Ratings":"\u0930\u0947\u091f\u093f\u0902\u0917\u094d\u0938","MyProfile":"\u092e\u0947\u0930\u093e \u0935\u093f\u0935\u0930\u0923 ","ChangePassword":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u0947\u0902","MyOrders":"\u092e\u0947\u0930\u093e \u0906\u091c\u094d\u091e\u093e","MyInfo":"\u092e\u0947\u0930\u093e \u091c\u093e\u0928\u0915\u093e\u0930\u0940","SubmitNow":"\u0905\u092d\u0940 \u092d\u0947\u091c\u0947\u0902","WriteUs":"\u0939\u092e\u0947\u0902 \u0932\u093f\u0902\u0916\u0947 ","CallUsNow":"\u0905\u092d\u0940 \u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902","ViewAll":"\u0938\u092d\u0940 \u0926\u0947\u0916\u0947\u0902","OurFranchise":"\u0939\u092e\u093e\u0930\u093e \u092b\u094d\u0930\u0948\u0902\u091a\u093e\u0907\u095b\u0940","OnlineStore":"\u0911\u0928\u0932\u093e\u0907\u0928 \u0938\u094d\u091f\u094b\u0930","NearestParking":"\u0928\u091c\u0926\u0940\u0915\u0940 \u092a\u093e\u0930\u094d\u0915\u093f\u0902\u0917 ","NearestCarWash":"\u0928\u091c\u0926\u0940\u0915\u0940 \u0915\u093e\u0930 \u0927\u0941\u0932\u093e\u0908","Support":"\u092e\u0926\u0926","Language":"\u092d\u093e\u0937\u093e","Account":"\u0916\u093e\u0924\u093e","NearBy":"\u0928\u091c\u0926\u0940\u0915","Notification":"\u0928\u094b\u091f\u093f\u092b\u093f\u0915\u0947\u0936\u0928","Explore":"\u090f\u0915\u094d\u0938\u094d\u092a\u094d\u0932\u094b\u0930","Home":"\u0918\u0930"}};
 // let d1= JSON.parse(this.xd);
 // console.log(this.xd);
  this.ldata.uid=localStorage.getItem("user_id");
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
 
	
   this.ldata.lang='';
		  this.http.get('http://preferwork.com/apiproject/api/getLanguage', this.ldata, headers)
  .then(data => {
let d= JSON.parse(data.data);	
if(d.status==true){	
this.language=d.language;
}else{
	const alert = this.alertCtrl.create({
      title: 'Language Status',
      subTitle: 'Unable to load language',
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
const alert = this.alertCtrl.create({
      title: 'Login Status',
      subTitle: 'There are technical issue while login',
      buttons: ['OK']
    });
    alert.present();

  });
  
  }

  ionViewDidLoad() {
     
  }
petChange(e){
	console.log(e);
}
 catSelect(ev) {
   this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang=ev;
   let headers = {
            'Content-Type': 'application/json'
        };
		 this.http.get('http://preferwork.com/apiproject/api/setLanguage', this.ldata, headers)
  .then(data => {
let d= JSON.parse(data.data);	
if(d.status==true){	
const alert = this.alertCtrl.create({
      title: 'Language Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	window.location.reload();
}else{
	const alert = this.alertCtrl.create({
      title: 'Language Status',
      subTitle: 'Unable to change language',
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
	const alert = this.alertCtrl.create({
      title: 'Language Status',
      subTitle: 'Unable to change language',
      buttons: ['OK']
    });
    alert.present();

  });
  
  }
}
