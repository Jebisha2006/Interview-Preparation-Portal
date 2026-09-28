from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Avg
from .models import Student, Result


@api_view(['POST'])
def register(request):

    name = request.data.get('name')
    email = request.data.get('email')
    phone = request.data.get('phone')
    password = request.data.get('password')

    Student.objects.create(
        name=name,
        email=email,
        phone=phone,
        password=password
    )

    return Response({
        "message": "Student Registered Successfully"
    })


@api_view(['POST'])
def login(request):

    email = request.data.get('email')
    password = request.data.get('password')

    try:
        student = Student.objects.get(
            email=email,
            password=password
        )

        return Response({
    "message": "Login Successful",
    "student_id": student.id,
    "name": student.name,
    "email": student.email,
    "phone": student.phone
})

    except Student.DoesNotExist:

        return Response({
            "message": "Invalid Credentials"
        })


@api_view(['POST'])
def save_result(request):

    student_id = request.data.get("student_id")
    subject = request.data.get("subject")
    score = request.data.get("score")
    total = request.data.get("total")
    percentage = request.data.get("percentage")

    try:
        student = Student.objects.get(id=student_id)

        Result.objects.update_or_create(
            student=student,
            subject=subject,
            defaults={
                "score": score,
                "total": total,
                "percentage": percentage,
            }
        )

        return Response({
            "message": "Result Saved Successfully"
        })

    except Student.DoesNotExist:

        return Response({
            "message": "Student Not Found"
        })


@api_view(['GET'])
def get_progress(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        results = Result.objects.filter(student=student)

        data = []

        for result in results:
            data.append({
                "subject": result.subject,
                "score": result.score,
                "total": result.total,
                "percentage": result.percentage,
            })

        return Response(data)

    except Student.DoesNotExist:

        return Response({
            "message": "Student Not Found"
        })


@api_view(['GET'])
def dashboard(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        results = Result.objects.filter(student=student)

        tests_completed = results.count()

        average = 0

        if tests_completed > 0:
            total_percentage = 0

            for result in results:
                total_percentage += result.percentage

            average = round(total_percentage / tests_completed)

        return Response({
            "tests_completed": tests_completed,
            "average_score": average,
            "categories": 12
        })

    except Student.DoesNotExist:

        return Response({
            "message": "Student Not Found"
        })
      
@api_view(['GET'])
def leaderboard(request):

    students = Student.objects.all()

    data = []

    for student in students:

        results = Result.objects.filter(student=student)

        if results.exists():

            average = round(
                results.aggregate(Avg("percentage"))["percentage__avg"]
            )

            completed = results.count()

            data.append({
                "student": student.name,
                "average": average,
                "completed": completed,
            })

    data.sort(key=lambda x: x["average"], reverse=True)

    rank = 1

    for item in data:
        item["rank"] = rank
        rank += 1

    return Response(data)
@api_view(['GET'])
def profile(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        return Response({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "phone": student.phone
        })

    except Student.DoesNotExist:

        return Response({
            "message": "Student Not Found"
        })
@api_view(['PUT'])
def update_profile(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        student.name = request.data.get("name")
        student.email = request.data.get("email")
        student.phone = request.data.get("phone")

        student.save()

        return Response({
            "message": "Profile Updated Successfully"
        })

    except Student.DoesNotExist:

        return Response({
            "message": "Student Not Found"
        })
@api_view(["GET"])
def final_certificate(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        results = Result.objects.filter(student=student)

        completed = results.count()

        average = 0

        if completed > 0:
            average = round(
                results.aggregate(Avg("percentage"))["percentage__avg"]
            )

        subjects = []

        for result in results:
            subjects.append(result.subject)

        return Response({
            "name": student.name,
            "completed": completed,
            "average": average,
            "subjects": subjects
        })

    except Student.DoesNotExist:
        return Response({
            "message": "Student Not Found"
        })