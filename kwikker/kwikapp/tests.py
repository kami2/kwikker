from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from kwikapp.models import Kwik
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class KwikTests(APITestCase):


    def test_view_posts(self):
        url = reverse('kwikapp:kwik-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_kwik(self):
        self.testuser1 = User.objects.create_user(username='test_user1', password='123456789')
        self.client.login(username=self.testuser1.username, password='123456789')

        data = {'user': 1, "content":"New Kwik"}
        url = reverse('kwikapp:kwik-list')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_kwik_update(self):

        client = APIClient()

        self.testuser1 = User.objects.create_user(username='test_user1', password='123456789')
        self.testuser2 = User.objects.create_user(username='test_user2', password='123456789')

        test_kwik = Kwik.objects.create(id=1, user=self.testuser1, content='Test Kwik')

        client.login(username=self.testuser1.username, password='123456789')

        url = reverse(('kwikapp:detail-kwik-create'), kwargs={'pk': 1})

        response = client.put(url, {
                                    "user": 1,
                                    "content": "Frist Kwik by cyberek",
                                    }, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

