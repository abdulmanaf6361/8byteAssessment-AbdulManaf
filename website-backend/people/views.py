import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import People
from .serializers import PeopleSerializer
from utils.response import success_response, error_response

logger = logging.getLogger("scifyx")

class PeopleListAPIView(APIView):
    def get(self, request):
        logger.debug("PeopleListAPIView.get called")
        try:
            people = People.objects.filter(active=True).order_by('created_at')
            serializer = PeopleSerializer(people, many=True)
            logger.info("People list fetched", extra={"count": len(serializer.data)})
            return Response(success_response(serializer.data, "People list fetched"))
        except Exception as e:
            # log the exception message + full traceback
            logger.exception("Error fetching people list: %s", str(e), extra={"path": request.path, "method": request.method})
            return Response(error_response({}, "Internal server error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
