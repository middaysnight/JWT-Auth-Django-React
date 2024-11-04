from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(blank=True, null=True)  # Email is now optional
    USERNAME_FIELD = "username"  # Set username as the unique identifier
    REQUIRED_FIELDS = []  # Empty list since we no longer require an email or other fields

    def __str__(self) -> str:
        return self.username
