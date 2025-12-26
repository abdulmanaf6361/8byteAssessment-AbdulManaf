from django.db import models
import boto3
from django.conf import settings
from django.utils.html import format_html

class CareerType(models.TextChoices):
    FULL_TIME = 'Full-Time'
    INTERNSHIP = 'Internship'


class Career(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=20, choices=CareerType.choices)
    active = models.BooleanField(default=True)  # For controlling job availability
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class CareerApplication(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='applications')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    resume = models.FileField(upload_to='resumes/')
    message = models.TextField(blank=True,null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def resume_link(self):
        if not self.resume:
            return "No resume uploaded"
        
        s3 = boto3.client("s3", 
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                          region_name=settings.AWS_S3_REGION_NAME)

        url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": self.resume.name},
            ExpiresIn=300  # 5 minutes
        )
        return format_html('<a href="{}" target="_blank">Download Resume</a>', url)

    resume_link.allow_tags = True
    resume_link.short_description = "Resume"

    def __str__(self):
        return f"{self.name} - {self.career.title}"
