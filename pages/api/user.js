import { requestHandler } from '../../lib/route-helper';

export default requestHandler().get(async ({ session }, res) => {
  if (!session.user) {
    return res.json({
      payload: { noSessionFound: true },
      message: 'No active session found',
      responseCode: 0,
    });
  }
  return res.json({ payload: { user: session.user }, message: 'Successful', responseCode: 0 });
});
