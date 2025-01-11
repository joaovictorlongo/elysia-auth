export function handleExpireTimestamp(seconds: number) {
  const currentTimestamp = Date.now();
  const secondsToMilliseconds = seconds * 1000;
  const expirationTimestamp = currentTimestamp + secondsToMilliseconds;
  return Math.floor(expirationTimestamp / 1000);
}
