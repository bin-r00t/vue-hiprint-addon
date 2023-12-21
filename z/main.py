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
                            "color": "#0b58ff",
                            "textDecoration": "underline"
                        }
                    }, "hello world: ${this.prop1}"]
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
