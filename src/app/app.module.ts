import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HTTP } from '@ionic-native/http';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ExplorePage } from '../pages/explore/explore';
import { NotificationPage } from '../pages/notification/notification';
import { NearbyPage } from '../pages/nearby/nearby';
import { AccountPage } from '../pages/account/account';
import { CarwashPage } from '../pages/carwash/carwash';
import { WalletPage } from '../pages/wallet/wallet';
import { ParkingPage } from '../pages/parking/parking';
import { StorePage } from '../pages/store/store';
import { ContactPage } from '../pages/contact/contact';
import { FranchisePage } from '../pages/franchise/franchise';
import { ProductPage } from '../pages/product/product';
import { FranchiselistPage } from '../pages/franchiselist/franchiselist';
import { SupportPage } from '../pages/support/support';
import { AddressPage } from '../pages/address/address';
import { LanguagePage } from '../pages/language/language';
import { CarwashlistPage } from '../pages/carwashlist/carwashlist';
import { BuyPage } from '../pages/buy/buy';
import { OrderdetailsPage } from '../pages/orderdetails/orderdetails';
import { BookPage } from '../pages/book/book';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrderconfirmPage } from '../pages/orderconfirm/orderconfirm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';
import { PayPal } from '@ionic-native/paypal';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ListPage,
	ExplorePage,
	NotificationPage,
	NearbyPage,
	AccountPage,
	SupportPage,
	CarwashPage,
	ParkingPage,
	StorePage,
	FranchisePage,
	ProductPage,
	AddressPage,
	BuyPage,
	BookPage,
	CheckoutPage,
	OrderdetailsPage,
	CarwashlistPage,
	ContactPage,
	FranchiselistPage,
	OrderconfirmPage,
	LanguagePage,
	WalletPage
  ],
  imports: [
    BrowserModule,	
	HttpModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ListPage,
	ExplorePage,
	NotificationPage,
	NearbyPage,
	AccountPage,
	SupportPage,
	CarwashPage,
	ParkingPage,
	StorePage,
	FranchisePage,
	ProductPage,
	AddressPage,
	BuyPage,
	BookPage,
	CheckoutPage,
	OrderdetailsPage,
	CarwashlistPage,
	ContactPage,
	FranchiselistPage,
	OrderconfirmPage,
	LanguagePage,
	WalletPage
  ],
  providers: [
    StatusBar,
	HTTP,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	FileTransfer,
  File,
  Camera,
    ApiProvider,
	PayPal,
	Facebook,
	GooglePlus,
	Geolocation,
	Diagnostic,
	SocialSharing
  ]
})
export class AppModule {}
