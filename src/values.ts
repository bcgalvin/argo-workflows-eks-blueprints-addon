export interface ValuesSchema {
  readonly images?: Images;
  readonly createAggregateRoles?: boolean;
  readonly nameOverride?: string;
  readonly fullnameOverride?: string;
  readonly kubeVersionOverride?: string;
  readonly singleNamespace?: boolean;
  readonly workflow?: Workflow;
  readonly controller?: Controller;
  readonly mainContainer?: Executor;
  readonly executor?: Executor;
  readonly server?: Server;
  readonly useDefaultArtifactRepo?: boolean;
  readonly useStaticCredentials?: boolean;
  readonly artifactRepository?: ArtifactRepository;
}

export interface ArtifactRepository {
  readonly archiveLogs?: boolean;
  readonly s3?: S3;
  readonly gcs?: Values;
}

export interface Values {
  readonly [key: string]: any;
}

export interface S3 {
  readonly accessKeySecret?: KeySecret;
  readonly secretKeySecret?: KeySecret;
  readonly insecure?: boolean;
  readonly bucket?: string;
  readonly endpoint?: string;
  readonly region?: string;
  readonly roleArn?: string;
  readonly useSDKCreds?: boolean;
  readonly encryptionOptions?: EncryptionOptions;
}

export interface EncryptionOptions {
  readonly enableEncryption?: boolean;
}

export interface KeySecret {
  readonly key?: string;
}

export interface Controller {
  readonly image?: Image;
  readonly parallelism?: string;
  readonly resourceRateLimit?: Values;
  readonly rbac?: Rbac;
  readonly namespaceParallelism?: string;
  readonly initialDelay?: string;
  readonly deploymentAnnotations?: Values;
  readonly podAnnotations?: Values;
  readonly podLabels?: Values;
  readonly podSecurityContext?: Values;
  readonly metricsConfig?: Config;
  readonly securityContext?: SecurityContext;
  readonly persistence?: Values;
  readonly workflowDefaults?: Values;
  readonly workflowWorkers?: string;
  readonly workflowRestrictions?: Values;
  readonly telemetryConfig?: Config;
  readonly serviceMonitor?: ServiceMonitor;
  readonly serviceAccount?: ServiceAccount;
  readonly name?: string;
  readonly workflowNamespaces?: string[];
  readonly containerRuntimeExecutor?: string;
  readonly containerRuntimeExecutors?: any[];
  readonly instanceID?: InstanceID;
  readonly logging?: Logging;
  readonly serviceType?: string;
  readonly serviceAnnotations?: Values;
  readonly serviceLabels?: Values;
  readonly loadBalancerSourceRanges?: any[];
  readonly resources?: Values;
  readonly livenessProbe?: LivenessProbe;
  readonly extraEnv?: any[];
  readonly extraArgs?: any[];
  readonly volumeMounts?: any[];
  readonly volumes?: any[];
  readonly replicas?: number;
  readonly pdb?: ClusterWorkflowTemplates;
  readonly nodeSelector?: NodeSelector;
  readonly tolerations?: any[];
  readonly affinity?: Values;
  readonly priorityClassName?: string;
  readonly links?: any[];
  readonly navColor?: string;
  readonly clusterWorkflowTemplates?: ClusterWorkflowTemplates;
  readonly extraContainers?: any[];
}

export interface ClusterWorkflowTemplates {
  readonly enabled?: boolean;
}

export interface Image {
  readonly registry?: string;
  readonly repository?: string;
  readonly tag?: string;
}

export interface InstanceID {
  readonly enabled?: boolean;
  readonly useReleaseName?: boolean;
  readonly explicitID?: string;
}

export interface LivenessProbe {
  readonly httpGet?: HTTPGet;
  readonly failureThreshold?: number;
  readonly initialDelaySeconds?: number;
  readonly periodSeconds?: number;
  readonly timeoutSeconds?: number;
}

export interface HTTPGet {
  readonly port?: number;
  readonly path?: string;
}

export interface Logging {
  readonly level?: string;
  readonly globallevel?: string;
}

export interface Config {
  readonly enabled?: boolean;
  readonly path?: string;
  readonly port?: number;
  readonly portName?: string;
  readonly servicePort?: number;
  readonly servicePortName?: string;
}

export interface NodeSelector {
  readonly 'kubernetes.io/os'?: string;
}

export interface Rbac {
  readonly create?: boolean;
}

export interface SecurityContext {
  readonly readOnlyRootFilesystem?: boolean;
  readonly runAsNonRoot?: boolean;
  readonly allowPrivilegeEscalation?: boolean;
  readonly capabilities?: Capabilities;
}

export interface Capabilities {
  readonly drop?: string[];
}

export interface ServiceAccount {
  readonly create?: boolean;
  readonly name?: string;
  readonly annotations?: Values;
}

export interface ServiceMonitor {
  readonly enabled?: boolean;
  readonly additionalLabels?: Values;
  readonly namespace?: string;
}

export interface Executor {
  readonly image?: Image;
  readonly resources?: Values;
  readonly env?: Values;
  readonly securityContext?: Values;
  readonly imagePullPolicy?: string;
}

export interface Images {
  readonly tag?: string;
  readonly pullPolicy?: string;
  readonly pullSecrets?: any[];
}

export interface Server {
  readonly enabled?: boolean;
  readonly baseHref?: string;
  readonly image?: Image;
  readonly deploymentAnnotations?: Values;
  readonly podAnnotations?: Values;
  readonly podLabels?: Values;
  readonly podSecurityContext?: Values;
  readonly rbac?: Rbac;
  readonly securityContext?: SecurityContext;
  readonly name?: string;
  readonly serviceType?: string;
  readonly servicePort?: number;
  readonly serviceNodePort?: string;
  readonly servicePortName?: string;
  readonly serviceAccount?: ServiceAccount;
  readonly serviceAnnotations?: Values;
  readonly serviceLabels?: Values;
  readonly loadBalancerIP?: string;
  readonly loadBalancerSourceRanges?: any[];
  readonly resources?: Values;
  readonly replicas?: number;
  readonly pdb?: ClusterWorkflowTemplates;
  readonly nodeSelector?: NodeSelector;
  readonly tolerations?: any[];
  readonly affinity?: Values;
  readonly priorityClassName?: string;
  readonly secure?: boolean;
  readonly extraEnv?: any[];
  readonly extraArgs?: any[];
  readonly volumeMounts?: any[];
  readonly volumes?: any[];
  readonly ingress?: Ingress;
  readonly clusterWorkflowTemplates?: PurpleClusterWorkflowTemplates;
  readonly sso?: Values;
  readonly extraContainers?: any[];
}

export interface PurpleClusterWorkflowTemplates {
  readonly enabled?: boolean;
  readonly enableEditing?: boolean;
}

export interface Ingress {
  readonly enabled?: boolean;
  readonly annotations?: Values;
  readonly labels?: Values;
  readonly ingressClassName?: string;
  readonly hosts?: any[];
  readonly paths?: string[];
  readonly pathType?: string;
  readonly extraPaths?: any[];
  readonly tls?: any[];
}

export interface Workflow {
  readonly namespace?: string;
  readonly serviceAccount?: ServiceAccount;
  readonly rbac?: Rbac;
}
