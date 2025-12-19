from rest_framework import serializers
from .models import Genre, Movie

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class MovieSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'overview', 'poster', 'backdrop',
            'release_date', 'genre', 'rating', 'popularity', 'content_rating', 'original_language', 'duration']