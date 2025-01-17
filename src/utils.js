const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('./vars');

const buildQuery = (base, query) => {
  const builtQuery = buildQueryString(base, query);
  const sqlParams = buildParams(query);
  console.log(builtQuery, sqlParams);
  return [builtQuery, sqlParams];
};

const buildParams = query => {
  const sqlParams = [];

  for (const param in query) {
    if (param !== 'page' && param !== 'per_page') {
      sqlParams.push(query[param]);
    }
  }

  return sqlParams;
};

const buildQueryString = (base, query) => {
  let builtQuery = base;

  const params = Object.keys(query)
    .filter(p => p !== 'page')
    .filter(p => p !== 'per_page');

  for (let i = 0; i < params.length; i++) {
    if (i === 0) builtQuery += ` WHERE ${params[i]} = $${i + 1}`;
    else builtQuery += ` AND ${params[i]} = $${i + 1}`;
  }

  builtQuery = buildPagination(query, builtQuery);

  return builtQuery;
};

const buildPagination = (query, sqlQuery) => {
  let page = query.page - 1 || DEFAULT_PAGE;
  let perPage = query.per_page || DEFAULT_PER_PAGE;

  if (page < 0) page = 0;
  if (perPage < 10) perPage = 10;
  if (perPage > 50) perPage = 50;

  return (sqlQuery += ` OFFSET ${page * perPage} LIMIT ${perPage}`);
};

const isObjEmpty = obj => Object.keys(obj).length === 0;

module.exports = { buildQuery, isObjEmpty };
