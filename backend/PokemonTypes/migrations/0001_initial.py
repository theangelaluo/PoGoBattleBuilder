# Generated by Django 4.2.14 on 2024-07-15 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PokemonTypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('weaknesses', models.CharField(max_length=255)),
                ('strengths', models.CharField(max_length=255)),
            ],
        ),
    ]
