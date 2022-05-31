import cryptoRandomString from 'crypto-random-string';
import { compareAsc, compareDesc, parse } from 'date-fns';
import fs from 'fs';
import { post, throwOnHttpError, throwOnResponseError } from '../lib/httpHelper';

const { readFile, writeFile } = fs.promises;

const baseUrl = process.env.BASE_URL;

export async function authenticateUser(username, password) {
  const response = await post(baseUrl + 'auth/login', { username, password });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function addBU(buName, token) {
  const response = await post(baseUrl + 'core/bunit/create', { buName }, { token });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function saveTerritory(territory) {
  const territoriesRaw = await readFile(`${process.cwd()}/dev-mock/territories.json`);
  const territories = territoriesRaw.byteLength ? JSON.parse(territoriesRaw) : [];

  const territoryId = cryptoRandomString({ length: 5 });
  const newTerritory = { ...territory, id: territoryId, createDate: new Date() };
  const updatedTerritories = [...territories, newTerritory];
  await writeFile(`${process.cwd()}/dev-mock/territories.json`, JSON.stringify(updatedTerritories));
  return newTerritory;
}

export async function createDss(data, token) {
  console.log(data);
  const response = await post(baseUrl + 'core/dss/create', data, { token });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  console.log(result);
  return result.data;
}

export async function createBusinessAccount(data, token) {
  console.log(data);
  const response = await post(baseUrl + 'core/bunit/account/create', data, { token });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  console.log(result);
  return result.data;
}

export async function createTransactionType(data, token) {
  console.log(data);
  const response = await post(baseUrl + 'core/transaction-type/create', data, { token });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  console.log(result);
  return result.data;
}

export async function mapCro(data, token) {
  console.log(data);
  const response = await post(baseUrl + 'core/mapping/cro', data, { token });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  console.log(result);
  return result.data;
}

export async function assignTransformerToCro(transformerId, croId, croName) {
  const transformersRaw = await readFile(`${process.cwd()}/dev-mock/transformer.json`);
  const transformers = transformersRaw.byteLength ? JSON.parse(transformersRaw) : [];

  const updatedTransformers = transformers.map((t) => {
    if (t.id === transformerId) {
      return { ...t, ...{ croId, croName, updateDate: new Date() } };
    }
    return t;
  });

  await writeFile(
    `${process.cwd()}/dev-mock/transformer.json`,
    JSON.stringify(updatedTransformers)
  );
}

export async function getAllBusinessUnits(token) {
  const response = await fetch(baseUrl + 'core/bunit/fetch/all', {
    headers: {
      token: token,
    },
  });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function fetchUsers(token) {
  const response = await fetch(baseUrl + 'core/users/get-all', {
    headers: {
      token: token,
    },
  });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function fetchTransactionTypes(token) {
  const response = await fetch(baseUrl + 'core/transaction-type/fetch', {
    headers: {
      token: token,
    },
  });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function getAllTransactions(
  token,
  dateRange = { startDate: '2021-10-06', endDate: '2022-10-07' }
) {
  const response = await post(baseUrl + 'core/transaction/history', dateRange, {
    token: token,
  });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}

export async function getAllCrUsers() {
  const usersRaw = await readFile(`${process.cwd()}/dev-mock/user.json`);
  const users = usersRaw.byteLength ? JSON.parse(usersRaw) : [];
  return users.filter((user) => user.role === 'COR');
}

export async function findUser(userId) {
  const usersRaw = await readFile(`${process.cwd()}/dev-mock/user.json`);
  const users = usersRaw.byteLength ? JSON.parse(usersRaw) : [];
  return users.find((user) => user.token === userId);
}

export async function getTerritories(businessUnitId) {
  const territoriesRaw = await readFile(`${process.cwd()}/dev-mock/territories.json`);
  let territories = territoriesRaw.byteLength ? JSON.parse(territoriesRaw) : [];
  if (businessUnitId) {
    territories = territories.filter((t) => t.businessUnitId === businessUnitId);
  }
  return territories.sort((t1, t2) =>
    compareDesc(new Date(t1.createDate), new Date(t2.createDate))
  );
}

export async function fetchAllDss({ businessUnitId, territoryId, croId }, token) {
  const response = await fetch(baseUrl + 'core/dss/fetch/all', {
    headers: {
      token: token,
    },
  });
  throwOnHttpError(response);
  const result = await response.json();
  throwOnResponseError(result);
  return result.data;
}
