import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { CapacityType, KubernetesVersion, NodegroupAmiType } from 'aws-cdk-lib/aws-eks';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType } from 'aws-cdk-lib/aws-ec2';
import { ArgoWorkflowsAddOn, DirectS3BucketProvider } from '../../../src';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export class ArgoWorkflowsEksBlueprintAddonStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    blueprints.HelmAddOn.validateHelmVersions = true;
    const kubeVersion = KubernetesVersion.V1_21; // CDK eks doesn't support > 1.21 currently

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const s3Bucket = new Bucket(this, 'artifacts-bucket', {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const clusterProvider = new blueprints.MngClusterProvider({
      id: 'primary-mng',
      version: kubeVersion,
      minSize: 1,
      maxSize: 8,
      desiredSize: 4,
      amiType: NodegroupAmiType.AL2_X86_64,
      nodeGroupCapacityType: CapacityType.SPOT,
      instanceTypes: [
        InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MEDIUM),
        InstanceType.of(InstanceClass.M5, InstanceSize.LARGE),
      ],
    });

    blueprints.EksBlueprint.builder()
      .name('argo-workflows')
      .account(account)
      .region(region)
      .clusterProvider(clusterProvider)
      .resourceProvider('artifactRepositoryS3Bucket', new DirectS3BucketProvider(s3Bucket))
      .addOns(
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
        new blueprints.KubeviousAddOn(),
        // Argo Workflows
        new ArgoWorkflowsAddOn()
      )
      .enableControlPlaneLogTypes(blueprints.ControlPlaneLogType.API)
      .build(scope, `${id}-cluster`, {
        env: {
          account: account,
          region: region,
        },
      });
  }
}
