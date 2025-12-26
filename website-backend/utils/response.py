def success_response(data, message="Success", code=200):
    return {
        "code": code,
        "status": "success",
        "message": message,
        "data": data
    }

def error_response(data=None, message="Error", code=400):
    return {
        "code": code,
        "status": "error",
        "message": message,
        "data": data
    }
