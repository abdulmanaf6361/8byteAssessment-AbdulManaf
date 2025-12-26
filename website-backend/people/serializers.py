from rest_framework import serializers
from .models import People

import boto3
from django.conf import settings
from rest_framework import serializers
from .models import People

class PeopleSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = People
        fields = "__all__"

    def get_profile_picture(self, obj):
        if not obj.profile_picture:
            return None  

        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

        try:
            presigned_url = s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': obj.profile_picture.name},
                ExpiresIn=3600  # valid for 1 hour
            )
            return presigned_url
        except Exception:
            return None
