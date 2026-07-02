import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function InventorySection({
  title,
  getItems,
  addItem,
  updateItem,
  deleteItem,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getItems();
    const key = Object.keys(res.data).find(
      (k) => Array.isArray(res.data[k])
    );
    setItems(res.data[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateItem(editing, form);
        toast.success("Updated Successfully");
      } else {
        await addItem(form);
        toast.success("Added Successfully");
      }

      setForm({
        name: "",
        price: "",
        stock: "",
      });

      setEditing(null);

      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);

    setForm({
      name: item.name,
      price: item.price,
      stock: item.stock,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await deleteItem(id);

    toast.success("Deleted Successfully");

    fetchItems();
  };

  return (
    <div className="inventory-section">

      <h2>{title}</h2>

      <form onSubmit={handleSubmit} className="inventory-form">

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        <button type="submit">
          {editing ? "Update" : "Add"}
        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr key={item._id}>

              <td>{item.name}</td>

              <td>₹{item.price}</td>

              <td>{item.stock}</td>

              <td>

                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default InventorySection;