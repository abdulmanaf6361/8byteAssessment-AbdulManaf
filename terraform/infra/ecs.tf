resource "aws_ecs_cluster" "main" {
  name = "${var.project}-cluster-v1"
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.project}-backend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_execution.arn

  container_definitions = jsonencode([{
    name  = "backend"
    image = aws_ecr_repository.backend.repository_url
    portMappings = [{ containerPort = 8000 }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/scifyx-backend"
        awslogs-region        = "ap-south-1"
        awslogs-stream-prefix = "ecs"
      }
    }
    environment = [
      { name = "ALLOWED_HOSTS", value = "*" }
    ]
  }])
}

