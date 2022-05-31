import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { createDss } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async (req, res) => {
  const token = req.session.token;
  const result = await createDss(req.body, token);
  res.json(successResponse(result));
});