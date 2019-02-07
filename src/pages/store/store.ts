import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

	list1: any;
	 loginv={
	  a:''
  }
  langdata:any;
  ldata={
	uid:'',
	lang:''
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider, private http: HTTP) {
  let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
 
	   this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	let headers = {
            'Content-Type': 'application/json'
        };
  
	this.langdata=JSON.parse(localStorage.getItem("langdata"));
	   
    this.http.get('http://preferwork.com/apiproject/api/getProducts/store', this.ldata, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.products;
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
    console.log('ionViewDidLoad StorePage');
  }
    homeGo() {
 this.navCtrl.setRoot(HomePage);
  }
   productMove(pid) {	 
	  this.navCtrl.push(ProductPage, {pid: pid});
  }

}
