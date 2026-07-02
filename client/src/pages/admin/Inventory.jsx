import AdminSidebar from "../../components/AdminSidebar";
import InventorySection from "../../components/admin/InventorySection";
import "../../styles/admin/inventory.css";
import {
  getBases,
  addBase,
  updateBase,
  deleteBase,
} from "../../services/baseService";
import {
  getCheeses,
  addCheese,
  updateCheese,
  deleteCheese,
} from "../../services/cheeseService";

import {
  getSauces,
  addSauce,
  updateSauce,
  deleteSauce,
} from "../../services/sauceService";

import {
  getVeggies,
  addVeggie,
  updateVeggie,
  deleteVeggie,
} from "../../services/veggieService";


function Inventory() {
  return (
    <>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "30px",
        }}
      >
        <h1>Inventory Management</h1>

        <InventorySection
          title="🍕 Pizza Bases"
          getItems={getBases}
          addItem={addBase}
          updateItem={updateBase}
          deleteItem={deleteBase}
        /><InventorySection
  title="🧀 Cheese"
  getItems={getCheeses}
  addItem={addCheese}
  updateItem={updateCheese}
  deleteItem={deleteCheese}
/>

<InventorySection
  title="🍅 Sauces"
  getItems={getSauces}
  addItem={addSauce}
  updateItem={updateSauce}
  deleteItem={deleteSauce}
/>

<InventorySection
  title="🥬 Veggies"
  getItems={getVeggies}
  addItem={addVeggie}
  updateItem={updateVeggie}
  deleteItem={deleteVeggie}
/>


      </div>
    </>
  );
}

export default Inventory;