import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { BookPage } from '../book/book';
import { ContactPage } from '../contact/contact';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';
/**
 * Generated class for the FranchisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-franchise',
  templateUrl: 'franchise.html',
})
export class FranchisePage {

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
  }

  ionViewDidLoad() {
	   let loading = this.loadingCtrl.create({
    content: 'Loding...'
  });
  loading.present();
 
	  let headers = {
            'Content-Type': 'application/json'
        };
		 this.ldata.uid=localStorage.getItem("user_id");
   this.ldata.lang='';
    this.http.get('http://preferwork.com/apiproject/api/getProduct/franchise/'+this.navParams.get('pid'), this.ldata, headers)
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
  this.lat=this.product.lat;
  this.lang=this.product.lang;
  this.loadMap(this.lat,this.lang,this.name);
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
	   
    console.log('ionViewDidLoad CarwashPage');
  }
homeGo() {
 this.navCtrl.setRoot(HomePage);
  }
  productMove(pid) {	 
  
	  this.navCtrl.push(ContactPage, {pid: this.navParams.get('pid'),table:'franchise'});
  }
    loadMap(t,g,loc) {
      let mapEle = document.getElementById('map');
      let map = new google.maps.Map(mapEle, {
        center: new google.maps.LatLng(t, g),
        zoom: 16
      });

      let infoWindow = new google.maps.InfoWindow({
        content: '<div class="marker_maps"><h2>'+loc+'</h2></div>'
      });

      var image = {
        url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', // image is 256 x 256
        scaledSize : new google.maps.Size(60, 60),
      };

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(t, g),
        map: map,
        icon: image,
        title: 'Test Data'
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }
}
