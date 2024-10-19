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

class TripListCreateView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]  # Allow only authenticated users to create a trip

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
