from django.urls import path, include
from .views import KwikList, CustomUserCreate, BlacklistTokenUpdateView
from rest_framework.routers import DefaultRouter

app_name='kwikapp'

router = DefaultRouter()
router.register('', KwikList, basename='kwik')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]
