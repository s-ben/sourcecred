// @flow

export type Address = {
  repositoryName: string,
  pluginName: string,
  id: string,
};

export type Node<T> = {
  address: Address,
  edges: Address[],
  payload: T,
};

export type Edge<T> = {
  address: Address,
  sourceId: Address,
  destId: Address,
  weight: number,
  payload: T,
};

export type Graph = {
  nodes: {[stringAddress: string]: Node<mixed>},
  edges: {[stringAddress: string]: Edge<mixed>},
};

export function addressToString(address: Address) {
  if (address.pluginName.includes("$")) {
    const escaped = JSON.stringify(address.pluginName);
    throw new Error(`address.pluginName must not include "\$": ${escaped}`);
  }
  if (address.repositoryName.includes("$")) {
    const escaped = JSON.stringify(address.repositoryName);
    throw new Error(`address.repositoryName must not include "\$": ${escaped}`);
  }
  if (address.id.includes("$")) {
    const escaped = JSON.stringify(address.id);
    throw new Error(`address.id must not include "\$": ${escaped}`);
  }
  return `${address.pluginName}\$${address.repositoryName}\$${address.id}`;
}

export function stringToAddress(string: string) {
  const parts = string.split("$");
  if (parts.length !== 3) {
    const escaped = JSON.stringify(string);
    throw new Error(`Input should have exactly two \$s: ${escaped}`);
  }
  return {
    pluginName: parts[0],
    repositoryName: parts[1],
    id: parts[2],
  };
}