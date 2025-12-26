resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/scifyx-backend"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/scifyx-frontend"
  retention_in_days = 14
}

resource "aws_cloudwatch_metric_alarm" "backend_cpu_high" {
  alarm_name          = "scifyx-backend-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 70

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
    ServiceName = "backend"
  }
}
