import * as blueprints from '@aws-quickstart/eks-blueprints';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { ValuesSchema } from './values';

export * from './s3-resource-provider';

export interface ArgoWorkflowsAddOnProps extends blueprints.HelmAddOnUserProps, ValuesSchema {}

export const defaultProps: blueprints.HelmAddOnProps = {
  name: 'argo',
  namespace: 'argo',
  chart: 'argo-workflows',
  version: '0.17.0',
  release: 'blueprints-addon-argo-workflows',
  repository: 'https://argoproj.github.io/argo-helm',
};

export class ArgoWorkflowsAddOn extends blueprints.HelmAddOn {
  readonly options: ArgoWorkflowsAddOnProps;

  constructor(props?: ArgoWorkflowsAddOnProps) {
    super({ ...defaultProps, ...props });
    this.options = { ...defaultProps, ...props };
  }

  deploy(clusterInfo: blueprints.ClusterInfo): Promise<Construct> {
    const cluster = clusterInfo.cluster;
    const artifactRepositoryS3Bucket: IBucket = clusterInfo.getRequiredResource('artifactRepositoryS3Bucket');

    let values: ValuesSchema = {
      server: {
        extraArgs: ['--auth-mode=server'],
      },
      workflow: {
        serviceAccount: { create: true },
      },
      controller: { containerRuntimeExecutor: 'emissary' },
      useDefaultArtifactRepo: true,
      useStaticCredentials: false,
      artifactRepository: {
        s3: {
          bucket: artifactRepositoryS3Bucket.bucketName,
          region: cluster.stack.region,
          endpoint: 's3.amazonaws.com',
          useSDKCreds: true,
          insecure: false,
        },
      },
    };
    values = merge(values, this.props.values ?? {});

    const chart = this.addHelmChart(clusterInfo, values);
    return Promise.resolve(chart);
  }
}
