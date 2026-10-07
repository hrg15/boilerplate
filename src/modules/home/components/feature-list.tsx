import { FEATURES } from "../constants";
import { HomeSection } from "./home-section";

export const FeatureList = () => (
  <HomeSection title="Features">
    <ul className="grid gap-4 sm:grid-cols-3">
      {FEATURES.map(({ title, description, icon: Icon }) => (
        <li
          key={title}
          className="flex flex-col gap-2 rounded-lg border border-border p-5"
        >
          <Icon className="size-5 text-muted-foreground" />
          <h3 className="text-base">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </HomeSection>
);
