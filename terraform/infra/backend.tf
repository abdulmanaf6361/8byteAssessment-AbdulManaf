terraform {
  backend "s3" {
    bucket         = "octabyte-terraform-state-abdulmanaf"
    key            = "ecs-fargate/infra.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}