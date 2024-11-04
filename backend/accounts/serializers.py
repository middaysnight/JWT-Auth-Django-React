from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email")


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "password1", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match!")

        password = attrs.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError("Passwords must be at least 8 characters!")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return CustomUser.objects.create_user(password=password, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()  # Changed to use `username` for authentication
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)

        if username is None or password is None:
            raise serializers.ValidationError("Both username and password are required!")

        user = authenticate(username=username, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials!")
