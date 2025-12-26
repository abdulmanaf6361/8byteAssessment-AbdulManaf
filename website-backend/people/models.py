from django.db import models

class People(models.Model):
    name = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='people_profiles/')
    role = models.CharField(max_length=255)
    linkedin_url = models.URLField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
