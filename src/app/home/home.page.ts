import { Component } from '@angular/core';
import { PhotoService } from './camera-service.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const { Camera, Filesystem, Storage } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public photoService: PhotoService,
    private emailComposer: EmailComposer,
    public sanitizer: DomSanitizer,
    private geolocation: Geolocation) {}

  imagePath;
  mapUrl;
  comment;
  address;
  time;
  capPhoto;

  ngOnInit() {
    this.getLocation()
  }

  isformvalid(){
    return !(this.comment&&this.address&&this.time&&this.capPhoto)
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 10 // highest quality (0 to 100)
    });
    this.imagePath=this.sanitizer.bypassSecurityTrustUrl(capturedPhoto.webPath);
    this.capPhoto=capturedPhoto.path;
    console.log(this.imagePath)

    console.log(capturedPhoto);

    
    // Send a text message using default options
    // then use alias when sending email
      // this.email.open({
      //   app: 'gmail',
      // });
    
    // const savedImageFile = await this.savePicture(capturedPhoto);

    // console.log(savedImageFile)
    // Add new photo to Photos array
    // this.photos.unshift(savedImageFile);

    // Cache all photo data for future retrieval
    // Storage.set({
    //   key: this.PHOTO_STORAGE,
    //   value: JSON.stringify(this.photos)
    // });
  }

  // label1=false

  labels=[
    {
      label:"Furnaces -A/C Units",
      value:false
    },
    {
      label:"Gas Fireplaces & Inserts",
      value:false
    },
    {
      label:"Duct Design",
      value:false
    },
    {
      label:"Humidifiers",
      value:false
    },
    {
      label:"Ductless Systems",
      value:false
    },
    {
      label:"Rooftop Units",
      value:false
    },
    {
      label:"Air Cleaners/Filtration",
      value:false
    },
    {
      label:"HRV’s (heat recovery ventilation)",
      value:false
    },
    {
      label:"Gas & Bar-b-q Hook-ups",
      value:false
    },
    {
      label:"Water Heaters (tank & tankless)",
      value:false
    }
  ]


  sendMail(){
    let email = {
      to: 'toemail@gmail.com',
      cc: 'ccemail@mustermann.de',
      bcc: ['bcc1@doe.com', 'bcc2@doe.com'],
      attachments: [
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
        this.capPhoto
      ],
      subject: 'Subject',
      body: `
      Address : ${this.address}<br/>
      comments : ${this.comment}<br/>
      time : ${new Date(this.time).toLocaleTimeString()}<br/>
      `,
      isHtml: true
    }

    if (this.mapUrl) {
      email.body=email.body+"location : "+this.mapUrl+"<br/>" 
    }

    this.labels.forEach(item => {
      if (item.value) {
        email.body=email.body+item.label+"<br/>" 
      }
    });
    
    console.log(this.imagePath)
    console.log(this.address)
    console.log(this.comment)
    console.log(new Date(this.time).toLocaleTimeString())
    console.log(this.labels)
    console.log(email)
    this.emailComposer.open(email);
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(res)
      this.mapUrl='http://maps.google.com/maps?q='+res.coords.latitude+','+res.coords.longitude
      // console.log(this.mapUrl)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
