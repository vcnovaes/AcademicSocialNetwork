import uuid


def add_id(obj):
    obj.id = str(uuid.uuid4())
