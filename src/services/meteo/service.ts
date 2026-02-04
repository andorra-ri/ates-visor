const CORS_PROXY = 'https://corsproxy.io/?';
const AVALANCHE_URL = '/.netlify/functions/neige';
const NODE_SELECTOR = 'neige[data="europeu"]';
const ATTRIBUTE = 'idstate';

const parser = new window.DOMParser();

export const getAvalancheRisk = async () => {
  const response = await fetch(AVALANCHE_URL);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.text();
  const xml = parser.parseFromString(data, 'text/xml');
  const nodes = [...xml.querySelectorAll(NODE_SELECTOR)];
  return Math.max(...nodes.map(node => +(node.getAttribute(ATTRIBUTE) ?? 0)));
};
