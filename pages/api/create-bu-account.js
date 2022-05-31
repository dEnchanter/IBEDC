import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { createBusinessAccount } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async (req, res) => {
  const token = req.session.token;
  const result = await createBusinessAccount(req.body, token);
  res.json(successResponse(result));
});