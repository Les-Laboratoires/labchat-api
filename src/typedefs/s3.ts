import AWS from "aws-sdk";

export interface ObjectAddOptions {
  ContentType: string;
  ACL: AWS.S3.ObjectCannedACL;
}

export interface S3ConstructorOptions {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint: string;
  bucket: string;
}