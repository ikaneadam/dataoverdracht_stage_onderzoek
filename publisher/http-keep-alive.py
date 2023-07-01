import requests
from util import measure_performance, simple_effort
from memory_profiler import profile

connections_API_URL = "http://localhost:5001"


@profile
def generate_http_requests(amount_of_requests):
    session = requests.Session()
    session.keep_alive = True

    for i in range(amount_of_requests):
        try:
            message = simple_effort()
            response = session.post(connections_API_URL, message, json=message)
        except requests.exceptions.RequestException as e:
            print(f"Request {i + 1}: Failed - {e}")


amount_of_requests = 1

generate_http_requests(amount_of_requests)
