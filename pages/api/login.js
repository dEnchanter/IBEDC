import { authenticateUser } from '../../dev-mock/db';
import { requestHandler } from '../../lib/route-helper';

export default requestHandler().post(async ({ body, session }, res) => {
  try {
    const user = await authenticateUser(body.username, body.password);
    if (user && user.role === 'CRO') {
      const { token, ...rest } = user;
      session.user = rest;
      session.token = token;
      await session.save();
      return res.json({ message: 'Login successful', responseCode: 0 });
    }
  } catch (error) {
    console.error(error);
  }
  return res.json({ message: 'Login failed', responseCode: 10 });
});
