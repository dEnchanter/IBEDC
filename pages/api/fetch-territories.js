import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { getTerritories } from '../../dev-mock/db';

export default authenticatedRequestHandler().get(async ({ query }, res) => {
  const territories = await getTerritories(query?.businessUnitId);
  res.json(successResponse(territories));
});
