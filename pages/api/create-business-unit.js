import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { addBU } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async (req, res) => {
  const businessUnitName = req.body.businessName;
  const token = req.session.token;
  const savedBU = await addBU(businessUnitName, token);
  res.json(successResponse(savedBU));
});
