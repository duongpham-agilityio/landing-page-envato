export const getCookie = (cname: string): string => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};

export const setCookie = (cname: string, value: string, exSeconds: number) =>
  (document.cookie = `${cname}=${value}; max-age=${exSeconds}`);

export const clearCookie = (name: string) => setCookie(name, '', 0);
