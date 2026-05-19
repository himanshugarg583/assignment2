type Props = {
  items: string[];
  tone?: "dark" | "light";
};

export default function Marquee({ items, tone = "dark" }: Props) {
  const loopItems = [...items, ...items];
  const isLight = tone === "light";

  return (
    <div
      className={`marquee border-y py-6 ${
        isLight ? "border-navy/10" : "border-white/10"
      }`}
    >
      <div className="marquee-track flex items-center gap-12 w-max">
        {loopItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`text-sm uppercase tracking-[0.3em] transition ${
              isLight ? "text-navy/70 hover:text-green" : "text-white/60 hover:text-green"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
