import * as blueprints from '@aws-quickstart/eks-blueprints';
import { ClusterInfo } from '@aws-quickstart/eks-blueprints';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { ValuesSchema } from './values';

export interface ArgoWorkflowsAddOnProps extends blueprints.HelmAddOnUserProps {
  values?: ValuesSchema;
}

export const defaultProps: blueprints.HelmAddOnProps = {
  name: 'argo',
  namespace: 'argo',
  chart: 'argo-workflows',
  version: '0.17.0',
  release: 'blueprints-addon-argo-workflows',
  repository: 'https://argoproj.github.io/argo-helm',
};

export class ArgoWorkflowsAddOn extends blueprints.HelmAddOn {
  constructor(props: ArgoWorkflowsAddOnProps) {
    super({ ...defaultProps, ...props });
  }

  deploy(clusterInfo: ClusterInfo): Promise<Construct> {
    const cluster = clusterInfo.cluster;

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
