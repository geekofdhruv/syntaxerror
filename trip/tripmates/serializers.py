from rest_framework import serializers
from .models import AppUser, UserPersona, Trip, Request, SuccessfulTrip

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['user_id', 'name', 'age', 'email', 'photo', 'is_active', 'is_staff']


class UserPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPersona
        fields = [
            'persona_id', 
            'user', 
            'travel_frequency', 
            'trip_preferences', 
            'trip_type', 
            'destination_preference', 
            'accommodation_preference', 
            'transport_preference'
        ]
        read_only_fields = ['user']  # Ensure user field is read-only


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['trip_id', 'user', 'place_to_travel', 'expected_date_of_travel', 'group_or_solo']
        read_only_fields = ['user']  # Ensure user field is read-only


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['request_id', 'trip', 'requester', 'requestee', 'status']
        read_only_fields = ['trip', 'requester', 'requestee']  # Ensure these fields are read-only


class SuccessfulTripSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessfulTrip
        fields = ['successful_trip_id', 'trip', 'user', 'match_date']
        read_only_fields = ['trip', 'user']  # Ensure these fields are read-only
