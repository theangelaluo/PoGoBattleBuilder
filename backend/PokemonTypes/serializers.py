# serializers.py
from rest_framework import serializers
from .models import PokemonTypes

class PokemonTypesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PokemonTypes
        fields = ('name', 'weaknesses', 'strengths')
