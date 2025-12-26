resource "aws_grafana_workspace" "main" {
  provider = aws.us_east_1

  name                     = "${var.project}-grafana"
  account_access_type      = "CURRENT_ACCOUNT"
  authentication_providers = ["AWS_SSO"]
  permission_type          = "SERVICE_MANAGED"
  data_sources             = ["CLOUDWATCH"]

  role_arn = aws_iam_role.grafana_role.arn
}
