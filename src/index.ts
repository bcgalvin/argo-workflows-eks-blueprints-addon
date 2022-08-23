import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Cluster, ServiceAccount } from 'aws-cdk-lib/aws-eks';
import { Effect, PolicyDocument, PolicyStatement } from 'aws-cdk-lib/aws-iam';
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
    const namespace = this.options.namespace!;
    const release = this.options.release!;

    const ns = blueprints.utils.createNamespace(namespace, cluster, true, true);
    const sa = this.createServiceAccountWithIRSA(cluster, namespace, release, artifactRepositoryS3Bucket);
    sa.node.addDependency(ns);

    let values: ValuesSchema = {
      server: {
        extraArgs: ['--auth-mode=server'],
      },
      workflow: {
        // we manually create to give SA IRSA permissions
        serviceAccount: {
          create: false,
          name: sa.serviceAccountName,
        },
      },
      controller: {
        containerRuntimeExecutor: 'emissary',
        workflowNamespaces: ['default', namespace],
      },
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

    const chart = this.addHelmChart(clusterInfo, values, false);
    chart.node.addDependency(ns);
    return Promise.resolve(chart);
  }

  protected createServiceAccountWithIRSA(
    cluster: Cluster,
    namespace: string,
    release: string,
    s3Bucket: IBucket
  ): ServiceAccount {
    const argoWorkflowsPolicyDocument = new PolicyDocument({
      statements: [
        new PolicyStatement({
          actions: [
            'ecr:GetAuthorizationToken',
            'ecr:BatchCheckLayerAvailability',
            'ecr:GetDownloadUrlForLayer',
            'ecr:BatchGetImage',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
          ],
          effect: Effect.ALLOW,
          resources: ['*'],
        }),
      ],
    });

    const sa = blueprints.utils.createServiceAccount(cluster, release, namespace, argoWorkflowsPolicyDocument);
    s3Bucket.grantReadWrite(sa);

    return sa;
  }
}
