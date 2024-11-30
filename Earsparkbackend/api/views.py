from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, DataSerializer
from .models import Data
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView


# User Registration View (Public)
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user to create an account

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        user = request.user  # Get the current authenticated user
        serializer = UserSerializer(user)  # Serialize the user object
        return Response(serializer.data)  # Send serialized data back to frontend

# List all Data entries (Authenticated users only)
class DataListView(generics.ListAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can list data

    def get_queryset(self):
        """
        Optionally restricts the returned data to the currently authenticated user,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

class DataCreateView(generics.CreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the new Data entry
        serializer.save(user=self.request.user)

# Retrieve a specific Data entry (Authenticated users only)
class DataDetailView(generics.RetrieveAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can view data

    def get_queryset(self):
        """
        Restricts the retrieved data to only the data belonging to the current user
        """
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

# Update an existing Data entry (Authenticated users only)
class DataUpdateView(generics.UpdateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can update data

    def get_queryset(self):
        """
        Restricts the updated data to only the data belonging to the current user
        """
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

# Delete a Data entry (Authenticated users only)
class DataDeleteView(generics.DestroyAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete data

    def get_queryset(self):
        """
        Restricts the deleted data to only the data belonging to the current user
        """
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request):
        # Get the current user from the request object
        user = request.user
        
        # Serialize the user data
        serializer = UserSerializer(user)
        
        return Response(serializer.data)

