from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=100,default="")

    def __str__(self):
        return self.name
    
class Result(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )
    subject = models.CharField(max_length=100)
    score = models.IntegerField()
    total = models.IntegerField()
    percentage = models.FloatField()
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "subject"],
                name="unique_student_subject"
            )
        ]

    def __str__(self):
        return f"{self.student.name} - {self.subject}"