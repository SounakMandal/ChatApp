export function useCookie(key: string) {
  const setCookie = (value: any) => document.cookie = `key=${ JSON.stringify(value) }`;
  return { setCookie };
}
