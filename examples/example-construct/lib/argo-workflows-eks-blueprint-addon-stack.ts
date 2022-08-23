import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import { Stack, StackProps } from 'aws-cdk-lib';

export class ArgoWorkflowsEksBlueprintAddonStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    blueprints.HelmAddOn.validateHelmVersions = true;
    const kubeVersion = KubernetesVersion.V1_21; // CDK eks doesn't support > 1.21 currently

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const addOns: Array<blueprints.ClusterAddOn> = [
      // EkS Addons
      new blueprints.VpcCniAddOn(),
      new blueprints.CoreDnsAddOn(),
      new blueprints.KubeProxyAddOn(),
      new blueprints.EbsCsiDriverAddOn(),
      // Helm Addons
      new blueprints.MetricsServerAddOn(),
      // Cluster Addons
      new blueprints.SSMAgentAddOn(),
      new blueprints.ClusterAutoScalerAddOn(),
      new blueprints.XrayAddOn(),
    ];

    blueprints.EksBlueprint.builder()
      .name('argo-workflows')
      .account(account)
      .region(region)
      .version(kubeVersion)
      .addOns(...addOns)
      .enableControlPlaneLogTypes(blueprints.ControlPlaneLogType.API)
      .build(scope, `${id}-cluster`, {
        env: {
          account: account,
          region: region,
        },
      });
  }
}
