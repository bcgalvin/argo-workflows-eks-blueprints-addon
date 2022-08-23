export interface ValuesSchema {
  images?: Images;
  createAggregateRoles?: boolean;
  nameOverride?: string;
  fullnameOverride?: string;
  kubeVersionOverride?: string;
  singleNamespace?: boolean;
  workflow?: Workflow;
  controller?: Controller;
  mainContainer?: Executor;
  executor?: Executor;
  server?: Server;
  useDefaultArtifactRepo?: boolean;
  useStaticCredentials?: boolean;
  artifactRepository?: ArtifactRepository;
}

export interface ArtifactRepository {
  archiveLogs?: boolean;
  s3?: S3;
  gcs?: Values;
}

export interface Values {
  [key: string]: any;
}

export interface S3 {
  accessKeySecret?: KeySecret;
  secretKeySecret?: KeySecret;
  insecure?: boolean;
  bucket?: string;
  endpoint?: string;
  region?: string;
  roleArn?: string;
  useSDKCreds?: boolean;
  encryptionOptions?: EncryptionOptions;
}

export interface EncryptionOptions {
  enableEncryption?: boolean;
}

export interface KeySecret {
  key?: string;
}

export interface Controller {
  image?: Image;
  parallelism?: string;
  resourceRateLimit?: Values;
  rbac?: Rbac;
  namespaceParallelism?: string;
  initialDelay?: string;
  deploymentAnnotations?: Values;
  podAnnotations?: Values;
  podLabels?: Values;
  podSecurityContext?: Values;
  metricsConfig?: Config;
  securityContext?: SecurityContext;
  persistence?: Values;
  workflowDefaults?: Values;
  workflowWorkers?: string;
  workflowRestrictions?: Values;
  telemetryConfig?: Config;
  serviceMonitor?: ServiceMonitor;
  serviceAccount?: ServiceAccount;
  name?: string;
  workflowNamespaces?: string[];
  containerRuntimeExecutor?: string;
  containerRuntimeExecutors?: any[];
  instanceID?: InstanceID;
  logging?: Logging;
  serviceType?: string;
  serviceAnnotations?: Values;
  serviceLabels?: Values;
  loadBalancerSourceRanges?: any[];
  resources?: Values;
  livenessProbe?: LivenessProbe;
  extraEnv?: any[];
  extraArgs?: any[];
  volumeMounts?: any[];
  volumes?: any[];
  replicas?: number;
  pdb?: ClusterWorkflowTemplates;
  nodeSelector?: NodeSelector;
  tolerations?: any[];
  affinity?: Values;
  priorityClassName?: string;
  links?: any[];
  navColor?: string;
  clusterWorkflowTemplates?: ClusterWorkflowTemplates;
  extraContainers?: any[];
}

export interface ClusterWorkflowTemplates {
  enabled?: boolean;
}

export interface Image {
  registry?: string;
  repository?: string;
  tag?: string;
}

export interface InstanceID {
  enabled?: boolean;
  useReleaseName?: boolean;
  explicitID?: string;
}

export interface LivenessProbe {
  httpGet?: HTTPGet;
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
}

export interface HTTPGet {
  port?: number;
  path?: string;
}

export interface Logging {
  level?: string;
  globallevel?: string;
}

export interface Config {
  enabled?: boolean;
  path?: string;
  port?: number;
  portName?: string;
  servicePort?: number;
  servicePortName?: string;
}

export interface NodeSelector {
  'kubernetes.io/os'?: string;
}

export interface Rbac {
  create?: boolean;
}

export interface SecurityContext {
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
  allowPrivilegeEscalation?: boolean;
  capabilities?: Capabilities;
}

export interface Capabilities {
  drop?: string[];
}

export interface ServiceAccount {
  create?: boolean;
  name?: string;
  annotations?: Values;
}

export interface ServiceMonitor {
  enabled?: boolean;
  additionalLabels?: Values;
  namespace?: string;
}

export interface Executor {
  image?: Image;
  resources?: Values;
  env?: Values;
  securityContext?: Values;
  imagePullPolicy?: string;
}

export interface Images {
  tag?: string;
  pullPolicy?: string;
  pullSecrets?: any[];
}

export interface Server {
  enabled?: boolean;
  baseHref?: string;
  image?: Image;
  deploymentAnnotations?: Values;
  podAnnotations?: Values;
  podLabels?: Values;
  podSecurityContext?: Values;
  rbac?: Rbac;
  securityContext?: SecurityContext;
  name?: string;
  serviceType?: string;
  servicePort?: number;
  serviceNodePort?: string;
  servicePortName?: string;
  serviceAccount?: ServiceAccount;
  serviceAnnotations?: Values;
  serviceLabels?: Values;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: any[];
  resources?: Values;
  replicas?: number;
  pdb?: ClusterWorkflowTemplates;
  nodeSelector?: NodeSelector;
  tolerations?: any[];
  affinity?: Values;
  priorityClassName?: string;
  secure?: boolean;
  extraEnv?: any[];
  extraArgs?: any[];
  volumeMounts?: any[];
  volumes?: any[];
  ingress?: Ingress;
  clusterWorkflowTemplates?: PurpleClusterWorkflowTemplates;
  sso?: Values;
  extraContainers?: any[];
}

export interface PurpleClusterWorkflowTemplates {
  enabled?: boolean;
  enableEditing?: boolean;
}

export interface Ingress {
  enabled?: boolean;
  annotations?: Values;
  labels?: Values;
  ingressClassName?: string;
  hosts?: any[];
  paths?: string[];
  pathType?: string;
  extraPaths?: any[];
  tls?: any[];
}

export interface Workflow {
  namespace?: string;
  serviceAccount?: ServiceAccount;
  rbac?: Rbac;
}
