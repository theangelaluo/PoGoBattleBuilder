from rest_framework import serializers

from .models import PokemonTeam

class PokemonTeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PokemonTeam
        fields = ('id', 'name', 'image', 'attack', 'defense', 'primaryType', 'secondaryType')