import * as uuid from "uuid";

import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

// Days in milliseconds
export const DAYS = 1000 * 60 * 60 * 24;

export const TWO_DAYS = 2 * DAYS;

export interface CreateTodoItemInput {
  userId: string;
  request: CreateTodoRequest | UpdateTodoRequest;
}

export const createTodoItem = ({
  userId,
  request,
}: {
  userId: string;
  request: CreateTodoRequest | UpdateTodoRequest;
}): TodoItem => {
  const todoId = uuid.v4();
  const createdAt = new Date().toISOString();

  return {
    todoId,
    userId,
    createdAt,
    done: false,
    ...request,
  };
};
