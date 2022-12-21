## NextJs application is forked
Forked js application form: https://github.com/stuartmackenzie/nextjs-single-page-template


### Deploy Nextjs application in AWS EKS cluster using Github actions

Github repository: https://github.com/lukaevet/aws-eks-nextjs-app-actions
Create ECR repository in AWS called  nextjs-application

#### Creating AWS EKS cluster using eksctl cli

Ref: https://towardsdatascience.com/kubernetes-application-deployment-with-aws-eks-and-ecr-4600e11b2d3c

Upload CloudFormation stack to AWS with pre-existing stack `aws-eks-private-vpc-subnet.yaml` file with cluster name for example: `EKS-Demo-Cluster`
 Edit `cluster.yaml` file and add newly created vpc and subnet id's of private and public AZ's.

Upload cluster to our AWS account 
``eksctl create cluster -f cluster.yaml``

Update kube config file with: 
`aws eks --region eu-central-1 update-kubeconfig --name EKS-Demo-Cluster`

Apply service manifest to out node:
`kubectl apply -f service1.yaml`

To get external IP for our node
`kubectl get nodes -o wide`
and that will show our 2 public workers with public IP addresses and 1 private 

Finally we have to add inbound rule to our security group to allow listening on port 31479 port; port we have specified in our service manifest file. And that is also external port that that connection to the internet.
To do that go to:
Security groups and search for public SG for our cluster - `eksctl-EKS-Demo-Cluster-nodegroup-EKS-public-workers`
Add inbound rule for port 3179 to everyone in IPv4.

### Github actions
Next add everything and push it to our Github repository. 
 Add secrets in your Github: Settings/Actions/secrets for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ACCOUNT_ID

Github actions workflow ref: https://github.com/marketplace/actions/aws-ecr-eks
Every time someone pushes code to your repository Github actions will be triggered and it will login to your AWS account and it will build, push and deploy nextjs application to your ECR image.
Application will be deployed to your cluster we have created and it will apply deployment file in our root repository called deployment1.yaml that creates 2 replicas and has our new ECR image with tag latest.
Access our application with IP address from `kubectl get nodes -o wide`. In browser http://external_IP:31479
