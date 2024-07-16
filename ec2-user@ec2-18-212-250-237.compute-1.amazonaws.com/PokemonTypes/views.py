from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response



TYPES = {
    'bug': {'strengths':['grass', 'psychic', 'dark'], 'weaknesses': ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy']},
    'dark': {'strengths':['ghost', 'psychic'], 'weaknesses': ['fighting', 'dark', 'fairy']},
    'dragon': {'strengths':['dragon'], 'weaknesses': ['steel', 'fairy']},
    'electric': {'strengths':['flying', 'water'], 'weaknesses': ['ground', 'grass', 'electric', 'dragon']},
    'fairy': {'strengths':['fighting', 'dragon', 'dark'], 'weaknesses': ['poison', 'steel', 'fire']},
    'fighting': {'strengths':['normal', 'rock', 'steel', 'ice', 'dark'], 'weaknesses': ['flying', 'poison', 'psychic', 'bug', 'ghost', 'fairy']},
    'fire': {'strengths':['bug', 'steel', 'grass', 'ice'], 'weaknesses': ['rock', 'fire', 'water', 'dragon']},
    'flying': {'strengths':['fighting', 'bug', 'grass'], 'weaknesses': ['rock', 'steel', 'electric']},
    'ghost': {'strengths':['ghost', 'psychic'], 'weaknesses': ['normal', 'dark']},
    'grass': {'strengths':['ground', 'rock', 'water'], 'weaknesses': ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon']},
    'ground': {'strengths':['poison', 'rock', 'steel', 'fire', 'electric'], 'weaknesses': ['flying', 'bug', 'grass']},
    'ice': {'strengths':['flying', 'ground', 'grass', 'dragon'], 'weaknesses': ['steel', 'fire', 'water', 'ice']},
    'normal': {'strengths':[], 'weaknesses': ['rock', 'ghost', 'steel']},
    'poison': {'strengths':['grass', 'fairy'], 'weaknesses': ['poison', 'ground', 'rock', 'ghost', 'steel']},
    'psychic': {'strengths':['fighting', 'poison'], 'weaknesses': ['steel', 'psychic', 'dark']},
    'rock': {'strengths':['flying', 'bug', 'fire', 'ice'], 'weaknesses': ['fighting', 'ground', 'steel']},
    'steel': {'strengths':['rock', 'ice', 'fairy'], 'weaknesses': ['steel', 'fire', 'water', 'electric']},
    'water': {'strengths':['ground', 'rock', 'fire'], 'weaknesses': ['water', 'grass', 'dragon']}
}


@api_view(["GET"])
def handleRequest(request):
    primaryType = request.query_params.get("primaryType", None)
    secondaryType = request.query_params.get("secondaryType", None)
    if (primaryType == None or primaryType.lower() not in TYPES):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if (secondaryType == None):
        return Response(data={"strengths": TYPES[primaryType.lower()]["strengths"], "weaknesses": TYPES[primaryType.lower()]["weaknesses"]}, status=status.HTTP_200_OK)
    else: # has two types
        if (secondaryType.lower() not in TYPES):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            primary_strengths = TYPES[primaryType.lower()]["strengths"]
            secondary_strengths = TYPES[secondaryType.lower()]["strengths"]
            all_strengths = set(primary_strengths + secondary_strengths)

            primary_weaknesses = TYPES[primaryType.lower()]["weaknesses"]
            secondary_weaknesses = TYPES[secondaryType.lower()]["weaknesses"]
            all_weaknesses = set(primary_weaknesses + secondary_weaknesses)
            all_weaknesses_final = [elem for elem in all_weaknesses if elem not in all_strengths]

            return Response(data={"strengths": list(all_strengths), "weaknesses": all_weaknesses_final}, status=status.HTTP_200_OK)


