export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

type Func = (...args: any[]) => void;

export function throttle<T extends Func>(func: T, delay: number): (...args: Parameters<T>) => void {
    let isThrottled = false
    let savedArgs: Parameters<T> | null = null
    let savedThis: any = null

    return function wrapper(this: any, ...args: Parameters<T>) {
        if (isThrottled) {
            savedArgs = args
            savedThis = this
            return;
        }

        func.apply(this, args)
        isThrottled = true

        setTimeout(() => {
            isThrottled = false
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }
        }, delay)
    };
}
