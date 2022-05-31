import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { createTransactionType } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async (req, res) => {
  console.log(req.body);
  const token = req.session.token;
  const result = await createTransactionType(req.body, token);
  res.json(successResponse(result));
});
