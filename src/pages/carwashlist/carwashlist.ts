import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { HTTP } from '@ionic-native/http';
import { CarwashPage } from '../carwash/carwash';
import { HomePage } from '../home/home';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the CarwashlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carwashlist',
  templateUrl: 'carwashlist.html',
})
export class CarwashlistPage {
list1: any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider, private http: HTTP,private geolocation: Geolocation) {
this.langdata=JSON.parse(localStorage.getItem("langdata"));
 let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
  this.geolocation.getCurrentPosition().then((resp) => {
 this.loginv.lat = resp.coords.latitude.toString();
  this.loginv.lang = resp.coords.longitude.toString();
  
 
	  let headers = {
            'Content-Type': 'application/json'
        };
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
  
}).catch((error) => {
	const alert = this.alertCtrl.create({
      title: 'Fetching Error',
      subTitle: 'Error getting location',
      buttons: ['OK']
    });
    alert.present();

});



 

	  loading.dismiss();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CarwashlistPage');
  }
  
homeGo() {
 this.navCtrl.setRoot(HomePage);
  }
  productMove(pid) {	 
	  this.navCtrl.push(CarwashPage, {pid: pid});
	
  }
}
