from django.http import HttpResponse
from .models import Animal
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.core import serializers
import json
import string
import random
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas



class Index(APIView):

    permission_classes = ()

    def get(self, request):
        return HttpResponse("JoJo is barking")


class AddAnimal(APIView):

    permission_classes = ()

    def post(self, request):
        try:
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
                weight=data['animalWeight'],
            )
            new_animal.save()
        except:
            return HttpResponse('Error Creating Animal  ')

        return HttpResponse("Animal Added")


class GetAnimal(APIView):
    permission_classes = ()

    def get(self, request, shelter_id):
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
        data = serializers.serialize('json', Animal.objects.all().filter(
            current_status=category), fields=('shelter_id', 'name'))
        return HttpResponse(data)


class UpdateAnimalState(APIView):

    permission_classes = ()

    def post(self, request, shelter_id):
        animal = Animal.objects.get(shelter_id=shelter_id)
        print(request.data['destinationCategory'])
        animal.current_status = request.data['destinationCategory']
        animal.save()
        return HttpResponse("Success")
    


class UpdateAnimal(APIView):
    permission_classes = ()

    def post(self, request, shelter_id):
        try:
            data = json.loads(request.body)['formState']
            animal = Animal.objects.get(shelter_id=shelter_id)
            animal.intake_date = data['intakeDate']
            animal.intake_type = data['intakeType']
            animal.intake_employee = data['intakeEmployee']
            animal.name = data['animalName']
            animal.breed = data['animalBreed']
            animal.gender = data['animalGender']
            animal.age = data['animalAge']
            animal.shelter_id = data['animalId']
            animal.neutered_or_spayed = False
            animal.medical_notes = data['medicalNotes']
            animal.other_notes = data['otherNotes']
            animal.weight = data['animalWeight']
            animal.save()
        except:
            print("Error Updating")
            return HttpResponse("error")
        return HttpResponse("Done")

class CreatePaperwork(APIView):
    permission_classes = ()

    def get(self, request, shelter_id):
        animal = Animal.objects.get(shelter_id=shelter_id)
        # Create the PDF object, using the buffer as its "file."
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer)
        # Draw things on the PDF. Here's where the PDF generation happens.
        # See the ReportLab documentation for the full list of functionality.

        p.setLineWidth(.3)
        p.setFont('Helvetica', 20)
        p.drawString(30,750,animal.name)
        p.setFont('Helvetica', 10)
        p.line(30,740,570,740)
        p.drawString(30,725,'ShelterID: '+animal.shelter_id)
        p.drawString(30,710,'Breed: '+animal.breed)
        p.drawString(30,695,'Gender: '+animal.gender)
        p.drawString(30,680,'Age '+animal.age)
        p.line(30,640,570,640)
        p.setFont('Helvetica', 16)
        p.drawString(30,650,'Personality')
        p.drawString(30,400,'Medical History')
        p.setFont('Helvetica', 10)
        p.drawString(30,630,animal.other_notes)
        p.drawString(30,380,animal.medical_notes)
        p.line(30,390,570,390)
        p.showPage()
        p.save()

        buffer.seek(0)
        animal_filename= animal.name + '_' + animal.shelter_id +'.pdf'
        return FileResponse(buffer, as_attachment=True, filename=animal_filename)