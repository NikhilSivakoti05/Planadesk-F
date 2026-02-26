import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.VITE_API_BASE_URL;

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);

  /* ---------------- Load users ---------------- */
  const loadUsers = async () => {
    const res = await fetch(`${BASE}/api/admin/users`, {
      credentials: "include",
    });
    const data = await res.json();
    setUsers(data || []);
  };

  const searchUsers = async (q) => {
    if (!q.trim()) return loadUsers();

    const res = await fetch(
      `${BASE}/api/admin/users/search?q=${q}`,
      { credentials: "include" }
    );
    const data = await res.json();
    setUsers(data || []);
  };

  /* ---------------- View Orders ---------------- */
  const viewOrders = async (user) => {
    const userId = user.id || user._id; // 🔥 FIX (IMPORTANT)

    if (!userId) {
      alert("User ID not found");
      return;
    }

    setSelectedUser(user);
    setLoadingOrders(true);

    const res = await fetch(
      `${BASE}/api/admin/users/${userId}/orders`,
      { credentials: "include" }
    );

    const data = await res.json();
    setOrders(data || []);
    setLoadingOrders(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 mt-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Users</h2>
            <p className="text-muted-foreground">
              Manage platform users and view orders
            </p>
          </div>

          <Input
            placeholder="Search name or email..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              searchUsers(e.target.value);
            }}
            className="max-w-sm"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-xl border overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id || u._id} className="border-t">
                  <td className="px-4 py-3 font-medium">
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.enabled ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => viewOrders(u)}
                    >
                      <Eye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center py-6 text-muted-foreground">
              No users found
            </p>
          )}
        </div>
      </motion.div>

      {/* ---------------- Orders Modal ---------------- */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card p-6 rounded-xl w-full max-w-xl relative max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <button
                className="absolute top-3 right-3"
                onClick={() => {
                  setSelectedUser(null);
                  setOrders([]);
                }}
              >
                <X />
              </button>

              <h3 className="text-xl font-bold mb-4">
                Orders — {selectedUser.firstName}
              </h3>

              {loadingOrders ? (
                <p className="text-center py-6">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No orders found
                </p>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="border rounded-xl p-4"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          ₹{o.totalAmount}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(o.orderDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        Status: <b>{o.status}</b>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Items: {o.items?.length || 0}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UsersView;