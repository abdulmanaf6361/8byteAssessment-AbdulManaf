import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response

logger = logging.getLogger("scifyx")

@api_view(["GET"])
def health_check(request):
    logger.debug("health_check called", extra={"path": request.path, "method": request.method})
    try:
        logger.info("health check OK")
        return Response({"status": "ok"}, status=200)
    except Exception:
        logger.exception("health_check failed")
        return Response({"status": "error"}, status=500)

