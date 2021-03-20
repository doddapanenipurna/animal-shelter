from django.urls import path
from animals.views import (
    AddAnimal, Index, GenerateAnimalId, AllAnimals
)

urlpatterns = [
    path('',Index.as_view()),
    path('add/',AddAnimal.as_view()),
    path('generateid/', GenerateAnimalId.as_view()),
    path('all_animals/', AllAnimals.as_view()),
]