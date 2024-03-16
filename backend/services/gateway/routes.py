class Service():
    def __init__(self, service_name: str, routes: dict[str, str]) -> None:
        self.name = service_name
        self.route_list = {}
        pass


AuthService = Service(
    'auth',
    {
        'authenticate': 'post',
        'validate': 'post'
    }
)
