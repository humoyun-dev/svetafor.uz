from django.urls import path
from .views import *

urlpatterns = [
    path('register/', CustomUserRegistrationView.as_view(), name='user-registration'),
    path('login/', CustomUserLoginView.as_view(), name='user-login'),
    path('update-password/', CustomUserPasswordUpdateView.as_view(), name='update-password'),
    path('update-profile/', CustomUserUpdateProfileView.as_view(), name='update-profile'),
    path('update-profile-image/', CustomUserProfileImageUpdateView.as_view(), name='update-profile-image'),
    path('user-detail/', CustomUserDetailView.as_view(), name='user-detail'),
]
