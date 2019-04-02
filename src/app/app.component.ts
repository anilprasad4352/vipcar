import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WalletPage } from '../pages/wallet/wallet';
import { NotificationPage } from '../pages/notification/notification';
import { AccountPage } from '../pages/account/account';
import { CarwashlistPage } from '../pages/carwashlist/carwashlist';
import { StorePage } from '../pages/store/store';
import { SupportPage } from '../pages/support/support';
import { LanguagePage } from '../pages/language/language';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  //rootPage: any = LanguagePage;

  pages: Array<{title: string, component: any,icon: string}>;
  
   name: string;
   user_location: string;
   profile: string;
  ldata={
	uid:'',
	lang:''
}
langdata:any;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public menuCtrl: MenuController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http: HTTP) {

	 let headers = {
            'Content-Type': 'application/json'
        };
    if(localStorage.getItem("user_id") == null || localStorage.getItem("user_id") == ""){	
		 this.ldata.uid='1';
   this.ldata.lang='';
    }else{
      this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
    }
	
  
		  this.http.get('http://preferwork.com/apiproject/api/homepageData', this.ldata, headers)
  .then(data => {
let d= JSON.parse(data.data);	
if(d.status==true){	
this.langdata=d.language;
localStorage.setItem("langdata",JSON.stringify(this.langdata))
 this.pages = [
      {  title: this.langdata.Home, component: HomePage, icon:'home' },
      { title: this.langdata.Explore, component: StorePage, icon:'locate' },
      { title: this.langdata.Notification, component: NotificationPage, icon:'notifications' },
      { title: this.langdata.NearBy, component: CarwashlistPage, icon:'navigate' },
      { title: this.langdata.Account, component: AccountPage, icon:'contact' },
      { title: this.langdata.Language, component: LanguagePage, icon:'at' },
      { title: this.langdata.Support, component: SupportPage, icon:'help' },
      { title: this.langdata.Wallet, component: WalletPage, icon:'share' }
    ];
}else{
	const alert = this.alertCtrl.create({
      title: 'Language Status',
      subTitle: data.data,
      buttons: ['OK']
    });
    alert.present();
	
}
   

  })
  .catch(error => {
const alert = this.alertCtrl.create({
      title: 'Connectivity issue',
      subTitle: error.error,
      buttons: ['OK']
    });
    alert.present();
 this.pages = [
      {  title: 'Home', component: HomePage, icon:'home' },
      { title: 'Explore', component: StorePage, icon:'locate' },
      { title: 'Notification', component: NotificationPage, icon:'notifications' },
      { title: 'Near By', component: CarwashlistPage, icon:'navigate' },
      { title: 'Account', component: AccountPage, icon:'contact' },
      { title: 'Language', component: LanguagePage, icon:'at' },
      { title: 'Support', component: SupportPage, icon:'help' },
      { title: 'Share and Earn', component: WalletPage, icon:'share' }
    ];
  });
  
	  if(localStorage.getItem("user_id") == null || localStorage.getItem("user_id") == ""){		
		     this.rootPage = LoginPage;
  }else{
	  this.rootPage = HomePage;
 
  }
 
 this.pages = [
      {  title: 'Home', component: HomePage, icon:'home' },
      { title: 'Explore', component: StorePage, icon:'locate' },
      { title: 'Notification', component: NotificationPage, icon:'notifications' },
      { title: 'Near By', component: CarwashlistPage, icon:'navigate' },
      { title: 'Account', component: AccountPage, icon:'contact' },
      { title: 'Language', component: LanguagePage, icon:'at' },
      { title: 'Support', component: SupportPage, icon:'help' },
      { title: 'Share and Earn', component: WalletPage, icon:'share' }
    ];
    
    this.initializeApp();
	
	  if(localStorage.getItem("user_id") == null || localStorage.getItem("user_id") == ""){		
		      this.rootPage = LoginPage;
  }else{
	  this.rootPage = HomePage;
	 
	if(localStorage.getItem("user_name") != null && localStorage.getItem("user_name") != ''){
 this.name= localStorage.getItem("user_name");
	}else{
		this.name='';
	}
	if(localStorage.getItem("user_location") != null && localStorage.getItem("user_location") != ''){
 this.user_location = localStorage.getItem("user_location");
	}else{
		this.user_location = '';
	}
	if(localStorage.getItem("user_profile_img") != null && localStorage.getItem("user_profile_img") != ''){
 this.profile= localStorage.getItem("user_profile_img");
	}else{
		this.profile = '';
	}
 if(this.profile == ''){
	 this.profile = 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png';
 }
 
  }
    // used for an example of ngFor and navigation
   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  logout() {
	  localStorage.setItem("user_id", '');
localStorage.setItem("user_email", '');
localStorage.setItem("user_name", '');
localStorage.setItem("user_phone", '');
localStorage.setItem("user_social_media", '');
localStorage.setItem("user_profile_img", '');
localStorage.setItem("user_location", '');
   this.menuCtrl.close();
this.nav.setRoot(LoginPage);
  }
}
