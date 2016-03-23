from django.db import models

# Create your models here.
class pipelines(models.Model):
    #pipeline_name=models.CharField(max_length=20)
    pipeline_data=models.TextField(max_length=10000)

