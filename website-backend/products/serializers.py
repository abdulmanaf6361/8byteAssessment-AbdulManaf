from rest_framework import serializers
from .models import Product
import boto3
from rest_framework import serializers
from django.conf import settings

class ProductSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_logo(self, obj):
        if not obj.logo:
            return None

        s3_client = boto3.client('s3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        
        presigned_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': obj.logo.name},
            ExpiresIn=3600  # 1 hour
        )
        return presigned_url
