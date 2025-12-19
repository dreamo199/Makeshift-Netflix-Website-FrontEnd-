from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import RegisterUserSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status
from movies.models import Movie

# Create your views here.

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data["saved_movies"])

    def post(self, request):
        movie_id = request.data.get("movie_id")
        if not movie_id:
            return Response({"error": "movie_id is required"}, status=400)

        movie = Movie.objects.filter(id=movie_id).first()
        if not movie:
            return Response({"error": "Movie not found"}, status=404)

        request.user.saved_movies.add(movie)
        return Response({"success": True})

    def delete(self, request):
        movie_id = request.data.get("movie_id")
        if not movie_id:
            return Response({"error": "movie_id is required"}, status=400)

        movie = Movie.objects.filter(id=movie_id).first()
        if not movie:
            return Response({"error": "Movie not found"}, status=404)

        request.user.saved_movies.remove(movie)
        return Response({"success": True})