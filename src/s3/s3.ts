import AWS from "aws-sdk";

import { ObjectAddOptions, S3ConstructorOptions } from "../typedefs/s3";

class S3 {
  private readonly client: AWS.S3;
  private static instance: S3;
  private readonly region: string;
  private readonly bucket: string;
  private constructor(options: S3ConstructorOptions) {
    this.client = new AWS.S3({
      ...options,
      signatureVersion: "v2",
    });
    this.region = options.region;
    this.bucket = options.bucket;
  }

  public static getInstance(): S3 {
    if (S3.instance) return this.instance;
    else {
      if (!process.env.S3_SCW_SECRET_ACCESS_KEY)
        throw new Error("Missing S3 scaleway secret access key in env");
      if (!process.env.S3_SCW_ACCESS_KEY_ID)
        throw new Error("Missing S3 scaleway access key id in env");
      if (!process.env.S3_SCW_REGION)
        throw new Error("Missing S3 scaleway region in env");
      if (!process.env.S3_SCW_ENDPOINT)
        throw new Error("Missing S3 scaleway endpoint in env");
      if (!process.env.S3_SCW_BUCKET)
        throw new Error("Missing S3 scaleway bucket");
      S3.instance = new S3({
        secretAccessKey: process.env.S3_SCW_SECRET_ACCESS_KEY,
        accessKeyId: process.env.S3_SCW_ACCESS_KEY_ID,
        region: process.env.S3_SCW_REGION,
        endpoint: process.env.S3_SCW_REGION,
        bucket: process.env.S3_SCW_BUCKET,
      });
      return this.getInstance();
    }
  }

  addObject(
    file: string | ReadableStream,
    key: string,
    options: ObjectAddOptions = {
      ContentType: "application/octet-stream",
      ACL: "public-read",
    }
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      new AWS.S3.ManagedUpload({
        partSize: 10 * 1024 * 1024,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ...options,
        },
        service: this.client,
      }).send((err: AWS.AWSError, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  deleteObject(key: string): Promise<AWS.S3.DeleteObjectOutput> {
    return new Promise((resolve, reject) => {
      this.client.deleteObject(
        {
          Key: key,
          Bucket: this.bucket,
        },
        (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  editACL(key: string, ACL: AWS.S3.BucketCannedACL) {
    return new Promise((resolve, reject) => {
      this.client.putObjectAcl(
        {
          Key: key,
          Bucket: this.bucket,
          ACL,
        },
        (err: AWS.AWSError, data: AWS.S3.PutObjectAclOutput) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }
}
