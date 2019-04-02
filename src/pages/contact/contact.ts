import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
list1: any;
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
   loginv={
	  a:''
  }
  contact={
	  name:'',
	  email:'',
	  phone:'',
	  title:'',
	  address:'',
	  message:'',
	  user_id:''
  }
   langdata:any;
    ldata={
	uid:'',
	lang:''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider, private http: HTTP) {
   this.langdata=JSON.parse(localStorage.getItem("langdata"));
    this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
  	   let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
 
	  let headers = {
            'Content-Type': 'application/json'
        };
    this.http.get('http://preferwork.com/apiproject/api/getProduct/'+this.navParams.get('table')+'/'+this.navParams.get('pid'), this.ldata, headers)
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
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
	
	

  });
  
	  loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  contactNow() {
	  if(this.contact.name!='' && this.contact.email!='' && this.contact.phone!='' && this.contact.address!='' && this.contact.title!=='' && this.contact.message!=''){
		   let uid=localStorage.getItem("user_id");
		   this.contact.user_id=uid;
		 
	  let headers = {
            'Content-Type': 'application/json'
        };
		console.log('http://preferwork.com/apiproject/api/contact/'+this.navParams.get('pid'));
		console.log(this.contact);
    this.http.get('http://preferwork.com/apiproject/api/contact/'+this.navParams.get('pid'), this.contact, headers)
  .then(data => {
const alert = this.alertCtrl.create({
      title: 'Contact Request',
      subTitle: 'Contact Request has been sent.',
      buttons: ['OK']
    });
    alert.present();
   this.contact={
	  name:'',
	  email:'',
	  phone:'',
	  title:'',
	  address:'',
	  message:'',
	  user_id:''
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
  
		  
		  
	  }else{
		 const alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: 'All fields are required',
      buttons: ['OK']
    });
    alert.present(); 
	  }
  }
  homeGo() {
 this.navCtrl.setRoot(HomePage);
  }

}
