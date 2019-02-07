import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { OrderdetailsPage } from '../orderdetails/orderdetails';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
tab1class: string;
tab2class: string;
tab3class: string;
name: string;
   user_location: string;
   profile: string;
   	loginv={
	email:'',
	name:'',
	phone:'',
	dob:'',
	address:'',
	city:'',
	state:'',
	country:'',
	user_id:''
}
changepwd={
	old:'',
	newp:'',
	cnewp:'',
	user_id:''
}
tab1: any;
tab2: any;
tab3: any;
upload: any;
imageURI:any;
imageFileName:any;
orderlist:any;
langdata:any;
  ldata={
	uid:'',
	lang:''
}
constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP,private transfer: FileTransfer,  private camera: Camera,  public toastCtrl: ToastController) {
 this.tab1=1;
 this.tab2=0;
 this.tab3=0;
 this.upload=0;
 this.tab1class="active";
 this.tab2class="inactive";
 this.tab3class="inactive";
  let headers = {
            'Content-Type': 'application/json'
        };
		 this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
	
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
  
  
  
 if(localStorage.getItem("user_name") != null && localStorage.getItem("user_name") != ''){
 this.name= localStorage.getItem("user_name");
 this.loginv.name=this.name;
	}else{
		this.name='';
	}
	if(localStorage.getItem("user_location") != null && localStorage.getItem("user_location") != ''){
 this.user_location = localStorage.getItem("user_location");
 this.loginv.address=this.user_location;
	}else{
		this.user_location = '';
		
	}
	if(localStorage.getItem("user_profile_img") != null && localStorage.getItem("user_profile_img") != ''){
 this.profile= localStorage.getItem("user_profile_img");
	}else{
		this.profile = '';
	}
	if(localStorage.getItem("user_email") != null && localStorage.getItem("user_email") != ''){
 this.loginv.email = localStorage.getItem("user_email");
	}
	if(localStorage.getItem("user_phone") != null && localStorage.getItem("user_phone") != ''){
 this.loginv.phone = localStorage.getItem("user_phone");
	}	
	if(localStorage.getItem("user_dob") != null && localStorage.getItem("user_dob") != ''){
 this.loginv.dob = localStorage.getItem("user_dob");
	}
	if(localStorage.getItem("user_city") != null && localStorage.getItem("user_city") != ''){
 this.loginv.city = localStorage.getItem("user_city");
	}
	if(localStorage.getItem("user_state") != null && localStorage.getItem("user_state") != ''){
 this.loginv.state = localStorage.getItem("user_state");
	}
	if(localStorage.getItem("user_country") != null && localStorage.getItem("user_country") != ''){
 this.loginv.country = localStorage.getItem("user_country");
	}
	if(localStorage.getItem("user_id") != null && localStorage.getItem("user_id") != ''){
 this.changepwd.user_id = localStorage.getItem("user_id");
 this.loginv.user_id = localStorage.getItem("user_id");
	}
 if(this.profile == ''){
	 this.profile = 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png';
 }

      
		
		  this.http.get('http://preferwork.com/apiproject/api/orderList/'+this.loginv.user_id, this.loginv, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
this.orderlist=d.orders;
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
  tab1active(){
	   this.tab1=1;
 this.tab2=0;
 this.tab3=0;
 this.tab1class="active";
 this.tab2class="inactive";
 this.tab3class="inactive";
  }
   tab2active(){
	   this.tab1=0;
 this.tab2=1;
 this.tab3=0;
 this.tab1class="inactive";
 this.tab2class="active";
 this.tab3class="inactive";
  }
  
   tab3active(){
	   this.tab1=0;
 this.tab2=0;
 this.tab3=1;
 this.tab1class="inactive";
 this.tab2class="inactive";
 this.tab3class="active";
  }

  
  changepassword(){
	       let loading = this.loadingCtrl.create({
    content: 'Changing password...'
  });
	  loading.present();
	    let headers = {
            'Content-Type': 'application/json'
        };
		
		  this.http.get('http://preferwork.com/apiproject/api/changePassword', this.changepwd, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
const alert = this.alertCtrl.create({
      title: 'Change Password Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
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
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Change Password Status',
      subTitle: 'There are technical issue while Change Password',
      buttons: ['OK']
    });
    alert.present();
	


  });
  
  }
  profileUpdate(){
	         let loading = this.loadingCtrl.create({
    content: 'Profile Updating...'
  });
	  loading.present();
	    let headers = {
            'Content-Type': 'application/json'
        };
		
		  this.http.get('http://preferwork.com/apiproject/api/updateProfile', this.loginv, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
const alert = this.alertCtrl.create({
      title: 'Profile Update Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
}else{
	const alert = this.alertCtrl.create({
      title: 'Profile Update Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Profile Update Status',
      subTitle: 'There are technical issue while Profile Update',
      buttons: ['OK']
    });
    alert.present();
	


  });
  
  }
homeGo() {
 this.navCtrl.setRoot(HomePage);
  }
  
  getImage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
  this.upload=1;
  }
  uploadImage() {
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
    fileKey: 'ionicfile',
    fileName: 'ionicfile',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }

  fileTransfer.upload(this.imageURI, 'http://preferwork.com/apiproject/api/uploadImage/', options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
    this.imageFileName = data;
	//this.pofile=data.data.img;	
//localStorage.setItem("user_profile_img", data.data.img);
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
  
  
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
 orderMove(oid) {
	  
	  this.navCtrl.push(OrderdetailsPage, {oid: oid});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
