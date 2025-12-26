
---

# 📄 APPROACH.md

```md
# Approach & Design Rationale

This project was designed to reflect how modern startups and scale-ups deploy production workloads on AWS without relying on traditional EC2-based setups.

---

## 1. Why ECS Fargate (No EC2)

- Eliminates server management overhead
- No patching, AMI baking, or SSH access
- Scales cleanly with demand
- Aligns with cloud-native, serverless principles

This choice improves reliability while reducing operational complexity.

---

## 2. Separation of Concerns

- Frontend and backend are:
  - Separate repositories
  - Separate Docker images
  - Separate ECS services
- Allows independent scaling and deployments
- Prevents tight coupling between UI and API layers

---

## 3. Load Balancer–First Design

The ALB acts as the system’s public entry point:

- HTTPS termination via ACM
- Path-based routing:
  - `/` → frontend
  - `/api/*` → backend
- Health checks enforced at ALB level

This ensures that only healthy containers receive traffic.

---

## 4. Immutable Infrastructure

- Docker images are immutable
- Each deployment creates a new ECS task definition revision
- Rollbacks are as simple as reverting to a previous revision

This avoids configuration drift and manual intervention.

---

## 5. Observability by Default

Monitoring was treated as a first-class requirement:

- Logs shipped to CloudWatch
- Metrics exposed automatically by ECS and ALB
- Grafana used as a single pane of glass

This enables fast debugging and incident response.

---

## 6. Security by Design

- No public servers
- Security Groups enforce least privilege
- HTTPS enforced end-to-end
- Django configured for proxy-aware SSL handling

Security is enforced at both infrastructure and application layers.

---

## 7. Cost-Conscious Decisions

- Right-sized containers
- Avoided unnecessary managed services
- Used AWS-native monitoring instead of agents

The architecture balances production readiness with startup-level cost constraints.

---

## Summary

The approach focuses on:
- Simplicity over complexity
- Managed services over self-hosted infra
- Observability and security as defaults
- Real-world, production-tested patterns
