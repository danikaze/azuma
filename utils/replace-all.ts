export function replaceAll(str: string, what: string, by: string): string {
  const len = by.length;
  let res = str;
  let i = res.indexOf(what);

  while (i !== -1) {
    res = res.replace(what, by);
    i = res.indexOf(what, i + len);
  }

  return res;
}
