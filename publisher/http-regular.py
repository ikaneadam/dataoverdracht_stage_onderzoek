import requests
from memory_profiler import profile
from util import measure_performance, simple_effort

connections_API_URL = "http://localhost:5000"


@profile
def generate_http_requests(amount_of_requests):
    for i in range(amount_of_requests):
        try:
            message = simple_effort()
            response = requests.post(connections_API_URL, json=message)
        except requests.exceptions.RequestException as e:
            print(f"Request {i + 1}: Failed - {e}")


amount_of_requests = 1

generate_http_requests(amount_of_requests)
