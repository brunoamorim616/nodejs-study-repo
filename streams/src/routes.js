import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { routeBuilder } from './utils/route-builder.js';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: routeBuilder('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title)
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'TITLE_REQUIRED_FIELD' }));

      if (!description)
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'DESCRIPTION_REQUIRED_FIELD' }));

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert('tasks', task);

      return res.writeHead(201).end(JSON.stringify(task));
    },
  },
  {
    method: 'GET',
    path: routeBuilder('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select('tasks', {
        title: search,
        description: search,
      });

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'PUT',
    path: routeBuilder('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title)
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'TITLE_REQUIRED_FIELD' }));

      if (!description)
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: 'DESCRIPTION_REQUIRED_FIELD' }));

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end({ error: 'TASK_NOT_FOUND' });
      }

      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: routeBuilder('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) return res.writeHead(404).end({ error: 'TASK_NOT_FOUND' });

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: routeBuilder('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) return res.writeHead(404).end();

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update('tasks', id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
