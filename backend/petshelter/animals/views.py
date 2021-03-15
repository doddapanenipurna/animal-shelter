from django.http import HttpResponse

def index(request):
    return HttpResponse("JoJo is barking")
    