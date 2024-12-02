from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, DataSerializer, ChordsSerializer, IntervalsSerializer, NotesSerializer, ScalesSerializer, RhythmSerializer
from .models import Data, Chords, Intervals, Notes, Scales, Rhythm
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
import random
import time
from datetime import timedelta

# User Registration View (Public)
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# User Profile View (Authenticated users only)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Base class for sound-based quiz views (Refactor to avoid repetition)
class QuizBaseView(APIView):
    model = None
    serializer_class = None
    sound_field = None

    def get(self, request, *args, **kwargs):
        start_time = time.time()
        entries = self.model.objects.all()
        random_entry = random.choice(entries)
        serializer = self.serializer_class(random_entry)

        # Return the quiz question and sound
        return Response({
            "question": serializer.data,
            "sound": getattr(random_entry, self.sound_field).url,
            "start_time": start_time
        })

    def post(self, request, *args, **kwargs):
        user_guess = request.data.get('guess')
        entry_id = request.data.get('entry_id')
        user = request.user

        try:
            entry = self.model.objects.get(id=entry_id)
        except self.model.DoesNotExist:
            return Response({"error": f"{self.model.__name__} not found"}, status=status.HTTP_404_NOT_FOUND)

        # Correct answer based on the entry's type
        correct_answer = getattr(entry, f'{self.model.__name__.lower()}_type')

        # Calculate time spent on the quiz
        start_time = request.data.get('start_time')
        time_spent = time.time() - float(start_time) if start_time else 0

        # Update user's data (points, answers, time spent)
        data, created = Data.objects.get_or_create(user=user)
        
        if user_guess == correct_answer:
            data.points += 5
            data.correct_answers += 1
            result = "correct"
        else:
            data.wrong_answers += 1
            result = "incorrect"
        
        # Update total time
        data.total_time += time_spent
        data.number_of_exercises += 1
        data.count_seconds += timedelta(seconds=time_spent)
        
        data.save()

        return Response({
            "result": result,
            "points": data.points,
            "correct_answers": data.correct_answers,
            "wrong_answers": data.wrong_answers,
            "time_spent": time_spent,
            "total_time": data.total_time
        })

# Chords Quiz View (Refactor)
class ChordsView(QuizBaseView):
    model = Chords
    serializer_class = ChordsSerializer
    sound_field = "chord_sounds"

# Intervals Quiz View (Refactor)
class IntervalsView(QuizBaseView):
    model = Intervals
    serializer_class = IntervalsSerializer
    sound_field = "interval_sounds"

# Notes Quiz View (Refactor)
class NotesView(QuizBaseView):
    model = Notes
    serializer_class = NotesSerializer
    sound_field = "note_sounds"

# Scales Quiz View (Refactor)
class ScalesView(QuizBaseView):
    model = Scales
    serializer_class = ScalesSerializer
    sound_field = "scale_sounds"

# Rhythm Quiz View
class RhythmView(APIView):
    def get(self, request, *args, **kwargs):
        rhythm_entries = Rhythm.objects.all()
        serializer = RhythmSerializer(rhythm_entries, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = RhythmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Data Views (Authenticated users only)
class DataListView(generics.ListAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

class DataCreateView(generics.CreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DataDetailView(generics.RetrieveAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

class DataUpdateView(generics.UpdateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

class DataDeleteView(generics.DestroyAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

# User Detail View (Authenticated users only)
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
