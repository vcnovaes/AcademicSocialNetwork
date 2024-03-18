import json
import requests


class IRequestBuilder:
    def with_method(self, method):
        pass

    def with_route(self, route):
        pass

    def for_service(self, service_name):
        pass

    def with_payload(self, body):
        pass

    def execute(self):
        pass


class RequestBuilder(IRequestBuilder):
    def __init__(self,
                 service_provider,
                 service_name: str,
                 method: str,
                 body: str = None,
                 route: str = None,
                 ) -> None:
        self.method: str = method
        self.route = route
        self.service = service_name
        self.host = service_provider.get(self.service)
        self.service_provider = service_provider
        self.body = body
        pass

    def with_method(self, method) -> IRequestBuilder:
        self.method = method
        return self

    def with_route(self, route) -> IRequestBuilder:
        self.route = route
        return self

    def for_service(self, service_name) -> IRequestBuilder:
        self.service = service_name
        self.host = self.service_provider[self.service]
        return self

    def with_payload(self, body) -> IRequestBuilder:
        self.body = body
        return self

    def __build_url(self):
        return self.host+'/'+self.route

    def execute(self) -> IRequestBuilder:

        if self.service == 'test':
            return {
                'method': self.method,
                'service_name': self.service,
                'route': self.route,
                'body': self.body
            }
        print("Requesting: ", self.__build_url())
        print("Payload: ", self.body)
        match self.method.lower():
            case 'post':
                return requests.post(self.__build_url(), json=self.body).json()
            case 'put':
                return requests.put(self.__build_url(), json=self.body).json()
            case 'get':
                return requests.get(self.__build_url()).json()
            case 'delete':
                return requests.delete(self.__build_url(), json=self.body).json()
