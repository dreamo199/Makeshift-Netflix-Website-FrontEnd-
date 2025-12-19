from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="media/", blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)

    # Example: list of saved movies
    saved_movies = models.ManyToManyField(
        "movies.Movie",
        blank=True,
        related_name="saved_by_users"
    )
    objects = UserManager()

    def __str__(self):
        return self.username
    
