import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CheckoutPage } from '../checkout/checkout';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
sdate:any;
stime:any;
 product: any;
  name:any;
  img:any;
  pid:any;
  address:any;
  highlights:any;
  rating_count:any;
  review_count:any;
  lat: any;
  lang: any;
  services:any;
  pickup:any;
  list1:any;
  buy={
	date:'',
	time:'',
	service:'',
	delivery:'',
	pick_address:'',
	contact_person:'',
	price:'',
	contact:'',
	user_id:'',
	booking_for:'',
}
 loginv={
	  a:''
  }
   langdata:any;
    ldata={
	uid:'',
	lang:''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider,private http: HTTP) {
	 this.langdata=JSON.parse(localStorage.getItem("langdata"));
	 this.stime=1;
	 this.sdate=1;
	 this.pickup=0;
	 	   let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
  let type='0';
  if(this.navParams.get('table')=='carwash'){
	  type='1';
  }
  if(this.navParams.get('table')=='parking'){
	  type='2';
  }
  
	  
	  let headers = {
            'Content-Type': 'application/json'
        };
    this.http.get('http://preferwork.com/apiproject/api/getServices/'+this.navParams.get('pid')+'/'+type, this.loginv, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
this.services=d.services;
}else{
	const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {

const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
	
	

  });
  
  
	  
 
	  
	   this.http.get('http://preferwork.com/apiproject/api/getProduct/'+this.navParams.get('table')+'/'+this.navParams.get('pid'), this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.product;
          this.product=this.list1[0];
		  this.name=this.product.name;
  this.img=this.product.image;
  this.pid=this.product.id;
  this.address=this.product.address;
  this.highlights=this.product.highlights;
  this.rating_count=this.product.rating_count;
  this.review_count=this.product.review_count;
  this.lat=this.product.lat;
  this.lang=this.product.lang;
}else{
	const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {

const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
	
	

  });
  
  
	  loading.dismiss();
  }
  onSelectChangeServ(e) {
	  let id = this.buy.delivery;
	  if(id == '0'){
		  for(var i=0;i<this.services.length;i++){
			  
			  if(this.services[i].id==e){
				this.buy.price=this.services[i].pickup_price;  
			  }
		  }
		  
	  }
	  if(id == '1'){
		  for(var j=0;j<this.services.length;j++){
			  if(this.services[j].id==e){
				this.buy.price=this.services[j].drop_price;  
			  }
		  } 
	  } 
  }
  onSelectChange(e) {
	  let id = this.buy.service;
	 
	  if(e == '0'){
		  for(var i=0;i<this.services.length;i++){
			  
			  if(this.services[i].id==id){
				this.buy.price=this.services[i].pickup_price;  
			  }
		  }
		  this.pickup=1;
	  }
	  if(e == '1'){
		  for(var i=0;i<this.services.length;i++){
			  if(this.services[i].id==id){
				this.buy.price=this.services[i].drop_price;  
			  }
		  } 
		  this.pickup=0;
	  }
	  
  }
  labelTime() {
	   this.stime=0;
  }
  
  labelDate() {
	   this.sdate=0;
  }
  bookNow() {
	  console.log(this.buy);
	 if(this.buy.price!='' && this.buy.date!='' && this.buy.delivery!=''){
		 if(this.buy.delivery=='0'){
			 if(this.buy.pick_address!='' && this.buy.contact!='' && this.buy.contact_person!=''){
				 let uid=localStorage.getItem("user_id");
				 let type='0';
  if(this.navParams.get('table')=='carwash'){
	  type='1';
  }
  if(this.navParams.get('table')=='parking'){
	  type='2';
  }
				
				 this.buy.user_id=uid;
				 this.buy.booking_for=type;
			
		
				 	   let loading = this.loadingCtrl.create({
    content: 'Booking...'
  });
  loading.present();
				 
	  
	  let headers = {
            'Content-Type': 'application/json'
        };
	   this.http.get('http://preferwork.com/apiproject/api/booking/', this.buy, headers)
  .then(data => {
	  let d= JSON.parse(data.data);
loading.dismiss();
	const alert = this.alertCtrl.create({
      title: 'Booking Confirmation',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
			this.navCtrl.setRoot(HomePage); 
  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
	
	

  });
  
  
  
  
	  
				 
			 }else{
				const alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Please fill all field value',
      buttons: ['OK']
    });
    alert.present(); 
			 }
		 }else{
			 
				 let uid=localStorage.getItem("user_id");
				 let type='0';
  if(this.navParams.get('table')=='carwash'){
	  type='1';
  }
  if(this.navParams.get('table')=='parking'){
	  type='2';
  }
				 this.buy.user_id=uid;
				 this.buy.booking_for=type;
			 
	  let headers = {
            'Content-Type': 'application/json'
        };
	   this.http.get('http://preferwork.com/apiproject/api/booking/', this.buy, headers)
  .then(data => {
	  let d= JSON.parse(data.data);

	const alert = this.alertCtrl.create({
      title: 'Booking Confirmation',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
			this.navCtrl.setRoot(HomePage); 
  })
  .catch(error => {

const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
	
	

  });
			 
		 }
	 }else{
		 const alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Please fill all field value',
      buttons: ['OK']
    });
    alert.present();
	 }
  }
gotoCheckout() {
	this.navCtrl.push(CheckoutPage, {pid: this.navParams.get('pid')}); 
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }

}
