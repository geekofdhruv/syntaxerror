from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    photo = models.ImageField(upload_to='user_photos/', null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age']

    def __str__(self):
        return self.email
class UserPersona(models.Model):
    persona_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)

    # 1. How often do you travel?
    travel_frequency = models.CharField(
        max_length=50, 
        choices=[
            ('once_a_year', 'Once a year'),
            ('2-3_times_a_year', '2-3 times a year'),
            ('once_a_month', 'Once a month'),
            ('more_frequently', 'More frequently')
        ],
        default='once_a_year'
    )

    # 2. What do you seek most in a trip?
    trip_preferences = models.CharField(
        max_length=50,
        choices=[
            ('adventure', 'Adventure'),
            ('relaxation', 'Relaxation'),
            ('cultural_exploration', 'Cultural exploration'),
            ('partying_nightlife', 'Partying/Nightlife'),
            ('business', 'Business')
        ],
        default='adventure'
    )

    # 3. Do you prefer planned itineraries or spontaneous trips?
    trip_type = models.CharField(
        max_length=50,
        choices=[
            ('planned', 'Planned'),
            ('spontaneous', 'Spontaneous'),
            ('mix_of_both', 'A mix of both')
        ],
        default='planned'
    )

    # 4. What kind of destinations do you prefer?
    destination_preference = models.CharField(
        max_length=50,
        choices=[
            ('beaches', 'Beaches'),
            ('mountains', 'Mountains'),
            ('urban_cities', 'Urban Cities'),
            ('historical_sites', 'Historical Sites'),
            ('national_parks', 'National Parks')
        ],
        default='beaches'
    )

    # 5. What type of accommodation do you prefer?
    accommodation_preference = models.CharField(
        max_length=50,
        choices=[
            ('hotels', 'Hotels'),
            ('hostels', 'Hostels'),
            ('ashrams_dharamshaala', 'Ashrams/ Dharamshaala'),
            ('camping', 'Camping')
        ],
        default='hotels'
    )

    # 6. What mode of transportation do you prefer during a trip?
    transport_preference = models.CharField(
        max_length=50,
        choices=[
            ('public_transportation', 'Public transportation (buses, trains, etc.)'),
            ('renting_a_car', 'Renting a car'),
            ('walking_biking', 'Walking/Biking'),
            ('private_transport', 'Private transport (taxis, Ubers, etc.)')
        ],
        default='public_transportation'
    )

    def __str__(self):
        return f"{self.user.name}'s Persona"


class Trip(models.Model):
    trip_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    place_to_travel = models.CharField(max_length=255)
    expected_date_of_travel = models.DateField()
    group_or_solo = models.BooleanField(default=False)  # True for group, False for solo

    def __str__(self):
        return f"Trip to {self.place_to_travel} by {self.user.name}"

class Request(models.Model):
    request_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    requester = models.ForeignKey(AppUser, related_name='requests_sent', on_delete=models.CASCADE)
    requestee = models.ForeignKey(AppUser, related_name='requests_received', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'), ('Declined', 'Declined')], default='Pending')

    def __str__(self):
        return f"{self.requester.name} requested {self.trip.place_to_travel}"

class SuccessfulTrip(models.Model):
    successful_trip_id = models.AutoField(primary_key=True)
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    match_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Successful trip for {self.user.name} to {self.trip.place_to_travel}"

