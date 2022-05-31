import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { fetchUsers } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const token = req.session.token;
  const businessUnits = await fetchUsers(token);
  res.json(successResponse(businessUnits));
});
