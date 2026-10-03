import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
