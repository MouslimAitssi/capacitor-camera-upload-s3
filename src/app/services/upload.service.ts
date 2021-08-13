/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor() { }

  uploadFile(file) {
    const bucket = new S3(
      {
        accessKeyId: 'AKIA2BFSFRXCD5T3LHS6',
        secretAccessKey: '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'
      }
    );
    const params = {
      Bucket: 'shipinfy-proof-of-action',
      Key: 'proofs/' + new Date(),
      Body: file
    };
    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
