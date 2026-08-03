import { STACK } from "../constants";

export const StackList = () => (
  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
    {STACK.map(({ name, role }) => (
      <div key={name} className="border-t border-border pt-3">
        <dt className="text-sm font-medium text-title">{name}</dt>
        <dd className="text-sm text-muted-foreground">{role}</dd>
      </div>
    ))}
  </dl>
);
