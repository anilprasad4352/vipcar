import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupv = {
	  email:'',
	  password:'',
	  cpassword:'',
	  referral:''
  }
  wlog:any;
  wnumber:any;
  otpsend:any;
  otp:any;
  otpenter:any;
   auth:any;
fbdata={
	name:'',
	email:'',
	pic:'',
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP,private fb: Facebook,private googlePlus: GooglePlus) {
  this.wlog=0;
   this.otpsend=0;
   this.otp=0;
   this.auth=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  checkOtp(){
	  if(this.otpenter=='' || this.otpenter != this.otp){
		const alert = this.alertCtrl.create({
      title: 'Whatsapp Error',
      subTitle: 'Invalid OTP',
      buttons: ['OK']
    });
    alert.present();  
	  }else{
		   let headers = {
            'Content-Type': 'application/json'
        };
		  this.fbdata.name=this.wnumber;
	 this.fbdata.email=this.wnumber;
	 this.fbdata.pic='';
		  this.http.get('http://preferwork.com/apiproject/api/loginwithWP', this.fbdata, headers)
  .then(data => {
let d= JSON.parse(data.data);	
if(d.status==true){	
localStorage.setItem("user_id", d.user.id);
localStorage.setItem("user_email", d.user.email);
localStorage.setItem("user_name", d.user.name);
localStorage.setItem("user_phone", d.user.phone);
localStorage.setItem("user_social_media", d.user.social_media);
localStorage.setItem("user_profile_img", d.user.profile_img);
localStorage.setItem("user_location", d.user.location);
localStorage.setItem("user_dob", d.user.dob);
localStorage.setItem("user_city", d.user.city);
localStorage.setItem("user_state", d.user.state);
localStorage.setItem("user_country", d.user.country);

this.navCtrl.setRoot(HomePage);
window.location.reload();
	//this.navCtrl.push(HomePage);
}else{
	const alert = this.alertCtrl.create({
      title: 'Login Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
const alert = this.alertCtrl.create({
      title: 'Login Status',
      subTitle: 'There are technical issue while login',
      buttons: ['OK']
    });
    alert.present();

  });
  
	  }
  }
  wsend(){
	
	
	  if(this.wnumber!=''){
		     let headers = {
            'Content-Type': 'application/json'
        };
		
		  this.fbdata.name=this.wnumber;
	 this.fbdata.email=this.wnumber;
	 this.fbdata.pic='';
		  this.http.get('http://preferwork.com/apiproject/api/sendOTPWP', this.fbdata, headers)
  .then(data => {
let d= JSON.parse(data.data);	
if(d.status==true){	
this.otp=d.otp;
this.otpsend=1;
	const alert = this.alertCtrl.create({
      title: 'Whatsapp Signup',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present(); 
	//this.navCtrl.push(HomePage);
}else{
	this.otpsend=0;
	const alert = this.alertCtrl.create({
      title: 'Whatsapp Signup',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present(); 
	
}
   

  })
  .catch(error => {

const alert = this.alertCtrl.create({
      title: 'Signup',
      subTitle: 'Server Error',
      buttons: ['OK']
    });
    alert.present();
  });
  
  
		  
	  }else{
		const alert = this.alertCtrl.create({
      title: 'Whatsapp Error',
      subTitle: 'Please provide whatsapp number',
      buttons: ['OK']
    });
    alert.present();  
	  }
  }
  backLogin(){
	  this.wlog=0;
  }
  wlogin(){
	  this.wlog=1;
	   this.otpsend=0;
   this.otp=0;
   this.auth=0;
  }
 signinGo() {
 this.navCtrl.push(LoginPage);
  }
  glogin() {
	  this.googlePlus.login({})
  .then(res => {	  
	  this.fbdata.name=res.email;
	 this.fbdata.email=res.displayName;
	 this.fbdata.pic=res.imageUrl;
	       let loading = this.loadingCtrl.create({
    content: 'Logging...'
  });
  loading.present();
           let headers = {
            'Content-Type': 'application/json'
        };
		  this.http.get('http://preferwork.com/apiproject/api/registerwithGO', this.fbdata, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
localStorage.setItem("user_id", d.user.id);
localStorage.setItem("user_email", d.user.email);
localStorage.setItem("user_name", d.user.name);
localStorage.setItem("user_phone", d.user.phone);
localStorage.setItem("user_social_media", d.user.social_media);
localStorage.setItem("user_profile_img", d.user.profile_img);
localStorage.setItem("user_location", d.user.location);
localStorage.setItem("user_dob", d.user.dob);
localStorage.setItem("user_city", d.user.city);
localStorage.setItem("user_state", d.user.state);
localStorage.setItem("user_country", d.user.country);
this.fb.logout();
this.navCtrl.setRoot(HomePage);

window.location.reload();
	//this.navCtrl.push(HomePage);
}else{
	const alert = this.alertCtrl.create({
      title: 'Login Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Login Status',
      subTitle: 'There are technical issue while login',
      buttons: ['OK']
    });
    alert.present();

  });
  
	 
  })
  .catch(err => console.error(err));
	  
  }
   fblogin() {
	 this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {
         
        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;
			this.fbdata.pic="https://graph.facebook.com/" + fb_id + "/picture?type=large";

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email,picture", []).then((user) => {

				this.fbdata.name=user.name;
				this.fbdata.email=user.email;

                   let loading = this.loadingCtrl.create({
    content: 'Logging...'
  });
  loading.present();
           let headers = {
            'Content-Type': 'application/json'
        };
		  this.http.get('http://preferwork.com/apiproject/api/registerwithFB', this.fbdata, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
localStorage.setItem("user_id", d.user.id);
localStorage.setItem("user_email", d.user.email);
localStorage.setItem("user_name", d.user.name);
localStorage.setItem("user_phone", d.user.phone);
localStorage.setItem("user_social_media", d.user.social_media);
localStorage.setItem("user_profile_img", d.user.profile_img);
localStorage.setItem("user_location", d.user.location);
localStorage.setItem("user_dob", d.user.dob);
localStorage.setItem("user_city", d.user.city);
localStorage.setItem("user_state", d.user.state);
localStorage.setItem("user_country", d.user.country);
this.fb.logout();
this.navCtrl.setRoot(HomePage);
window.location.reload();
	//this.navCtrl.push(HomePage);
}else{
	const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: 'There are technical issue while login',
      buttons: ['OK']
    });
    alert.present();

  });

                // => Open user session and redirect to the next page

            });

        } 
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
	
  }
  
  
  signUp() {
	
	   let loading = this.loadingCtrl.create({
    content: 'Registering...'
  });
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(this.signupv.email!='' && this.signupv.email!=null && re.test(this.signupv.email)){
	  
  
    if(this.signupv.password==this.signupv.cpassword && this.signupv.password!=null && this.signupv.password!=''){
		
	
	loading.present();
	let headers = {
            'Content-Type': 'application/json'
        };
this.http.get('http://preferwork.com/apiproject/api/registerwithEmail', this.signupv, headers)
  .then(data => {
loading.dismiss();

let d= JSON.parse(data.data);

	
if(d.status==true){
	const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
	this.navCtrl.push(LoginPage);
}else{
	const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
}
   

  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: 'There are technical issue while registering',
      buttons: ['OK']
    });
    alert.present();
	
    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
	}else{
	const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: 'Password and Confirm password must be same',
      buttons: ['OK']
    });
    alert.present();	
	}
  }else{
	const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: 'Invalid Email',
      buttons: ['OK']
    });
    alert.present();  
  }
  
	 /* const alert = this.alertCtrl.create({
      title: 'Signup Status',
      subTitle: 'Invalid Details',
      buttons: ['OK']
    });
    alert.present();*/
  }

}
