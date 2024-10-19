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

from django.urls import path
from tripmates.views import (
    AppUserCreateView,
    AppUserDetailView,
    UserPersonaCreateView,
    UserPersonaDetailView,
    TripListCreateView,
    TripDetailView,
    RequestListCreateView,
    RequestDetailView,
    SuccessfulTripListCreateView,
    SuccessfulTripDetailView,
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
    path('requests/<int:pk>/', RequestDetailView.as_view(), name='request-detail'),
    
    path('successful-trips/', SuccessfulTripListCreateView.as_view(), name='successful-trip-list-create'),
    path('successful-trips/<int:pk>/', SuccessfulTripDetailView.as_view(), name='successful-trip-detail'),
]
