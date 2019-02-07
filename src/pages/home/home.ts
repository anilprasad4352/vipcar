import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CarwashPage } from '../carwash/carwash';
import { ParkingPage } from '../parking/parking';
import { StorePage } from '../store/store';
import { FranchisePage } from '../franchise/franchise';
import { CarwashlistPage } from '../carwashlist/carwashlist';
import { FranchiselistPage } from '../franchiselist/franchiselist';
import { ProductPage } from '../product/product';
import { AddressPage } from '../address/address';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {  NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  currentslide:any;
  slideactive:any;
  tab1class: string;
tab2class: string;
tab3class: string;
list1: any;
list2: any;
list3: any;
list4: any;
slider1: any;
slider2: any;
slider3: any;
  films: any;
params:any; 
 loginv={
	  limit:'5',
	  lat:'0',
	  lang:'0'
  }
  langdata:any;
  ldata={
	uid:'',
	lang:''
}

  constructor(private diagnostic: Diagnostic, public navCtrl: NavController, public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider,  private http: HTTP,private geolocation: Geolocation) {
	
 this.tab1class="slideactive";
 this.tab2class="slideinactive";
 this.tab3class="slideinactive";
this.langdata=JSON.parse(localStorage.getItem("langdata"));
let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
  this.diagnostic.getLocationAuthorizationStatus()
  .then((state) => {
	  
    if (state != 'GRANTED'){
      // do something
	  this.diagnostic.requestLocationAuthorization();
	  window.location.reload();
    } else {
		
		this.diagnostic.isLocationEnabled()
  .then((state) => {
    if (state == true){
       
this.geolocation.getCurrentPosition().then((resp) => {
 this.loginv.lat = resp.coords.latitude.toString();
  this.loginv.lang = resp.coords.longitude.toString();
  
  	
}).catch((error) => {
	const alert = this.alertCtrl.create({
      title: 'Fetching Error',
      subTitle: 'Error getting location',
      buttons: ['OK']
    });
    alert.present();

});
    } else {
     this.diagnostic.switchToLocationSettings();
	 window.location.reload();
    }
  }).catch(e => console.error(e));
  
      // do something else
    }
  }).catch(e => console.error(e));
 


  

  
   let headers = {
            'Content-Type': 'application/json'
        };


	    this.http.get('http://preferwork.com/apiproject/api/getSlider', this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.slider1=d.slider[0].slider1;
			this.slider2=d.slider[0].slider2;
			this.slider3=d.slider[0].slider3;
}else{
	
	
}  

  })
  .catch(error => {

	

  });

 
 	    this.http.get('http://preferwork.com/apiproject/api/getProducts/carwash', this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.products;
}else{
	
	
}  

  })
  .catch(error => {

	

  });
  
 
	  
	  
	  	    this.http.get('http://preferwork.com/apiproject/api/getProducts/parking', this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list2=d.products;
}else{
	
	
}  

  })
  .catch(error => {

//	

  });
  
  
	
	  
	   	    this.http.get('http://preferwork.com/apiproject/api/getProducts/store', this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list3=d.products;
}else{
	
}  

  })
  .catch(error => {

	

  });
  
	 
	  	   	    this.http.get('http://preferwork.com/apiproject/api/getProducts/franchise', this.loginv, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
this.list4=d.products;
}else{

	
}  

  })
  .catch(error => {



  });
 
  	  loading.dismiss();
	  
  }
  
    ionViewDidLoad() {
   
 

  }
  
  
  
  
  goToSlide(x) {
    this.slides.slideTo(x, 500);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
	this.currentslide=currentIndex;
    if(currentIndex==0){
		this.tab1class="slideactive";
 this.tab2class="slideinactive";
 this.tab3class="slideinactive";
	}
	if(currentIndex==1){
		this.tab1class="slideinactive";
 this.tab2class="slideactive";
 this.tab3class="slideinactive";
	}
	if(currentIndex==2){
		this.tab1class="slideinactive";
 this.tab2class="slideinactive";
 this.tab3class="slideactive";
	}
  }
 gotoWash() {
 this.navCtrl.push(CarwashlistPage);
  }
  gotoStore() {
 this.navCtrl.push(StorePage);
  }
  gotoParking() {
 this.navCtrl.push(ParkingPage);
  }
  gotoFranchise() {
 this.navCtrl.push(FranchiselistPage);
  }
   washPage(pid) {
	   
	   this.navCtrl.push(CarwashPage, {pid: pid});
   }
   productMove(pid) {
	   console.log(pid);
	   this.navCtrl.push(ProductPage, {pid: pid});

  }
 
 fMove(pid) {
	 console.log(pid);
	 this.navCtrl.push(FranchisePage, {pid: pid}); 
 }
  locMove(pid) {
	  this.navCtrl.push(AddressPage, {pid: pid});

  }

}
