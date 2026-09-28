from django.urls import path
from .views import register, login, save_result, get_progress, dashboard,leaderboard,profile,update_profile

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("save-result/", save_result),
    path("progress/<int:student_id>/", get_progress),
    path("dashboard/<int:student_id>/", dashboard),
    path("leaderboard/", leaderboard),
    path("profile/<int:student_id>/", profile),
    path("update-profile/<int:student_id>/", update_profile),
]