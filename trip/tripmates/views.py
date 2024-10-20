from rest_framework import views,generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import AppUser, UserPersona, Trip, Request, SuccessfulTrip
from .serializers import (
    AppUserSerializer,
    UserPersonaSerializer,
    TripSerializer,
    RequestSerializer,
    SuccessfulTripSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Request
from .serializers import RequestSerializer

from .models import Request, Notification
from .serializers import NotificationSerializer 

class AcceptRequestView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        try:
            instance = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

        if instance.requestee != request.user:
            return Response({"detail": "You do not have permission to accept this request."}, status=status.HTTP_403_FORBIDDEN)

        instance.status = 'Accepted'
        instance.save()
        
        # Create a notification for the requester
        Notification.objects.create(user=instance.requester, message=f"{request.user.username} accepted your request for the trip to {instance.trip.place_to_travel}.")
        
        return Response(RequestSerializer(instance).data, status=status.HTTP_200_OK)

class RejectRequestView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        try:
            instance = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response({"detail": "Request not found."}, status=status.HTTP_404_NOT_FOUND)

        if instance.requestee != request.user:
            return Response({"detail": "You do not have permission to reject this request."}, status=status.HTTP_403_FORBIDDEN)

        instance.status = 'Declined'
        instance.save()

        # Create a notification for the requester
        Notification.objects.create(user=instance.requester, message=f"{request.user.username} rejected your request for the trip to {instance.trip.place_to_travel}.")
        
        return Response(RequestSerializer(instance).data, status=status.HTTP_200_OK)

class NotificationListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims can be added here
        token['name'] = user.name
        token['user_id'] = user.id  # Add user ID to the token
        return token
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
# AppUser Views
class AppUserCreateView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer

class AppUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    permission_classes = [AllowAny]

# UserPersona Views
from rest_framework import generics
from .models import UserPersona
from .serializers import UserPersonaSerializer
from rest_framework.permissions import AllowAny

class UserPersonaCreateView(generics.CreateAPIView):
    queryset = UserPersona.objects.all()
    serializer_class = UserPersonaSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        # Set the currently authenticated user as the user for UserPersona
        serializer.save(user=self.request.user)


class UserPersonaDetailView(generics.RetrieveUpdateAPIView):
    queryset = UserPersona.objects.all()
    serializer_class = UserPersonaSerializer
    permission_classes = [AllowAny]

# Trip Views
from rest_framework.permissions import IsAuthenticated

import jwt
from rest_framework import authentication, exceptions

class TripListCreateView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]
     # Make sure to use JWTAuthentication

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TripDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [AllowAny]

# Request Views

class RequestListCreateView(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can create requests

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)  # Set the requester as the logged-in user

