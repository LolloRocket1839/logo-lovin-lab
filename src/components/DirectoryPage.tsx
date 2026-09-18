import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";

export type DirectoryItem = {
  id: string;
  name: string;
  address?: string;
  hours?: string;
  website?: string;
  note?: string;
};

type Props = {
  title: string;
  description: string;
  canonical: string;
  heading: string;
  intro: string;
  searchLabel: string;
  items: DirectoryItem[];
  backLabel: string;
  isItalian: boolean;
};

export const DirectoryPage = ({
  title,
  description,
  canonical,
  heading,
  intro,
  searchLabel,
  items,
  backLabel,
  isItalian,
}: Props) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.name} ${i.address ?? ""} ${i.note ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonical={canonical}
        locale={isItalian ? "it_IT" : "en_US"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
        <p className="mt-6 text-muted-foreground">{intro}</p>

        <Input
          className="mt-8"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchLabel}
          aria-label={searchLabel}
        />

        <ul className="mt-8 divide-y divide-border">
          {filtered.map((item) => (
            <li key={item.id} className="py-4">
              <p className="font-medium">{item.name}</p>
              {item.address && (
                <p className="mt-1 text-sm text-muted-foreground">{item.address}</p>
              )}
              {item.hours && (
                <p className="mt-1 text-sm text-muted-foreground">{item.hours}</p>
              )}
              {item.note && (
                <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
              )}
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm underline underline-offset-4"
                >
                  {isItalian ? "Sito" : "Website"}
                </a>
              )}
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            {isItalian ? "Nessun risultato." : "No results."}
          </p>
        )}

        <p className="mt-10">
          <Link to="/studenti" className="text-sm underline underline-offset-4">
            {backLabel}
          </Link>
        </p>
      </main>
    </>
  );
};
