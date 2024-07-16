from django.db import models

# Create your models here.
class PokemonTeam(models.Model):
    name = models.CharField(max_length=60)
    image = models.CharField(max_length=255)
    attack = models.IntegerField()
    defense = models.IntegerField()
    primaryType = models.CharField(max_length=60)
    secondaryType = models.CharField(max_length=60)

    def __str__(self):
        return self.name