import { http, HttpResponse } from 'msw';
import { create, getById, getAll, login, credentials } from './data.js';

export const handlers = [
  http.get(
    'https://nextgen-project.onrender.com/api/s11d2/friends',
    ({ request }) => {
      if (request.headers.get('authorization') === credentials.token) {
        return HttpResponse.json(getAll());
      } else {
        return HttpResponse.json(
          { message: 'User not currently logged in.' },
          { status: 403 }
        );
      }
    }
  ),
  http.get(
    'https://nextgen-project.onrender.com/api/s11d2/friends/:id',
    ({ request, params }) => {
      if (request.headers.get('authorization') === credentials.token) {
        return HttpResponse.json(getById(params.id));
      } else {
        return HttpResponse.json(
          { message: 'User not currently logged in.' },
          { status: 403 }
        );
      }
    }
  ),
  http.post(
    'https://nextgen-project.onrender.com/api/s11d2/login',
    async ({ request }) => {
      const info = await request.json();
      const result = login(info);
      if (result.status === 200) {
        return HttpResponse.json(result.data);
      } else {
        return HttpResponse.json(
          { message: result.message },
          { status: result.status }
        );
      }
    }
  ),
  http.post(
    'https://nextgen-project.onrender.com/api/s11d2/logout',
    async ({ request }) => {
      if (request.headers.get('authorization') === credentials.token) {
        return HttpResponse.json(credentials);
      } else {
        return HttpResponse.json(
          { message: 'User not currently logged in.' },
          { status: 403 }
        );
      }
    }
  ),
  http.post(
    'https://nextgen-project.onrender.com/api/s11d2/friends',
    async ({ request }) => {
      const info = await request.json();
      if (request.headers.get('authorization') === credentials.token) {
        return HttpResponse.json(create(info));
      } else {
        return HttpResponse.json(
          { message: 'User not currently logged in.' },
          { status: 403 }
        );
      }
    }
  ),
];
