from rest_framework import serializers
from .models import Career, CareerApplication

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'


class CareerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerApplication
        fields = '__all__'

    def validate(self, data):
        if not data.get('resume'):
            raise serializers.ValidationError("Resume is required.")
        return data
