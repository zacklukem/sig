export type Hook = {
  onUnmount?: () => void;
};

const trackingStack: Hook[][] = [];

export function mark(hook: Hook) {
  if (trackingStack.length === 0) {
    throw new Error("Hooks cannot be called outside a component initializer");
  }

  trackingStack[trackingStack.length - 1]!.push(hook);
}

export function trackHooks<T>(fn: () => T): [T, Hook[]] {
  const ctx: Hook[] = [];
  trackingStack.push(ctx);
  const ret = fn();
  trackingStack.pop();
  return [ret, ctx];
}
