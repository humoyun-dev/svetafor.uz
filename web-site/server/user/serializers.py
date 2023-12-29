# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser
from order.models import Order
from order.serializers import OrderSerializer

User = get_user_model()

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'address', 'passport', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CustomUserPasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)

class CustomUserUpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'address', 'passport', 'email', 'profile_image', 'username']

class CustomUserProfileImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['profile_image']

class CustomUserDetailSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name', 'address', 'passport', 'orders', 'profile_image']

    def get_orders(self, obj):
        order = Order.objects.filter(user=obj)
        serializer = OrderSerializer(order, many=True)
        return serializer.data