import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  image: SafeResourceUrl;
  capturedPhoto: any;
  base64: string;

  constructor(private sanitizer: DomSanitizer, private uploadService: UploadService) { }
  async takePhoto() {
    this.capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: false,
    });
    console.log('captured photo ', this.capturedPhoto);
    console.log(typeof this.capturedPhoto);
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(this.capturedPhoto && (this.capturedPhoto.dataUrl));
    console.log('image: ', this.image);
    console.log(typeof this.image);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  uploadImage() {
    const imageName = new Date().toISOString() + 'name.png';
    const imageBlob = this.dataURItoBlob(this.capturedPhoto.dataUrl.replace('data:image/png;base64,',''));
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    this.uploadService.uploadFile(imageFile);
  }

}
