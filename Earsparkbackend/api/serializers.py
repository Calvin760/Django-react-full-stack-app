from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Data
from rest_framework.views import APIView
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash password when creating a new user
        user = User.objects.create_user(**validated_data)
        return user
    

class DataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Read-only user field

    class Meta:
        model = Data
        fields = [
            "id",
            "user",
            "correct_answers",
            "wrong_answers",
            "points",
            "number_of_exercises",
            "count_seconds",
            "average_answer_time",
            "total_time"
        ]
    
    def validate(self, data):
        """
        Custom validation to ensure data is consistent.
        """
        # Ensure total_time is not negative
        if data.get('total_time') < 0:
            raise serializers.ValidationError("Total time cannot be negative.")
        
        # If number_of_exercises > 0, ensure average_answer_time is consistent
        if data.get('number_of_exercises') > 0:
            total_seconds = data.get('count_seconds', 0).total_seconds()  # Assuming count_seconds is a timedelta object
            expected_avg_time = total_seconds / data['number_of_exercises']
            if data.get('average_answer_time') != expected_avg_time:
                raise serializers.ValidationError(
                    f"Average answer time should be {expected_avg_time} seconds based on total time and exercises."
                )
        
        return data
    
    def create(self, validated_data):
        """
        Automatically calculates fields if necessary before saving the data.
        """
        # Calculate the average_answer_time if it's not provided
        if validated_data.get('number_of_exercises') > 0:
            total_seconds = validated_data.get('count_seconds', 0).total_seconds()
            validated_data['average_answer_time'] = total_seconds / validated_data['number_of_exercises']
        
        return super().create(validated_data)
