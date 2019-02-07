import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
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
  langdata:any;
    ldata={
	uid:'',
	lang:''
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider, private http: HTTP) {
	   this.langdata=JSON.parse(localStorage.getItem("langdata"));
	     let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
 
	  
	   let headers = {
            'Content-Type': 'application/json'
        };
    this.http.get('http://preferwork.com/apiproject/api/getProduct/parking/'+this.navParams.get('pid'), this.loginv, headers)
  .then(data => {
loading.dismiss();
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
    console.log('ionViewDidLoad BookPage');
  }
  productMove(pid) {	 
	  this.navCtrl.setRoot(HomePage, {pid: pid});
  }

}
