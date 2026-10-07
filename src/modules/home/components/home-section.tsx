type HomeSectionProps = {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
};

export const HomeSection = ({
  title,
  description,
  children,
}: HomeSectionProps) => (
  <section className="flex flex-col gap-5">
    <div className="flex flex-col gap-1.5">
      <h2 className="text-lg">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    {children}
  </section>
);
