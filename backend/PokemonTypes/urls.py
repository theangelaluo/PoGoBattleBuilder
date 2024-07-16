from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

# router = routers.DefaultRouter()
# router.register(r'pokemon-types', views.handleRequest)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
# urlpatterns = [
#     path('', include(router.urls))
# ]


urlpatterns = [
    path('pokemon-types/', views.handleRequest),
]

urlpatterns = format_suffix_patterns(urlpatterns)