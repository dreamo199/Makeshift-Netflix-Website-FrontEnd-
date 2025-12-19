from django.db import models
from django.utils import timezone

class Genre(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=200)
    overview = models.TextField()
    poster = models.ImageField()
    backdrop = models.ImageField()
    release_date = models.DateField(blank=True, null=True)
    genre = models.ManyToManyField(Genre)
    rating = models.FloatField(blank=True, null=True)
    popularity = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    original_language = models.CharField(blank=True,max_length=50, null=True)
    content_rating = models.CharField(blank=True, max_length=10, null=True)
    duration = models.CharField(blank=True, max_length=50, null=True)
    
    def __str__(self):
        return self.title

class TVShow(models.Model):
    title = models.CharField(max_length=200)
    overview = models.TextField()
    poster = models.ImageField()
    first_air_date = models.DateField(blank=True, null=True)
    last_air_date = models.DateField(blank=True, null=True)
    genre = models.ManyToManyField(Genre)
    rating = models.FloatField(blank=True, null=True)
    popularity = models.FloatField(default=0.0)
    created_at = models.DateTimeField(default=timezone.now)
    original_language = models.CharField(null=True, max_length=50)
    content_rating = models.CharField(null=True, max_length=10)
    duration = models.CharField(null=True, max_length=50)
    
    def __str__(self):
        return self.title