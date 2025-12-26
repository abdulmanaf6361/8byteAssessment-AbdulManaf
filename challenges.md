Challenges & Resolutions
This document captures real implementation issues and how they were resolved.

1. ECS Tasks Failing to Pull Images from ECR
Issue: ECS tasks failed with the error: unable to pull registry auth from Amazon ECR
Root Cause: ECS tasks were running in private subnets without proper outbound network access.
Resolution: Fixed VPC and subnet configuration, verified outbound internet access for Fargate tasks, ensured the correct ECS execution IAM role was attached.

2. Django Failing ALB Health Checks
Issue: The Application Load Balancer (ALB) marked backend targets as unhealthy.
Root Cause: Django enforced SECURE_SSL_REDIRECT, ALB health checks use HTTP internally, Django was not aware it was running behind a proxy.
Resolution: Configured Django to trust the forwarded protocol header: SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https"). This allowed Django to correctly interpret ALB-forwarded requests.

3. DisallowedHost Errors in ECS
Issue: Django raised the following error: Invalid HTTP_HOST header: '172.x.x.x:8000'
Root Cause: ALB health checks originate from private IP addresses that were not included in ALLOWED_HOSTS.
Resolution: Relaxed host validation for containerized environments: ALLOWED_HOSTS = ["*"]. Network security is enforced at the ALB and Security Group level instead.

4. Grafana Custom Domain with HSTS Failure
Issue: Custom domain configuration for Amazon Managed Grafana failed with: ERR_CERT_COMMON_NAME_INVALID
Root Cause: Amazon Managed Grafana does not support custom TLS certificates. The domain had HSTS enabled, preventing browser override.
Resolution: Reverted to the AWS-provided Grafana URL. Accepted the AWS service limitation.

5. Missing ECS Task Count Metrics in Grafana
Issue: The expected RunningTaskCount metric was not available in CloudWatch.
Root Cause: ECS does not expose task count as a native CloudWatch metric.
Resolution: Used ALB metrics instead: HealthyHostCount, UnHealthyHostCount. These provided a more accurate production signal.


Key Learnings
Django behind ALB requires explicit proxy awareness
Network-level security is often preferable to application-level restrictions
AWS managed services have strict product boundaries
Observability should be designed alongside infrastructure, not added later
