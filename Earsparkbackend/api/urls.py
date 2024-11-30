from django.urls import path
from . import views
from .views import DataListView, DataCreateView, DataDetailView, DataUpdateView, DataDeleteView, UserDetailView

urlpatterns = [
    # Data-related views
    path('data/', DataListView.as_view(), name='data-list'),  # List all data
    path('data/create/', DataCreateView.as_view(), name='data-create'),  # Create new data
    path('data/<int:pk>/', DataDetailView.as_view(), name='data-detail'),  # Retrieve specific data
    path('data/<int:pk>/update/', DataUpdateView.as_view(), name='data-update'),  # Update data
    path('data/<int:pk>/delete/', DataDeleteView.as_view(), name='data-delete'),  # Delete data
    path('data/<int:pk>/user/', UserDetailView.as_view(), name='user-detail'),
    
]
