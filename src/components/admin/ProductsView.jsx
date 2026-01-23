import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.VITE_API_BASE_URL;

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    globalStock: "",
    images: [],
    countryConfigs: [{ countryCode: "", price: "" }],
  });

  /* -------------------- Load data -------------------- */
  const loadProducts = async () => {
    const res = await fetch(`${BASE}/api/products`, {
      credentials: "include", // 🔥 REQUIRED
    });
    const data = await res.json();
    setProducts(data || []);
  };

  const loadCountries = async () => {
    const res = await fetch(`${BASE}/api/countries/active`, {
      credentials: "include",
    });
    const data = await res.json();
    setCountries(data || []);
  };

  useEffect(() => {
    loadProducts();
    loadCountries();
  }, []);

  /* -------------------- Helpers -------------------- */
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      globalStock: "",
      images: [],
      countryConfigs: [{ countryCode: "", price: "" }],
    });
    setEditingId(null);
  };

  const updateCountry = (i, field, value) => {
    const copy = [...form.countryConfigs];
    copy[i][field] = value;
    setForm({ ...form, countryConfigs: copy });
  };

  const addCountry = () =>
    setForm((f) => ({
      ...f,
      countryConfigs: [...f.countryConfigs, { countryCode: "", price: "" }],
    }));

  const removeCountry = (i) =>
    setForm((f) => ({
      ...f,
      countryConfigs: f.countryConfigs.filter((_, idx) => idx !== i),
    }));

  /* -------------------- Actions -------------------- */
  const handleView = (p) => setViewProduct(p);

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      globalStock: p.globalStock || "",
      images: [],
      countryConfigs: p.countryPrices || [{ countryCode: "", price: "" }],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${BASE}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadProducts();
  };

  const handleSubmit = async () => {
    if (!form.name || !form.countryConfigs[0].countryCode) {
      alert("Product name and at least one country are required");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("globalStock", form.globalStock);

    form.countryConfigs.forEach((c) => {
      fd.append("countryCodes", c.countryCode);
      fd.append("prices", c.price);
    });

    if (form.images?.length) {
      for (let f of form.images) fd.append("images", f);
    }

    await fetch(
      editingId
        ? `${BASE}/api/products/${editingId}`
        : `${BASE}/api/products`,
      {
        method: editingId ? "PUT" : "POST",
        credentials: "include", // 🔥 REQUIRED
        body: fd,
      }
    );

    setLoading(false);
    setShowModal(false);
    resetForm();
    loadProducts();
  };

  /* -------------------- UI -------------------- */
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 mt-6"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Products</h2>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>

          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus className="mr-2" /> Add Product
          </Button>
        </div>

        <div className="bg-card rounded-xl border overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="text-left">Countries</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td>{p.countryPrices?.map((c) => c.countryCode).join(", ")}</td>
                  <td className="flex gap-2 py-2">
                    <Button size="icon" variant="ghost" onClick={() => handleView(p)}>
                      <Eye />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(p)}>
                      <Edit />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ---------------- View Modal ---------------- */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-card p-6 rounded-xl w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setViewProduct(null)}
            >
              <X />
            </button>

            <h3 className="text-xl font-bold mb-2">{viewProduct.name}</h3>
            <p className="text-sm text-muted-foreground">
              {viewProduct.description}
            </p>

            <p className="mt-3 font-medium">
              Global Stock: {viewProduct.globalStock}
            </p>

            <div className="mt-3 space-y-1">
              {viewProduct.countryPrices?.map((c, i) => (
                <p key={i}>
                  {c.countryCode} — ₹{c.price}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Add / Edit Modal ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-card p-6 rounded-xl w-full max-w-md space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>

            <h3 className="text-xl font-bold">
              {editingId ? "Edit Product" : "Add Product"}
            </h3>

            <Input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              className="w-full min-h-[120px] rounded-xl border p-3"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Global Stock"
              value={form.globalStock}
              onChange={(e) =>
                setForm({ ...form, globalStock: e.target.value })
              }
            />

            <div className="space-y-2">
              {form.countryConfigs.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                  <select
                    className="rounded-xl border p-2"
                    value={c.countryCode}
                    onChange={(e) =>
                      updateCountry(i, "countryCode", e.target.value)
                    }
                  >
                    <option value="">Select Country</option>
                    {countries.map((ct) => (
                      <option key={ct.id} value={ct.countryCode}>
                        {ct.countryName} ({ct.countryCode})
                      </option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    placeholder="Price"
                    value={c.price}
                    onChange={(e) =>
                      updateCountry(i, "price", e.target.value)
                    }
                  />

                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => removeCountry(i)}
                  >
                    ✕
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={addCountry}>
                + Add Country
              </Button>
            </div>

            <Input
              type="file"
              multiple
              onChange={(e) =>
                setForm({ ...form, images: e.target.files })
              }
            />

            <Button
              className="w-full"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsView;
