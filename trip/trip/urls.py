"""
URL configuration for trip project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from tripmates.views import RequestListCreateView, RequestReceivedView
from tripmates.views import RequestListCreateView, RequestReceivedView, AcceptRequestView, RejectRequestView
from tripmates import views
from django.urls import path
from tripmates.views import (
    AppUserCreateView,
    AppUserDetailView,
    UserPersonaCreateView,
    UserPersonaDetailView,
    TripListCreateView,
    TripDetailView,
    RequestListCreateView,
    
    SuccessfulTripListCreateView,
    SuccessfulTripDetailView,
    get_logged_in_user,
)
from tripmates.views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', AppUserCreateView.as_view(), name='user-create'),
    path('users/<int:pk>/', AppUserDetailView.as_view(), name='user-detail'),
    
    path('personas/', UserPersonaCreateView.as_view(), name='user-persona-create'),
    path('personas/<int:pk>/', UserPersonaDetailView.as_view(), name='user-persona-detail'),
    
    path('trips/', TripListCreateView.as_view(), name='trip-list-create'),
    path('trips/<int:pk>/', TripDetailView.as_view(), name='trip-detail'),

    path('requests/', RequestListCreateView.as_view(), name='request-list-create'),
    path('requests/received/', RequestReceivedView.as_view(), name='request-received'),
    
    path('successful-trips/', SuccessfulTripListCreateView.as_view(), name='successful-trip-list-create'),
    path('successful-trips/<int:pk>/', SuccessfulTripDetailView.as_view(), name='successful-trip-detail'),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/requests/<int:pk>/accept/', AcceptRequestView.as_view(), name='accept-request'),
    path('api/requests/<int:pk>/reject/', RejectRequestView.as_view(), name='reject-request'),

    path('api/similar-users/<int:user_id>/', views.get_similar_users, name='get_similar_users'),
    path('api/logged-in-user/', get_logged_in_user, name='get_logged_in_user'),
]
