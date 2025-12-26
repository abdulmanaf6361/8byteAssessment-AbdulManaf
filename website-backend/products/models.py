from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='product_logos/')
    description = models.TextField()
    link = models.URLField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
