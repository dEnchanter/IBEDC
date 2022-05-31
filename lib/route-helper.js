import nc from 'next-connect';
import { ironSession } from 'iron-session/express';
import { withIronSessionSsr } from 'iron-session/next';

export const sessionOptions = {
  password: process.env.COOKIE_PASSWORD,
  cookieName: 'ibedclorclnt',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

const session = ironSession(sessionOptions);

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, options);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function requestHandler() {
  return nc({ onError }).use(session);
}

export function authenticatedRequestHandler() {
  return nc({ onError })
    .use(session)
    .use((req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.status(401).send('Session expired');
      }
    });
}

export function successResponse(payload, message) {
  return { responseCode: 0, message: message || 'Successful', payload: payload };
}

function onError(err, req, res, next) {
  console.log(err.stack);
  res.status(500).end('Server error occurred');
}
