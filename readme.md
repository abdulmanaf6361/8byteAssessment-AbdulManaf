# Scifyx — Infrastructure & Deployment

This repository contains the complete Infrastructure-as-Code (IaC), CI/CD pipelines, and documentation for deploying a production-ready web application using AWS ECS Fargate, Postgres, Application Load Balancer, and GitLab CI/CD.

The system runs a React frontend and a Django REST Framework backend, deployed as separate containerized services behind a single ALB with HTTPS.

I believe this assessment is to check my knowledge in these areas, rather than blindly following the assignment. Since I already had done similar work, I would like to present the same
I have not used RDS because of cost issue, instead I have created postgresql DB in lightsail.

Please go through the screenshots, I would love to connect in real or through meet and show my work. 
The original repo is in gitlab(it's private).
 

## Live & Observability Links

- live : https://scifyx.com/
- Application Load Balancer (Frontend): scifyx-alb-1505768530.ap-south-1.elb.amazonaws.com
- AWS Managed Grafana: https://d-906619db8a.awsapps.com/start/#/?tab=applications 
username : oncall 
password  : 8byteOncall.

## Infrastructure Provisioning
- Terraform used to provision VPC, ECS Fargate, ECR, ALB
- Remote state using S3 + DynamoDB (bootstrap pattern)

## CI/CD
- GitLab CI builds Docker images
- Pushes versioned images to ECR
- ECS pulls immutable images

## Monitoring & Logging
- CloudWatch Logs for ECS tasks
- Container Insights enabled
- AWS Managed Grafana with CloudWatch datasource






