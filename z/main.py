from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def index():
    return {'message': 'Hello World'}


@app.get('/template/{id}')
def get_template(id: int):
    return {"code": 0, "data": '''
            {
            "name": "test",
             "props": ["prop1", "prop2"],
             "data": {
                "name": { "type": "string" },
                "age": { "type": "number" },
                "complex": {
                    "type": "object",
                    "default": {
                        "a": {"type": "string"},
                        "b": {"type": "number"}
                    }
                }
             },
             "render2": {
                "h1": {
                    "style": {
                        "color": "red"
                    },
                    "children": {
                        "strong": "strong text",
                        "span": {
                            "style": { "textDecoration": "underline" },
                            "children": "hello world"
                        }
                    }
                }
             },
            "render": [
                "h1",
                {
                    "style": {
                        "color": "green"
                    }
                },
                [
                    ["strong", null, "strong text"],
                    ["a", {
                        "style": {
                            "textDecoration": "underline"
                        }
                    }, "hello world"]
                ]
            ]
            }
            '''
            }


@app.post('/template')
def create_template(template: dict):
    return template


@app.put('/template/{id}')
def update_template(id: int, template: dict):
    return {'template_id': id, **template}
