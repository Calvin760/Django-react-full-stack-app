from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta


class Data(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Allow null and blank for optional user
    username = models.CharField(max_length=20, blank=True, null=True)  # Optional field, max length defined
    points = models.IntegerField(default=0)  # Default value for points
    number_of_exercises = models.IntegerField(default=0)  # Default number of exercises
    count_seconds = models.DurationField(default=timedelta(seconds=0))  # Default value as 0 seconds
    average_answer_time = models.DurationField(default=timedelta(seconds=0))  # Default average time as 0 seconds
    total_time = models.IntegerField(default=0)  # Default total time in seconds

    def __str__(self):
        return f"Data for {self.user.username if self.user else self.username or 'Unknown User'}"

    def save(self, *args, **kwargs):
        # Custom save logic to calculate average_answer_time
        if self.number_of_exercises > 0:
            self.average_answer_time = self.count_seconds / self.number_of_exercises
        super().save(*args, **kwargs)  # Call the original save method


class Chords(models.Model):
    CHORD_TYPES = [
        ('major', 'Major'),
        ('minor', 'Minor'),
        ('sus2', 'Sus2'),
        ('sus4', 'Sus4'),
        ('diminished', 'Diminished'),
    ]
    
    points = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)  # Default value for correct answers
    wrong_answers = models.IntegerField(default=0)  # Default value for wrong answers
    total_time = models.IntegerField(default=0)
    chord_sounds = models.FileField(upload_to='chords/', max_length=100)  # Store the sound files
    chord_type = models.CharField(max_length=20, choices=CHORD_TYPES, default='major')  # Default value for chord type

    def __str__(self):
        return f"{self.chord_type} Chord"


class Intervals(models.Model):
    INTERVAL_TYPES = [
        ('minorsecond', 'Minor second'),
        ('minorthird', 'Minor third'),
        ('majorsecond', 'Major second'),
        ('perfectfourth', 'Perfect fourth'),
        ('perfectfifth', 'Perfect fifth'),
        ('octave', 'Octave'),
    ]
    
    points = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    wrong_answers = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)
    interval_sounds = models.FileField(upload_to='interval_sounds/', max_length=100)  # File path for interval sound
    interval_type = models.CharField(max_length=20, choices=INTERVAL_TYPES, default='minorsecond')  # Default value for interval type

    def __str__(self):
        return f"Interval: {self.interval_type}"


class Notes(models.Model):
    NOTE_TYPES = [
        ('C', 'C'),
        ('C#', 'C#'),
        ('D', 'D'),
        ('D#', 'D#'),
        ('E', 'E'),
        ('F', 'F'),
        ('F#', 'F#'),
        ('G', 'G'),
        ('G#', 'G#'),
        ('A', 'A'),
        ('A#', 'A#'),
        ('B', 'B'),
    ]
    
    points = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    wrong_answers = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)
    note_sounds = models.FileField(upload_to='note_sounds/', max_length=100)  # File path for note sound
    note_name = models.CharField(max_length=20, choices=NOTE_TYPES, default='C')  # Default value here
    
    def __str__(self):
        return f"Note: {self.note_name}"


class Scales(models.Model):
    SCALE_TYPES = [
        ('Minor Scale', 'Minor Scale'),
        ('Major Scale', 'Major Scale'),
        ('Harmonic Minor', 'Harmonic Minor'),
        ('Pentatonic', 'Pentatonic'),
    ]
    
    points = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    wrong_answers = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)
    scale_sounds = models.FileField(upload_to='scale_sounds/', max_length=100)  # File path for scale sound
    scale_type = models.CharField(max_length=20, choices=SCALE_TYPES, default='Major Scale')  # Default value for scale type

    def __str__(self):
        return f"Scale: {self.scale_type}"


class Rhythm(models.Model):
    points = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)  # Default value for correct answers
    wrong_answers = models.IntegerField(default=0)  # Default value for wrong answers
    total_time = models.IntegerField(default=0)
    rhythmic_sounds = models.FileField(upload_to='rhythms/', max_length=100)  # Directory for rhythm sound files

    def __str__(self):
        return f"Rhythm: {self.id}"
