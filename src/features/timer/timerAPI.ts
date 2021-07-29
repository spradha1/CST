// An async request to delay time by a second
export function delaySecond () {
  return new Promise<{}>((resolve) =>
    setTimeout(() => resolve({}), 1000)
  );
}