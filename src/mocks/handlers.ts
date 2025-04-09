import { http, HttpResponse } from 'msw';

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody {
  email: string;
}

interface ForgotPasswordBody {
  email: string;
}

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as LoginBody;

    const { email, password } = body;

    // Add mock logic here
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json(
        {
          user: {
            username: 'Test User',
            role: 'agent',
            token: '123abc',
          },
        },
        { status: 200 }
      );
    }
    if (email === 'admin@example.com' && password === 'admin123') {
      return HttpResponse.json(
        {
          user: {
            username: 'Admin User',
            role: 'admin',
            token: '456def',
          },
        },
        { status: 200 }
      );
    }
    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),

  http.post('/api/signup', async ({ request }) => {
    // Add mock logic here
    const body = (await request.json()) as SignupBody;

    // Simulate error if email contains "fail"
    if (body.email?.includes('fail')) {
      return HttpResponse.json({ message: 'Signup failed. Please try again.' }, { status: 400 });
    }

    return HttpResponse.json({ message: 'Signup successful' }, { status: 201 });
  }),

  http.post('/api/forgot-password', async ({ request }) => {
    const body = (await request.json()) as ForgotPasswordBody;

    // Simulate error if email contains "fail"
    if (!body.email || body.email.includes('fail')) {
      return HttpResponse.json(
        { message: 'Failed to send reset link. Please check the email.' },
        { status: 400 }
      );
    }

    return HttpResponse.json({ message: 'Reset link sent' }, { status: 200 });
  }),
];
