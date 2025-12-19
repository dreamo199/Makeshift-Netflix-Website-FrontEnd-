from django.urls import path
from .views import RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .views import WatchlistView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("watchlist/", WatchlistView.as_view(), name="watchlist"),

]
