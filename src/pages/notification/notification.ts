import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
list1:any;
loginv={
	a:''
}
langdata:any;
  ldata={
	uid:'',
	lang:''
}

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP,private transfer: FileTransfer,  private camera: Camera,  public toastCtrl: ToastController) {
	  
	     let headers = {
            'Content-Type': 'application/json'
        };
		  this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
		  this.http.get('http://preferwork.com/apiproject/api/getNotifications/'+localStorage.getItem("user_id"), this.ldata, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.notifications;
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
    console.log('ionViewDidLoad NotificationPage');
  }

}
