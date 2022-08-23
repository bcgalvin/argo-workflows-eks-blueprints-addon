import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3';

export class LookupS3BucketNameProvider implements blueprints.ResourceProvider<IBucket> {
  readonly bucketName: string;

  constructor(bucketName: string, private id?: string) {
    this.bucketName = bucketName;
  }

  provide(context: blueprints.ResourceContext): IBucket {
    return Bucket.fromBucketName(context.scope, this.id ?? `${this.bucketName}-lookup`, this.bucketName);
  }
}

export class LookupS3BucketArnProvider implements blueprints.ResourceProvider<IBucket> {
  readonly bucketArn: string;

  constructor(bucketArn: string, private id?: string) {
    this.bucketArn = bucketArn;
  }

  provide(context: blueprints.ResourceContext): IBucket {
    return Bucket.fromBucketArn(context.scope, this.id ?? `${this.bucketArn}-lookup`, this.bucketArn);
  }
}

export class DirectS3BucketProvider implements blueprints.ResourceProvider<IBucket> {
  constructor(readonly bucket: IBucket) {}

  provide(_context: blueprints.ResourceContext): IBucket {
    return this.bucket;
  }
}
