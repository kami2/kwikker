from django.urls import path
from .views import KwikList, KwikDetail, CustomUserCreate, BlacklistTokenUpdateView

app_name='kwikapp'

urlpatterns = [
    path('<int:pk>/', KwikDetail.as_view(), name='detail-kwik-create'),
    path('', KwikList.as_view(), name='kwik-list'),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]
