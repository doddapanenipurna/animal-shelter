from django.http import HttpResponse
from .models import Animal
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.core import serializers
import json
import string
import random


class Index(APIView):

    permission_classes = ()

    def get(self, request):
        return HttpResponse("JoJo is barking")


class AddAnimal(APIView):

    permission_classes = ()

    def post(self, request):
        data = json.loads(request.body)['formState']
        print(data)
        new_animal = Animal(
            intake_date=data['intakeDate'],
            intake_type=data['intakeType'],
            intake_employee=data['intakeEmployee'],
            name=data['animalName'],
            breed=data['animalBreed'],
            gender=data['animalGender'],
            age=data['animalAge'],
            shelter_id=data['animalId'],
            neutered_or_spayed=False,
            medical_notes=data['medicalNotes'],
            other_notes=data['otherNotes'],
        )
        new_animal.save()
        return HttpResponse("Animal Added")

class GetAnimal(APIView):
    permission_classes = ()
    def get(self,request,shelter_id):
        animal = Animal.objects.all().filter(shelter_id=shelter_id)
        serialized_animal = serializers.serialize('json', animal)

        return HttpResponse(serialized_animal)

class GenerateAnimalId(APIView):

    permission_classes = ()

    def get(self, request):
        is_new_id = False
        new_id = ''

        # check if ID exists; highly unlikely(1 in 26^10) but just in case
        while(not is_new_id):
            new_id = self.random_string(10)
            try:
                Animal.objects.get(shelter_id=new_id)
                is_new_id = False
            except Animal.DoesNotExist:
                is_new_id = True

        return HttpResponse(new_id)

    def random_string(self, length):
        return ''.join(random.choice(string.ascii_letters) for m in range(length))


class AllAnimals(APIView):

    permission_classes = ()

    def post(self, request):
        category = json.loads(request.body)['input']
        data = serializers.serialize('json',Animal.objects.all().filter(current_status=category),fields=('shelter_id','name'))
        return HttpResponse(data)

class UpdateAnimalState(APIView):

    permission_classes = ()

    def post(self, request, shelter_id):
        animal = Animal.objects.get(shelter_id=shelter_id)
        print(request.data['destinationCategory'])
        animal.current_status = request.data['destinationCategory']
        animal.save()
        return HttpResponse("Done")

class UpdateAnimal(APIView):
    permission_classes = ()

    def post(self, request, shelter_id):
        print("THIS IS THE ONE YOU WANT")
        data = json.loads(request.body)['formState']
        print(data)
        animal = Animal.objects.get(shelter_id=shelter_id)
        animal.intake_date=data['intakeDate']
        animal.intake_type=data['intakeType']
        animal.intake_employee=data['intakeEmployee']
        animal.name=data['animalName']
        animal.breed=data['animalBreed']
        animal.gender=data['animalGender']
        animal.age=data['animalAge']
        animal.shelter_id=data['animalId']
        animal.neutered_or_spayed=False
        animal.medical_notes=data['medicalNotes']
        animal.other_notes=data['otherNotes']
        animal.weight = data['animalWeight']
        animal.save()
        return HttpResponse("Done")