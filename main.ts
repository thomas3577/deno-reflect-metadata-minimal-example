// deno-lint-ignore-file no-explicit-any no-unused-vars
import 'reflect-metadata';

type ClassConstructor<T = unknown> = new (...args: any[]) => T;

function Decorator<T>() {
  return (_: ClassConstructor<T>): void => {};
}

class ClassA {}

@Decorator()
class ClassB {
  constructor(a: string, b: number, c: ClassA) {}
}

Deno.serve(() => {
  const metadata = Reflect.getMetadata('design:paramtypes', ClassB);
  return new Response(metadata?.map((x: ClassConstructor) => x.name).join(', ')) // "String, Number, ClassA"
});
