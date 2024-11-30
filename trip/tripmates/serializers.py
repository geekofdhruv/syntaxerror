from rest_framework import serializers
from .models import AppUser, UserPersona, Trip, Request, SuccessfulTrip

from rest_framework import serializers
from .models import AppUser
from django.contrib.auth.hashers import make_password

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'name', 'age', 'email', 'photo', 'password', 'is_active', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}  # Ensures password is write-only

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super(AppUserSerializer, self).create(validated_data)



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



from rest_framework import serializers

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['request_id', 'trip', 'requester', 'requestee', 'status']
        read_only_fields = ['requester', 'status']
  # Ensure these fields are read-only


class SuccessfulTripSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessfulTrip
        fields = ['successful_trip_id', 'trip', 'user', 'match_date']
        read_only_fields = ['trip', 'user']  # Ensure these fields are read-only

from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']  # Make these fields read-only
