import { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_BASE_URL;

const Section = ({ sectionNumbers }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!sectionNumbers?.length) return;

    fetch(`${BASE}/api/sections`)
      .then(res => res.json())
      .then(data => {
        const filtered = (data || [])
          .filter(s => sectionNumbers.includes(s.number))
          .sort((a, b) => a.number - b.number);

        setSections(filtered);
      });
  }, [sectionNumbers]);

  if (!sections.length) return null;

  return (
    <div className="mt-28 space-y-32">
      {sections.map((s, i) => (
        <div
          key={s.id}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className={`${i % 2 !== 0 ? "lg:order-2" : ""}`}>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="w-full h-[480px] object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6 max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {s.title}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {s.description}
              </p>

              <div className="h-1 w-16 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;