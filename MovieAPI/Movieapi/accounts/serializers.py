from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.serializers import MovieSerializer

User = get_user_model()

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "phone", "bio", "avatar", "country", "password"]
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data, password=password)
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    saved_movies = MovieSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "bio",
            "avatar",
            "country",
            "saved_movies",
        ]


