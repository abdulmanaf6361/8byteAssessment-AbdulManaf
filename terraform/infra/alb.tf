resource "aws_lb" "alb" {
  name               = "${var.project}-alb-v1"
  load_balancer_type = "application"
  subnets            = aws_subnet.public[*].id
  security_groups    = [aws_security_group.alb.id]
}
