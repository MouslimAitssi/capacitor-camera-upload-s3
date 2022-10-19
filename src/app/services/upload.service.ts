/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileToUpload: File;
  progressPercentage: number;
  isFileUploading = false;
  isFileUploaded = false;

  constructor() { }

  uploadFile(file) {
    this.fileToUpload = file;
    const upload = new S3.ManagedUpload({
      params: {
        Bucket: 'shipinfy-proof-of-action',
        Key: 'proofs/' + new Date(),
        Body: file
      },
      service: new S3(
        {
          accessKeyId: ${ACCESS_KEY_ID},
          secretAccessKey: ${SECRET_ACCESS_KEY}
        }
      )
    }).on('httpUploadProgress', (progress) => {
      this.isFileUploading = true;
      this.isFileUploaded = false;
      this.progressPercentage = Math.round(progress.loaded / progress.total * 100);
      console.log(this.progressPercentage);
    });

    upload.promise()
    .then(data=>{
      this.isFileUploaded = true;
      this.isFileUploading = false;
      console.log('Finished');
      console.log(data);
    }).catch(err=>console.log('Err: ', err));
    /* bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    }); */
  }
}
