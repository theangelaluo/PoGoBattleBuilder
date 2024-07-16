from rest_framework import viewsets

from .serializers import PokemonTeamSerializer
from .models import PokemonTeam


class PokemonTeamViewSet(viewsets.ModelViewSet):
    queryset = PokemonTeam.objects.all().order_by('name')
    serializer_class = PokemonTeamSerializer
