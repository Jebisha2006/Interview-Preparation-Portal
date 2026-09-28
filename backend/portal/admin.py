from django.contrib import admin
from .models import Student, Result

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "phone")


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "student",
        "subject",
        "score",
        "total",
        "percentage",
    )