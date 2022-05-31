import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { fetchTransactionTypes } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const token = req.session.token;
  const transactionTypes = await fetchTransactionTypes(token);
  console.log(transactionTypes);
  res.json(successResponse(transactionTypes));
});
