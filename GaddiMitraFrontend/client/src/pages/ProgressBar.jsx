//src/components/ui/ProgressBar.jsx
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
// import { cn } from "../../lib/utils";

const progressBarVariants = cva(
  "h-full rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-blue-600",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        danger: "bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function ProgressBar({ value, variant, className }) {
  const progress = Math.min(Math.max(value, 0), 100); // Ensure value is between 0 and 100

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5", className)}>
      <div
        className={cn(progressBarVariants({ variant }))}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * How to use this component:
 *
 * import ProgressBar from "./components/ui/ProgressBar";
 *
 * <ProgressBar value={75} />
 * <ProgressBar value={50} variant="success" />
 * <ProgressBar value={25} className="mt-4" />
 *
 */