from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Data, Chords, Intervals, Notes, Scales, Rhythm
from datetime import timedelta


# UserSerializer to handle user-related data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# DataSerializer to handle data-related information
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
        if data.get('total_time') < 0:
            raise serializers.ValidationError("Total time cannot be negative.")
        if data.get('number_of_exercises') > 0:
            count_seconds = data.get('count_seconds', timedelta(seconds=0))
            total_seconds = count_seconds.total_seconds()
            expected_avg_time = total_seconds / data['number_of_exercises']
            avg_time = data.get('average_answer_time', timedelta(seconds=0))
            if avg_time.total_seconds() != expected_avg_time:
                raise serializers.ValidationError(
                    f"Average answer time should be {expected_avg_time} seconds based on total time and exercises."
                )
        return data

    def create(self, validated_data):
        if validated_data.get('number_of_exercises') > 0:
            count_seconds = validated_data.get('count_seconds', timedelta(seconds=0))
            total_seconds = count_seconds.total_seconds()
            validated_data['average_answer_time'] = timedelta(seconds=total_seconds / validated_data['number_of_exercises'])
        
        return super().create(validated_data)


# ChordsSerializer to handle chords-related data
class ChordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chords
        fields = [
            "id",
            "points",
            "correct_answers",
            "wrong_answers",
            "total_time",
            "chord_sounds"
        ]


# IntervalsSerializer to handle intervals-related data
class IntervalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intervals
        fields = [
            "id",
            "points",
            "correct_answers",
            "wrong_answers",
            "total_time",
            "interval_sounds"
        ]


# NotesSerializer to handle notes-related data
class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = [
            "id",
            "points",
            "correct_answers",
            "wrong_answers",
            "total_time",
            "note_sounds"
        ]


# ScalesSerializer to handle scales-related data
class ScalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scales
        fields = [
            "id",
            "points",
            "correct_answers",
            "wrong_answers",
            "total_time",
            "scale_sounds"
        ]


# RhythmSerializer to handle rhythm-related data
class RhythmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rhythm
        fields = [
            "id",
            "points",
            "correct_answers",
            "wrong_answers",
            "total_time",
            "rhythmic_sounds"
        ]
