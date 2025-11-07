// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assignDiff(target: any, source: any) {
  for (const key of new Set(Object.keys(target)).difference(new Set(Object.keys(source)))) {
    delete target[key];
  }
  Object.assign(target, source);
}
