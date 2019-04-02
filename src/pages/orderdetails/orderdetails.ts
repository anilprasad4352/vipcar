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
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {
oid:any;
order:any;
loginv={
	a:''
}

img:any;
name:any;
info:any;
price:any;
payment_mode:any;
ship_name:any;
ship_address:any;
  langdata:any;
  ldata={
	uid:'',
	lang:''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP,private transfer: FileTransfer,  private camera: Camera,  public toastCtrl: ToastController) {
  this.oid=this.navParams.get('oid');
      let headers = {
            'Content-Type': 'application/json'
        };
		
		  this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
		  this.http.get('http://preferwork.com/apiproject/api/getOrder/'+this.oid, this.ldata, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.order=d.order;
this.img=this.order[0].product_image;
this.name=this.order[0].product_name;
this.info=this.order[0].order_notes;
this.price=this.order[0].price;
this.payment_mode=this.order[0].payment_mode;
this.ship_name=this.order[0].shipping_info[0].name;
this.ship_address=this.order[0].shipping_info[0].address;
}else{
	const alert = this.alertCtrl.create({
      title: 'Change Password Status',
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
    console.log('ionViewDidLoad OrderdetailsPage');
  }

}
