import { requestHandler } from '../../lib/route-helper';

export default requestHandler().get(async (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful', responseCode: 0 });
});
