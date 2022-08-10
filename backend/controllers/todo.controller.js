import { StatusCodes as HTTP_STATUS_CODES } from "http-status-codes";
import { randomUUID } from "crypto";

const todos = [
  {
    id: "f097d414-4cca-40df-8b01-32c616b2dfc9",
    title: "Estudar Node.JS",
    description: "Aprender Node.JS criando uma API simples",
    createdAt: "2022-08-10T17:42:18.469Z",
    updatedAt: "2022-08-10T17:42:18.469Z",
    isCompleted: false,
  },
  {
    id: "cae6004f-a038-449e-9c11-3d9512759e8c",
    title: "Estudar TypeScript",
    description: "Aprender TypeScript e criar um projeto simples para teste",
    createdAt: "2022-08-08T17:42:18.469Z",
    updatedAt: "2022-08-08T17:42:18.469Z",
    isCompleted: false,
  },
  {
    id: "9ba445e0-7394-49bc-b052-ff2b41b59dff",
    title: "Estudar Nest.JS",
    description: "Aprender NestJS criando uma API simples",
    createdAt: "2022-08-07T17:42:18.469Z",
    updatedAt: "2022-08-07T17:42:18.469Z",
    isCompleted: false,
  },
];

function getAll(req, res) {
  res.send(todos);
}

function getById(req, res) {
  const id = req.params["id"];
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send();
    return;
  }

  res.send(todo);
}

function create(req, res) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send();
    return;
  }

  const date = new Date().toISOString();
  const newTodo = {
    ...body,
    id: randomUUID(),
    createdAt: date,
    updatedAt: date,
    isCompleted: false,
  };

  todos.push(newTodo);

  res.status(HTTP_STATUS_CODES.CREATED).send(newTodo);
}

function updateById(req, res) {
  const id = req.params["id"];
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send();
    return;
  }

  const indexTodo = todos.findIndex((todo) => todo.id === id);

  if (indexTodo === -1) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send();
    return;
  }
  const date = new Date().toISOString();
  const todo = todos[indexTodo];

  todos[indexTodo] = { ...todo, ...body, updatedAt: date };

  res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
}

function deleteById(req, res) {
  const id = req.params["id"];

  const indexTodo = todos.findIndex((todo) => todo.id === id);

  if (indexTodo === -1) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ error: "Id not found!" });
    return;
  }

  todos.splice(indexTodo, 1);

  res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
}

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
