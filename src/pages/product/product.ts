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
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: any;
  name:any;
  img:any;
  pid:any;
  address:any;
  highlights:any;
  rating_count:any;
  review_count:any;
  list1:any;
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
   let headers = {
            'Content-Type': 'application/json'
        };
  loading.present();
   console.log(this.navParams.get('pid'));
 
	   this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
	  
	   this.http.get('http://preferwork.com/apiproject/api/getProduct/store/'+this.navParams.get('pid'), this.ldata, headers)
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
}else{
	
	
}
   

  })
  .catch(error => {
	  this.product='gfhgfh';
		  this.name='fgfgfgh';
  this.img='https://mentorxo.com/wp-content/uploads/2018/09/ravi_prefer_work.png';
  this.pid='2';
  this.address='gffh';
  this.highlights='yuiuyi';
  this.rating_count='2';
  this.review_count='4';
 

  });
  
  
  
	  loading.dismiss();
	  
	

  }

  ionViewDidLoad() {
 
  }
  buyNow(pid) {
	  this.navCtrl.push(CheckoutPage, {pid: this.navParams.get('pid')}); 
  }
 

  
homeGo() {
 this.navCtrl.setRoot(HomePage);
  }
}
