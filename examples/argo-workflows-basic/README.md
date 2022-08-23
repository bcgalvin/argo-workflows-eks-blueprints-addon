# Argo Workflows EKS Blueprint Addon

### Installation

To get started with this EKS Blueprint addon, first make sure you have the dependencies listed below installed on your
machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [CDK cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

If you've never used CDK before, you'll also need to bootstrap your AWS account with the required infrastructure for it
to work its magic. You can read more about what resources get created when you first bootstrapping your AWS
account [here](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).

Once you're account is setup to work with CDK, the last step is to install the project dependencies:

```bash
rm -rf node_modules
rm package-lock.json
npm i
```

The Final step is to set the `CDK_DEFAULT_ACCOUNT` and `CDK_DEFAULT_REGION` environment variables that the stack will
use to deploy to the right environment.


---

### Usage

You can deploy the infrastructure in the example stack with the following command (takes ~25 minutes to complete):

```bash
cdk deploy --require-approval=never --all
```

After everything is deployed successfully, you'll be able to access the EKS cluster from the `kubectl` commands that are
provided in the stack output:

```
✅ argo-workflows-stack-cluster

Outputs:
argo-workflows-stack-cluster.argoworkflowsstackclusterClusterName6BB67BDD = argo-workflows-stack-cluster
argo-workflows-stack-cluster.argoworkflowsstackclusterConfigCommand61C86EA6 = aws eks update-kubeconfig --name
argo-workflows-stack-cluster --region us-west-2 --role-arn arn:aws:iam::570405429484:
role/argo-workflows-stack-clus-argoworkflowsstackcluste-1BK5DDT23EMF3
argo-workflows-stack-cluster.argoworkflowsstackclusterGetTokenCommand4FC5CB4E = aws eks get-token --cluster-name
argo-workflows-stack-cluster --region us-west-2 --role-arn arn:aws:iam::570405429484:
role/argo-workflows-stack-clus-argoworkflowsstackcluste-1BK5DDT23EMF3
Stack ARN:
arn:aws:cloudformation:us-west-2:1234789012:stack/argo-workflows-stack-cluster/78a410f0-22d5-11ed-9aff-0a3616eba9df
```

Get server deployment:

```bash
(base) argo-workflows-eks-blueprints-addon [main] k get deployments -n argo
NAME                                                  READY   UP-TO-DATE   AVAILABLE   AGE
blueprints-addon-argo-workflows-server                1/1     1            1           116m
blueprints-addon-argo-workflows-workflow-controller   1/1     1            1           116m
```

Open a port-forward to access the UI:

```bash
(base) argo-workflows-eks-blueprints-addon [main] k -n argo port-forward deployment/blueprints-addon-argo-workflows-server 2746:2746
Forwarding from 127.0.0.1:2746 -> 2746
Forwarding from [::1]:2746 -> 2746
Handling connection for 2746
```

![UI](../../docs/argo-workflows.png)
