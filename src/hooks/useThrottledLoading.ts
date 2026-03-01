import { useThrottledValue } from "@tanstack/react-pacer";

export function useThrottledLoading(isFetching: boolean, wait = 500) {
  const [throttledFetching] = useThrottledValue(isFetching, { wait });
  return throttledFetching;
}
