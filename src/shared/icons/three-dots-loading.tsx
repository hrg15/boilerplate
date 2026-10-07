import type { SVGProps } from "react";

const DOTS = [
  { cx: 15, radius: "15;9;15", opacity: "1;.5;1" },
  { cx: 60, radius: "9;15;9", opacity: ".5;1;.5" },
  { cx: 105, radius: "15;9;15", opacity: "1;.5;1" },
];

export const DotsLoading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 120 30"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    {DOTS.map(({ cx, radius, opacity }) => (
      <circle key={cx} cx={cx} cy="15" r="15">
        <animate
          attributeName="r"
          dur="0.8s"
          values={radius}
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          dur="0.8s"
          values={opacity}
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);
