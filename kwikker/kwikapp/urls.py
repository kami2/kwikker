from django.urls import path, include
from .views import KwikList, KwikDetail, CustomUserCreate, BlacklistTokenUpdateView

app_name='kwikapp'


urlpatterns = [
    path('<int:pk>/', KwikDetail.as_view(), name='detail_kwik'),
    path('', KwikList.as_view(), name='kwik'),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]
