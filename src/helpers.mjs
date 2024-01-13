import { default as defaults } from '../data/defaults.json' assert { type: 'json' };
import { default as stat_endpoints } from '../data/endpoints.json' assert { type: 'json' };
import { default as headers } from '../data/headers.json' assert { type: 'json' };

const formatFetchResponse = (json, options) => {
  // If the data doesn't need formatting, return it as is
  if (!options.formatted) {
    return options.parameters
      ? { data: json, parameters: json.parameters }
      : json;
  }

  // Initialize an empty object to store the formatted data
  const data = {};
  // Destructure parameters and resultSets from the json object
  const { parameters, resultSets } = json;

  // Iterate through each resultSet
  for (const resultSet of resultSets) {
    // If there are multiple rows in the rowSet
    if (resultSet.rowSet.length !== 1) {
      // Map each row in the rowSet to a formatted object
      const multipleRowSets = resultSet.rowSet.map((row) => {
        const temp = {};
        // Map each header to its corresponding value in the row
        resultSet.headers.forEach((header, i) => {
          temp[header] = row[i];
        });
        return temp;
      });

      // Assign the formatted array to the resultSet name in the data object
      data[resultSet.name] = multipleRowSets;
    } else {
      // If there's only one row in the rowSet, merge headers and values into an object
      const merged = {};
      resultSet.headers.forEach((header, i) => {
        merged[header] = resultSet.rowSet[0][i];
      });
      // Assign the merged object to the resultSet name in the data object
      data[resultSet.name] = merged;
    }
  }

  // If options.parameters is true, return an object with data and parameters
  return options.parameters ? { data, parameters } : data;
};

const getUrl = (params, endpoint) => {
  const { params: endpointParams, url: endpointUrl } = stat_endpoints[endpoint];
  const values = { ...endpointParams, ...params };
  const paramNames = Object.keys(values);
  const queryString = paramNames
    .map((name) => `${name}=${values[name]}`)
    .join('&');
  return `${endpointUrl}?${queryString}`;
};

export const createEndpoint = (endpoint) => (params, options) =>
  getNbaData(params, endpoint, { ...defaults, ...options });

export async function getNbaData(params, endpoint, options) {
  const url = getUrl(params, endpoint);
  const response = await fetch(url, { headers });
  const data = await response.json();
  return formatFetchResponse(data, options);
}
