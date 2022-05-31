import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { getAllBusinessUnits } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const token = req.session.token;
  const businessUnits = await getAllBusinessUnits(token);
  res.json(successResponse(businessUnits));
});
