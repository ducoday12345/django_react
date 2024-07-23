from django.urls import path
from . import views
'''
NOTE
pk: primary key 
this url file is related to note management
'''
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]