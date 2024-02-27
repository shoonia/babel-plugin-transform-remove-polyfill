declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTransform(source: string): Promise<R>;
    }
  }
}

export {};
