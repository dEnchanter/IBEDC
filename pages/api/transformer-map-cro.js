import { authenticatedRequestHandler, successResponse } from '../../lib/route-helper';
import { assignTransformerToCro } from '../../dev-mock/db';

export default authenticatedRequestHandler().post(async ({ body }, res) => {
  const { transformerId, croId, croName } = body;
  await assignTransformerToCro(transformerId, croId, croName);
  res.json(successResponse());
});
