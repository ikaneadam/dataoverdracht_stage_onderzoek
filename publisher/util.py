import psutil


def measure_performance(func):
    def wrapper(*args, **kwargs):
        process = psutil.Process()
        start_cpu = psutil.cpu_percent()
        start_time = psutil.Process().cpu_times().user
        result = func(*args, **kwargs)
        end_cpu = psutil.cpu_percent()
        end_time = psutil.Process().cpu_times().user
        cpu_usage = end_cpu - start_cpu
        cpu_time = end_time - start_time
        print(f"CPU time: {cpu_time} seconds")
        print(f"CPU Usage: {cpu_usage} %")
        return result

    return wrapper


def simple_effort():
    result = 1
    for i in range(1, 10 + 1):
        result *= i
    return {"message": result}
