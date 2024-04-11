import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import * as service from '../services/user.service';

export const handler = async (
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> => {
  console.log(`INVOCATION_ID => ${context?.invocationId}`);

  if (request.method === 'GET') {
    return { status: 200 };
  }

  if (request.method === 'POST') {
    const created = service.create();
    if (created !== true) return { status: 400 };
    return { status: 201 };
  }
};

app.http('user', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler,
});