class RequestReceivedView(generics.ListAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can view requests

    def get_queryset(self):
        return Request.objects.filter(requestee=self.request.user) 

# SuccessfulTrip Views
class SuccessfulTripListCreateView(generics.ListCreateAPIView):
    queryset = SuccessfulTrip.objects.all()
    serializer_class = SuccessfulTripSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SuccessfulTripDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SuccessfulTrip.objects.all()
    serializer_class = SuccessfulTripSerializer
    permission_classes = [AllowAny]






import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render
from .models import Cluster

# def fetch_user_data():
#     # Fetch user data from the database
#     users = UserPersona.objects.all()
#     data = []
#     for user in users:
#         data.append([
#             user.travel_frequency,
#             user.trip_type,
#             user.itinerary_preference,
#             user.destination_preference,
#             user.accommodation_preference,
#             user.transport_preference,
#         ])

#     encoding_list = [
#     {"Once a year": 0, "2-3 times a year": 1, "Once a month": 2, "More frequently": 3},  # Q1
#     {"Adventure": 0, "Relaxation": 1, "Cultural exploration": 2, "Partying/Nightlife": 3, "Business": 4},  # Q2
#     {"Planned": 0, "Spontaneous": 1, "A mix of both": 2},  # Q3
#     {"Beaches": 0, "Mountains": 1, "Urban Cities": 2, "Historical Sites": 3, "National Parks": 4},  # Q4
#     {"Hotels": 0, "Hostels": 1, "Ashrams/Dharamshaala": 2, "Camping": 3},  # Q5
#     {"Public transportation (buses, trains, etc.)": 0, "Renting a car": 1, "Walking/Biking": 2, "Private transport (taxis, Ubers, etc.)": 3}  # Q6
# ]

#     # Converting the list of answers into a label-encoded vector
#     encoded_answers_list = [encoding_list[i][answer] for i, answer in enumerate(answers_list)]

#     return np.array(data)

# print(fetch_user_data)
# def detect_optimal_k(data):
#     # Using the Elbow Method or Silhouette Score
#     wcss = []
#     sil_scores = []
#     k_values = range(2, 10)  # Test values from 2 to 9
#     for k in k_values:
#         kmeans = KMeans(n_clusters=k, random_state=42)
#         kmeans.fit(data)
#         wcss.append(kmeans.inertia_)
#         sil_score = silhouette_score(data, kmeans.labels_)
#         sil_scores.append(sil_score)
    
#     return k_values, wcss, sil_scores

# def cluster_users():
#     data = fetch_user_data()
    
#     # # Detect optimal k
#     # k_values, wcss, sil_scores = detect_optimal_k(data)
    
#     # # Determine optimal k (can be adjusted to your preference)
#     # optimal_k = k_values[np.argmax(sil_scores)]  # Max silhouette score
    
#     # Apply K-Means with optimal k
#     kmeans = KMeans(n_clusters=10, random_state=42)
#     clusters = kmeans.fit_predict(data)
    
#     # Update database with cluster IDs
#     for i, user in enumerate(UserPersona.objects.all()):
#         Cluster.objects.update_or_create(user=user, defaults={'cluster_id': clusters[i]})
    
#     return optimal_k
def most_similar_users(user_id, num_similar=5):
    user = UserPersona.objects.get(user_id=user_id)
    user_vector_ = ([ 
        user.travel_frequency,
        user.trip_preferences,
        user.trip_type,
        user.destination_preference,
        user.accommodation_preference,
        user.transport_preference,
    ])

    encoding_list = [
        {"once_a_year": 0, "2-3_times_a_year": 1, "once_a_month": 2, "more_frequently": 3},  # Q1
        {"adventure": 0, "relaxation": 1, "cultural_exploration": 2, "partying_nightlife": 3, "business": 4},  # Q2
        {"planned": 0, "spontaneous": 1, "mix_of_both": 2},  # Q3
        {"beaches": 0, "mountains": 1, "urban_cities": 2, "historical_sites": 3, "national_parks": 4},  # Q4
        {"hotels": 0, "hostels": 1, "ashrams_dharamshaala": 2, "camping": 3},  # Q5
        {"public_transportation": 0, "renting_a_car": 1, "walking_biking": 2, "private_transport": 3}  # Q6
    ]
    
    try:
        # Converting the user's answers into a label-encoded vector
        user_vector = np.array([encoding_list[i][answer] for i, answer in enumerate(user_vector_)], dtype=int).reshape(1, -1)
    except KeyError as e:
        print(f"KeyError: {e} for answer: {answer}")
        raise  # Re-raise the exception after logging for debugging
    
    # Get users in the same cluster
    # cluster = Cluster.objects.get(user=user)
    similar_users = UserPersona.objects.all()

    # Create preference matrix for cosine similarity
    data = []
    for similar_user in similar_users:
        data.append([
            similar_user.travel_frequency,
            similar_user.trip_preferences,
            similar_user.trip_type,
            similar_user.destination_preference,
            similar_user.accommodation_preference,
            similar_user.transport_preference,
        ])

    # Encoding similar user answers
    try:
        user_vectors = np.array([[
            encoding_list[i][answer] for i, answer in enumerate(user_answers)
        ] for user_answers in data], dtype=int)
    except KeyError as e:
        print(f"KeyError: {e} in similar user data: {data}")
        raise  # Re-raise the exception after logging for debugging

    # Calculate similarities
    similarities = cosine_similarity(user_vector, user_vectors)[0]

    # Sort by similarity
    similar_indices = np.argsort(-similarities)[:num_similar]
    similar_user_ids = [similar_users[int(i)].user_id for i in similar_indices]
    

    return similar_user_ids

from django.http import JsonResponse

def get_similar_users(request, user_id):
    try:
        print(f"Fetching similar users for user_id: {user_id}")
        # Fetch the similar users using your existing function
        similar_user_ids = most_similar_users(user_id, num_similar=5)

        print(f"Similar user IDs found: {similar_user_ids}")

        # Adjusted the filter to correctly reference the related model
        similar_users = AppUser.objects.filter(userpersona__user_id__in=similar_user_ids).values(
            'id',  # Include user ID directly
            'name',  # Fetch user name
            'age',   # Fetch user age
            'email'  # Fetch user email
        )

        return JsonResponse(list(similar_users), safe=False)
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def get_logged_in_user(request):
    user = request.user  # Get the logged-in user
    user_data = {
        'id': user.id,
        'name': user.name,  # Assuming the username is the name
        # Add other fields as necessary
    }
    return JsonResponse(user_data)