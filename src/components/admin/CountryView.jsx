import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* -------------------- Fuzzy search -------------------- */
const fuzzyMatch = (text, pattern) => {
  text = text.toLowerCase();
  pattern = pattern.toLowerCase();
  let ti = 0, pi = 0;
  while (ti < text.length && pi < pattern.length) {
    if (text[ti] === pattern[pi]) pi++;
    ti++;
  }
  return pi === pattern.length;
};

/* -------------------- Country list -------------------- */
const COUNTRY_LIST = [
  { code: "IN", name: "India" }, { code: "US", name: "United States" },
  { code: "AE", name: "United Arab Emirates" }, { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" }, { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" }, { code: "JP", name: "Japan" },
  { code: "CN", name: "China" }, { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" }, { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Thailand" }, { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" }, { code: "VN", name: "Vietnam" },
  { code: "PK", name: "Pakistan" }, { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" }, { code: "NP", name: "Nepal" },
  { code: "SA", name: "Saudi Arabia" }, { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" }, { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" }, { code: "IL", name: "Israel" },
  { code: "TR", name: "Turkey" }, { code: "RU", name: "Russia" },
  { code: "UA", name: "Ukraine" }, { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" }, { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" }, { code: "BG", name: "Bulgaria" },
  { code: "SE", name: "Sweden" }, { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" }, { code: "FI", name: "Finland" },
  { code: "DE", name: "Germany" }, { code: "FR", name: "France" },
  { code: "IT", name: "Italy" }, { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" }, { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" }, { code: "AT", name: "Austria" },
  { code: "IE", name: "Ireland" }, { code: "GR", name: "Greece" },
  { code: "CH", name: "Switzerland" },
  { code: "BR", name: "Brazil" }, { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" }, { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" }, { code: "MX", name: "Mexico" },
  { code: "ZA", name: "South Africa" }, { code: "NG", name: "Nigeria" },
  { code: "EG", name: "Egypt" }, { code: "MA", name: "Morocco" },
  { code: "KE", name: "Kenya" }, { code: "TZ", name: "Tanzania" },
  { code: "GH", name: "Ghana" }, { code: "ET", name: "Ethiopia" }
];

const BASE = import.meta.env.VITE_API_BASE_URL;

const CountryView = () => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    countryCode: "",
    countryName: "",
    active: true,
  });
  const [search, setSearch] = useState("");

  /* -------------------- Load countries -------------------- */
  const loadCountries = async () => {
    const res = await fetch(`${BASE}/api/countries`, {
      credentials: "include", // ✅ REQUIRED FOR COOKIE JWT
    });

    if (!res.ok) {
      console.error("Failed to load countries");
      return;
    }

    const data = await res.json();
    setCountries(data || []);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  /* -------------------- Save country -------------------- */
  const saveCountry = async () => {
    if (!form.countryCode || !form.countryName) {
      alert("Select a country");
      return;
    }

    const res = await fetch(`${BASE}/api/countries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ REQUIRED
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to save country");
      return;
    }

    setForm({ countryCode: "", countryName: "", active: true });
    setSearch("");
    loadCountries();
  };

  /* -------------------- Delete country -------------------- */
  const deleteCountry = async (id) => {
    if (!confirm("Delete country?")) return;

    const res = await fetch(`${BASE}/api/countries/${id}`, {
      method: "DELETE",
      credentials: "include", // ✅ REQUIRED
    });

    if (!res.ok) {
      alert("Failed to delete country");
      return;
    }

    loadCountries();
  };

  /* -------------------- Filter list -------------------- */
  const filtered = COUNTRY_LIST.filter(
    (c) => fuzzyMatch(c.name, search) || fuzzyMatch(c.code, search)
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-6 mt-6 sm:mt-8 lg:mt-10">

      <div>
        <h2 className="text-3xl font-bold">Countries</h2>
        <p className="text-muted-foreground">Manage available countries</p>
      </div>

      <div className="bg-card p-4 rounded-xl space-y-3">
        <Input
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="border rounded-xl max-h-40 overflow-y-auto">
            {filtered.map((c) => (
              <div
                key={c.code}
                onClick={() => {
                  setForm({
                    ...form,
                    countryCode: c.code,
                    countryName: c.name,
                  });
                  setSearch(`${c.name} (${c.code})`);
                }}
                className="p-2 cursor-pointer hover:bg-muted"
              >
                {c.name} ({c.code})
              </div>
            ))}
          </div>
        )}

        <Input placeholder="Country Code" value={form.countryCode} readOnly />
        <Input placeholder="Country Name" value={form.countryName} readOnly />

        <Button onClick={saveCountry}>
          <Plus className="mr-2" /> Add Country
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Code</th>
              <th>Name</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.countryCode}</td>
                <td>{c.countryName}</td>
                <td>{c.active ? "Yes" : "No"}</td>
                <td>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => deleteCountry(c.id)}
                  >
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CountryView;
