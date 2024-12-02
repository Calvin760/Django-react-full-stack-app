from django.contrib import admin
from django.urls import path, include
from api.views import UserCreateView, UserProfileView, ChordsView, IntervalsView, NotesView, ScalesView, RhythmView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", UserCreateView.as_view(),name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/username/', UserProfileView.as_view(), name='user-profile'),
    path('api/chords/', ChordsView.as_view(), name='chords-list-create'),
    # path('api/data/', DataView.as_view(), name='data-list-create'),
    path('api/intervals/', IntervalsView.as_view(), name='intervals-list-create'),
    path('api/notes/', NotesView.as_view(), name='notes-list-create'),
    path('api/scales/', ScalesView.as_view(), name='scales-list-create'),
    path('api/rhythm/', RhythmView.as_view(), name='rhythm-list-create'),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    
    
]