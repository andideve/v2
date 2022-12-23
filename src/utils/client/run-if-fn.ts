export default function runIfFn<T = unknown>(valOrFn: T) {
  return typeof valOrFn === 'function' ? valOrFn() : valOrFn;
}
