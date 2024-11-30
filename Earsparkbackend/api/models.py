from django.db import models
from django.contrib.auth.models import User

class Data(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Allow null and blank for optional user
    username = models.CharField(max_length=20, blank=True, null=True)  # Optional field, max length defined
    correct_answers = models.IntegerField(default=0)  # Default value for correct answers
    wrong_answers = models.IntegerField(default=0)  # Default value for wrong answers
    points = models.IntegerField(default=0)  # Default value for points
    number_of_exercises = models.IntegerField(default=0)  # Default number of exercises
    count_seconds = models.DurationField(default="0")  # Default value as 0 seconds
    average_answer_time = models.DurationField(default="0")  # Default average time as 0 seconds
    total_time = models.IntegerField(default=0)  # Default total time in seconds

    def __str__(self):
        return f"Data for {self.user.username if self.user else self.username or 'Unknown User'}"

    def save(self, *args, **kwargs):
        # You can add custom save logic here if necessary.
        # For example, calculating average_answer_time based on the count_seconds and number_of_exercises
        if self.number_of_exercises > 0:
            self.average_answer_time = self.count_seconds / self.number_of_exercises
        super().save(*args, **kwargs)  # Call the original save method
