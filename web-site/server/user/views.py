# views.py
from rest_framework import generics, status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import *
from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class CustomUserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = CustomUserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)

            # Serialize user data
            user_serializer = CustomUserRegistrationSerializer(user)
            user_data = user_serializer.data

            response_data = {
                'token': token.key,
                'user': user_data,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        # Extract username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # If the user is authenticated, generate or retrieve the authentication token
            token, created = Token.objects.get_or_create(user=user)

            # Serialize user data
            user_serializer = CustomUserRegistrationSerializer(user)
            user_data = user_serializer.data

            response_data = {
                'token': token.key,
                'user': user_data,
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            # If authentication fails, check if the user exists in the database
            try:
                existing_user = CustomUser.objects.get(username=username)
                return Response({'detail': 'Incorrect password'}, status=status.HTTP_401_UNAUTHORIZED)
            except CustomUser.DoesNotExist:
                return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class CustomUserPasswordUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserPasswordUpdateSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if the old password matches the current password
        user = self.request.user
        old_password = serializer.validated_data.get('old_password')

        if not user.check_password(old_password):
            return Response({'detail': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the password
        new_password = serializer.validated_data.get('new_password')
        user.set_password(new_password)
        user.save()

        return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)


class CustomUserUpdateProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserUpdateProfileSerializer

    def get_object(self):
        # Get the authenticated user
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Serialize the entire user object in the response
        updated_user_serializer = CustomUserDetailSerializer(instance)
        updated_user_data = updated_user_serializer.data

        return Response({'detail': 'Profile updated successfully.', 'user': updated_user_data}, status=status.HTTP_200_OK)
    

class CustomUserProfileImageUpdateView(generics.UpdateAPIView):
    serializer_class = CustomUserProfileImageUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Serialize the entire user object in the response
        updated_user_serializer = CustomUserDetailSerializer(instance)
        updated_user_data = updated_user_serializer.data

        return Response({'detail': 'Profile image updated successfully.', 'user': updated_user_data}, status=status.HTTP_200_OK)



class CustomUserDetailView(RetrieveAPIView):
    serializer_class = CustomUserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user