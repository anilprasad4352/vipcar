import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { OrderconfirmPage } from '../orderconfirm/orderconfirm';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { HTTP } from '@ionic-native/http';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
	 product: any;
  name:any;
  img:any;
  pid:any;
  address:any;
  highlights:any;
  rating_count:any;
  review_count:any;
  price:any;
  uprice:any;
  payment_type:any;
  payment_mode:any;
  shipping={
	  name:'',
	  email:'',
	  phone:'',
	  address:'',
	  country:'',
	  state:'',
	  city:'',
	  landmark:'',
	  pin:'',
	  notes:'',
	  user_id:'',
	  payment_mode:'',
	  amount:'',
	  coupon:''
  }
 
 loginv={
	  limit:'5'
  }
  key={
	  paypal:'',
	  stripe:''
  }
    langdata:any;
    ldata={
	uid:'',
	lang:''
}

  list1:any;
   items = [
    {name:'Cash on Delivery', active:false,id:'1'},
    {name:'Paypal', active:false,  id:'3'}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public apiProvider: ApiProvider, private http: HTTP,private payPal: PayPal) {
 this.payment_type='';
 this.uprice=0;
  let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  this.langdata=JSON.parse(localStorage.getItem("langdata"));
   let headers = {
            'Content-Type': 'application/json'
        };
  loading.present();
   console.log(this.navParams.get('pid'));
 
	  
	   this.http.get('http://preferwork.com/apiproject/api/getProduct/store/'+this.navParams.get('pid'), this.loginv, headers)
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
  this.review_count=this.product.review_count;
  this.price=this.product.price;
}else{
	
}
   

  })
  .catch(error => {


	

  });
  
    
	   this.http.get('http://preferwork.com/apiproject/api/getProducts/payment_seeting/', this.loginv, headers)
  .then(data => {
loading.dismiss();
let d= JSON.parse(data.data);	
if(d.status==true){	
this.list1=d.products;
          this.product=this.list1[0];
	this.key.paypal=this.product.paypal_client_id;
	this.key.stripe=this.product.stripe_key;
}else{
	
}
     })
  .catch(error => {

	

  });
  
  
  
	  loading.dismiss();
	  
 }
 applyPromo(){
	 let send={
		 promo:this.shipping.coupon,
		 pid:this.pid
	 }
	  let loading = this.loadingCtrl.create({
    content: 'Applying promo...'
  });
   let headers = {
            'Content-Type': 'application/json'
        };
  loading.present();
	 
	 this.http.get('http://preferwork.com/apiproject/api/applyPromo/', send, headers)
  .then(data => {

let d= JSON.parse(data.data);	
if(d.status==true){	
let v =d.promo;
this.uprice=v.amount;
const alert = this.alertCtrl.create({
      title: 'Promo Code',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
}else{
	this.shipping.coupon='';
	const alert = this.alertCtrl.create({
      title: 'Promo Code Error',
      subTitle: d.msg,
      buttons: ['OK']
    });
    alert.present();
}
     })
  .catch(error => {

	

  });
  loading.dismiss();
 }
paymentType(item) { 
	this.items[0].active=false;
	this.items[1].active=false;
	item.active = !item.active;
	this.payment_type=item.id;
	if(item.id=='1'){
	this.payment_mode="Cash On Delivery";	
	}
	if(item.id=='2'){
	this.payment_mode="Credit Card";	
	}
	if(item.id=='3'){
	this.payment_mode="Paypal";	
	}
}
 validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno))
        {
      return true;
        }
      else
        {
        return false;
        }
}


