import { authenticatedRequestHandler, successResponse } from '../../../lib/route-helper';
import { getAllCrUsers } from '../../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const crUsers = await getAllCrUsers();
  res.json(successResponse(crUsers));
});
