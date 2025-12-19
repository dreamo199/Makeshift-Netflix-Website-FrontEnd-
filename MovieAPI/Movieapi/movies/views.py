from django.shortcuts import render
from rest_framework import viewsets, generics
from django.utils import timezone
from datetime import timedelta
from .models import Movie, Genre
from .serializers import MovieSerializer, GenreSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter
from rest_framework import filters
import random


class MovieList(generics.ListAPIView):
    queryset = Movie.objects.order_by('title')
    serializer_class = MovieSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['title']

class PopularMovies(APIView):
    def get(self, request):
        movies = Movie.objects.order_by('-popularity')[:20]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

class TopRatedMovies(APIView):
    def get(self, request):
        movies = Movie.objects.order_by('-rating')[:20]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

class UpcomingMovies(APIView): ##
    def get(self, request):
        today = timezone.now().date()
        movies = Movie.objects.filter(release_date__gt=today)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

class MovieDetails(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class SearchMovies(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title',]

class GenreList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class MoviesByGenre(APIView):
    def get(self, request, genre_id):
        movies = Movie.objects.filter(genre=genre_id)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def similar_movies(request, pk):
    movie = Movie.objects.get(id=pk)
    genre_ids = movie.genre.values_list('id', flat=True)

    similar = Movie.objects.filter(genre__in=genre_ids).exclude(id=movie.id).distinct()[:5]

    serializer = MovieSerializer(similar, many=True) 
    return Response(serializer.data)

class RandomFeaturedMovie(APIView):
    def get(self, request, *args, **kwargs):
        movies = Movie.objects.filter(id=1)

        if not movies.exists():
            return Response( {"error": "No movies found"}, status=404)

        movie = random.choice(movies)
        serializer = MovieSerializer(movie)

        return Response(serializer.data)

