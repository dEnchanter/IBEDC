import { authenticatedRequestHandler, successResponse } from '../../../lib/route-helper';
import { findUser } from '../../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const { userId } = req.query;
  const crUser = await findUser(userId);
  if (crUser) {
    res.json(successResponse(crUser));
  } else {
    res.status(404).end('User not found');
  }
});
