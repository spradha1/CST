// An async request for time delayed by a second
export function fetchSeconds () {
  return new Promise<{}>((resolve) =>
    setTimeout(() => resolve({}), 1000)
  );
}
