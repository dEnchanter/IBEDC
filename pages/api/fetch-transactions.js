import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { getAllTransactions } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const token = req.session.token;
  const transactions = await getAllTransactions(token);
  console.log(transactions);
  res.json(successResponse(transactions));
});
