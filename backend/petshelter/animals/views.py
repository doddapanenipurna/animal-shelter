from django.http import HttpResponse
from .models import Animal


def index(request):
    return HttpResponse("JoJo is barking")


def add(request):

    return HttpResponse("Animal Added")
