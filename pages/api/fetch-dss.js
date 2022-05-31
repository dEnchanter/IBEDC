import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { fetchAllDss } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async (req, res) => {
  const { businessUnitId, territoryId, croId } = req.query;
  const token = req.session.token;
  const dss = await fetchAllDss({ businessUnitId, territoryId, croId }, token);
  console.log(dss);
  res.json(successResponse(dss));
});
