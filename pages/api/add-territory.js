import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { saveTerritory } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async ({ body }, res) => {
  const savedTerritory = await saveTerritory(body);
  res.json(successResponse(savedTerritory));
});
