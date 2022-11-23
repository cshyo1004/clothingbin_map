from django.db import models

# Create your models here.
class bin_info(models.Model):
    dong = models.CharField(max_length=20)
    street = models.TextField(blank=True)
    lot = models.TextField(blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateField()