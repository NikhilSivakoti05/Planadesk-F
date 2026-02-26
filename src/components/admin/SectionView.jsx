import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.VITE_API_BASE_URL;

const SectionView = () => {
  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    number: "",
    title: "",
    description: "",
    image: null,
  });

  /* -------------------- Load -------------------- */
  const loadSections = async () => {
    const res = await fetch(`${BASE}/api/sections`, {
      credentials: "include",
    });
    const data = await res.json();
    setSections(data || []);
  };

  useEffect(() => {
    loadSections();
  }, []);

  /* -------------------- Helpers -------------------- */
  const resetForm = () => {
    setForm({
      number: "",
      title: "",
      description: "",
      image: null,
    });
    setEditingId(null);
  };

  /* -------------------- Actions -------------------- */
  const handleEdit = (s) => {
    setEditingId(s.id);
    setForm({
      number: s.number,
      title: s.title,
      description: s.description,
      image: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this section?")) return;

    await fetch(`${BASE}/api/sections/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    loadSections();
  };

  const handleSubmit = async () => {
    if (!form.number) {
      alert("⚠ Section number is required");
      return;
    }
    if (!form.title.trim()) {
      alert("⚠ Section title is required");
      return;
    }
    if (!form.description.trim()) {
      alert("⚠ Section description is required");
      return;
    }
    if (!editingId && !form.image) {
      alert("⚠ Section image is required");
      return;
    }

    setLoading(true);

    const fd = new FormData();
    fd.append("number", form.number);
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await fetch(
      editingId
        ? `${BASE}/api/sections/${editingId}`
        : `${BASE}/api/sections`,
      {
        method: editingId ? "PUT" : "POST",
        credentials: "include",
        body: fd,
      }
    );

    setLoading(false);
    setShowModal(false);
    resetForm();
    loadSections();
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
            <h2 className="text-3xl font-bold">Sections</h2>
            <p className="text-muted-foreground">
              Manage reusable product sections
            </p>
          </div>

          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Plus className="mr-2" /> Add Section
          </Button>
        </div>

        <div className="bg-card rounded-xl border overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left">Number</th>
                <th className="text-left">Title</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{s.number}</td>
                  <td>{s.title}</td>
                  <td className="flex gap-2 py-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(s)}>
                      <Edit />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => handleDelete(s.id)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
              {!sections.length && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-muted-foreground">
                    No sections created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

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
              {editingId ? "Edit Section" : "Add Section"}
            </h3>

            <Input
              type="number"
              placeholder="Section Number"
              value={form.number}
              onChange={(e) =>
                setForm({ ...form, number: e.target.value })
              }
            />

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
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
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            <Button
              className="w-full"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Save Section"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionView;