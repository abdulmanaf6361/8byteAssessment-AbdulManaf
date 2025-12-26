output "alb_dns" {
  value = aws_lb.alb.dns_name
}

output "grafana_url" {
  value = aws_grafana_workspace.main.endpoint
}
