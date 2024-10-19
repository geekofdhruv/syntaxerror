from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import AppUser, UserPersona, Trip, Request, SuccessfulTrip
from .serializers import (
    AppUserSerializer,
    UserPersonaSerializer,
    TripSerializer,
    RequestSerializer,
    SuccessfulTripSerializer,
)

# AppUser Views
class AppUserCreateView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer

class AppUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    permission_classes = [IsAuthenticated]

# UserPersona Views
class UserPersonaCreateView(generics.CreateAPIView):
    queryset = UserPersona.objects.all()
    serializer_class = UserPersonaSerializer

class UserPersonaDetailView(generics.RetrieveUpdateAPIView):
    queryset = UserPersona.objects.all()
    serializer_class = UserPersonaSerializer
    permission_classes = [IsAuthenticated]

# Trip Views
class TripListCreateView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TripDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

# Request Views
class RequestListCreateView(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

class RequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

# SuccessfulTrip Views
class SuccessfulTripListCreateView(generics.ListCreateAPIView):
    queryset = SuccessfulTrip.objects.all()
    serializer_class = SuccessfulTripSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SuccessfulTripDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SuccessfulTrip.objects.all()
    serializer_class = SuccessfulTripSerializer
    permission_classes = [IsAuthenticated]