gotoCheckout() {
	if(this.validateEmail(this.shipping.email) && this.phonenumber(this.shipping.phone)){
	if(this.payment_type!=''){
		if(this.shipping.name!='' && this.shipping.email!='' && this.shipping.phone!='' && this.shipping.address!='' && this.shipping.city!='' && this.shipping.state!='' && this.shipping.pin!=''){
			
			//Process Order
			if(this.payment_type=='3'){
				this.payPal.init({
  PayPalEnvironmentProduction: this.key.paypal,
    PayPalEnvironmentSandbox: 'ARNboOJLH8X4valb8cr9bi8gSfqEfDsCZ3T3L9Yn4j5WoMsAR2M9aaHPf_hXPjkds5SAR1BfiyERhgJ-'
}).then(() => {
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    let payment = new PayPalPayment(this.price, 'USD', 'Description', this.name);
    this.payPal.renderSinglePaymentUI(payment).then(() => {
     	let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
   let headers = {
            'Content-Type': 'application/json'
        };
  loading.present();
   console.log(this.pid);
   let uid=localStorage.getItem("user_id");
   
  let d1={
	 'user_id':uid,
	 'name':this.shipping.name,
	 'email':this.shipping.email,
	 'phone':this.shipping.phone,
	 'address':this.shipping.address,
	 'state':this.shipping.state,
	 'city':this.shipping.city,
	 'landmark':this.shipping.landmark,
	 'pin':this.shipping.pin,
	 'notes':this.shipping.notes,
	 'price':this.price,
	 'payment_mode':this.payment_mode,
	 'payment_notes':'COD Orders',
	 'product_name':this.name,
	 'product_image':this.img,
	 'uprice':this.uprice,
	 'product_data':this.pid	 
 }

	  
	   this.http.get('http://preferwork.com/apiproject/api/order', d1, headers)
  .then(data => {
loading.dismiss();
	

this.shipping={
	  name:'',
	  email:'',
	  phone:'',
	  address:'',
	  country:'',
	  state:'',
	  city:'',
	  landmark:'',
	  pin:'',
	  notes:'',
	  user_id:'',
	  payment_mode:'',
	  amount:'',
	  coupon:'',
  }
  this.navCtrl.setRoot(OrderconfirmPage);
  })
  .catch(error => {
loading.dismiss();
const alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: JSON.stringify(d1),
      buttons: ['OK']
    });
    alert.present();
	
	

  });
  
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
			}
			if(this.payment_type=='1'){
			let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
   let headers = {
            'Content-Type': 'application/json'
        };
  loading.present();
   console.log(this.pid);
   let uid=localStorage.getItem("user_id");
 
  
 let d2={
	 'user_id':uid,
	 'name':this.shipping.name,
	 'email':this.shipping.email,
	 'phone':this.shipping.phone,
	 'address':this.shipping.address,
	 'state':this.shipping.state,
	 'city':this.shipping.city,
	 'landmark':this.shipping.landmark,
	 'pin':this.shipping.pin,
	 'notes':this.shipping.notes,
	 'shipping_info':'shipping',
	 'price':this.price,
	 'payment_mode':this.payment_mode,
	 'payment_notes':'COD Orders',
	 'product_name':this.name,
	 'product_image':this.img,
	 'uprice':this.uprice,
	 'product_data':this.pid	 
 }
	  

	   this.http.get('http://preferwork.com/apiproject/api/order', d2, headers)
  .then(data => {
loading.dismiss();

this.shipping={
	  name:'',
	  email:'',
	  phone:'',
	  address:'',
	  country:'',
	  state:'',
	  city:'',
	  landmark:'',
	  pin:'',
	  notes:'',
	  user_id:'',
	  payment_mode:'',
	  amount:'',
	  coupon:''
  }
  this.navCtrl.setRoot(OrderconfirmPage);
  
  })
  .catch(error => {
loading.dismiss();


  });
  	this.navCtrl.setRoot(OrderconfirmPage);
			}
		}else{
		const alert = this.alertCtrl.create({
      title: 'Checkout Error',
      subTitle: 'Please fill shipping Details',
      buttons: ['OK']
    });
    alert.present();	
		}
	}else{
		const alert = this.alertCtrl.create({
      title: 'Checkout Error',
      subTitle: 'Please choose Payment Method ',
      buttons: ['OK']
    });
    alert.present();
	}
	}else{
		if(this.validateEmail(this.shipping.email)){
			const alert = this.alertCtrl.create({
      title: 'Checkout Error',
      subTitle: 'Please enter valid phone',
      buttons: ['OK']
    });
    alert.present();
		}else{
			const alert = this.alertCtrl.create({
      title: 'Checkout Error',
      subTitle: 'Please enter valid email',
      buttons: ['OK']
    });
    alert.present();
		}
	}
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
