import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Career, CareerApplication
from .serializers import CareerSerializer, CareerApplicationSerializer
from utils.response import success_response, error_response

logger = logging.getLogger("scifyx")

class CareerListAPIView(APIView):
    def get(self, request):
        logger.debug("CareerListAPIView.get called")
        try:
            careers = Career.objects.filter(active=True).order_by('created_at')
            serializer = CareerSerializer(careers, many=True)
            logger.info("Active careers fetched", extra={"count": len(serializer.data)})
            return Response(success_response(serializer.data, "Active careers fetched"))
        except Exception as e:
            # log exception with traceback and request context
            logger.exception("Error fetching active careers: %s", str(e), extra={"path": request.path, "method": request.method})
            return Response(error_response({}, "Internal server error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CareerApplicationAPIView(APIView):
    def post(self, request):
        logger.debug("CareerApplicationAPIView.post called")
        try:
            serializer = CareerApplicationSerializer(data=request.data)
            if serializer.is_valid():
                application = serializer.save()
                logger.info("Career application submitted", extra={"application_id": getattr(application, "id", None)})
                return Response(success_response(serializer.data, "Application submitted"), status=status.HTTP_201_CREATED)
            else:
                logger.error("Invalid career application data", extra={"errors": serializer.errors})
                return Response(error_response(serializer.errors, "Invalid data"), status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # log exception with traceback and request context
            logger.exception("Unexpected error submitting career application: %s", str(e), extra={"path": request.path, "method": request.method})
            return Response(error_response({}, "Internal server error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)