from django.contrib import admin
from .models import Data, Chords, Intervals, Notes, Scales, Rhythm
# Register your models here.
admin.site.register(Data)
admin.site.register(Chords)
admin.site.register(Intervals)
admin.site.register(Notes)
admin.site.register(Scales)
admin.site.register(Rhythm)