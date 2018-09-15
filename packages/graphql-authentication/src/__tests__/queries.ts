import {
  client,
  startServer,
  clientWithAuth,
  clientWithExpiredAuth
} from './setup';

test('currentUser - throw error when login fails', async () => {
  const req = client(await startServer());
  expect.assertions(1);

  try {
    await req.request(`query {
      currentUser {
        token
        user {
          name
        }
      }
    }`);
  } catch (e) {
    expect(String(e)).toMatch(/Not authorized/);
  }
});

test('currentUser - throw error when token expired', async () => {
  const req = clientWithExpiredAuth(await startServer());
  expect.assertions(1);

  try {
    await req.request(`query {
      currentUser {
        token
        user {
          name
        }
      }
    }`);
  } catch (e) {
    expect(String(e)).toMatch(/Token expired/);
  }
});

test('currentUser - fetch user data', async () => {
  const req = clientWithAuth(await startServer());

  const result = await req.request(`query {
    currentUser {
      token
      user {
        name
      }
    }
  }`);

  expect((result as any).currentUser.user.name).toBe('Kees');
});
