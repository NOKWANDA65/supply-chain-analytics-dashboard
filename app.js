// Fictional portfolio data. Replace with a validated data source when extending the project.
const inventory = [
  {sku:"ELV-001",name:"Glass storage jar",warehouse:"North DC",qty:42,reorder:50,cost:68.5},
  {sku:"ELV-002",name:"Cotton hand towel",warehouse:"North DC",qty:180,reorder:60,cost:42},
  {sku:"ELV-003",name:"Ceramic planter",warehouse:"South DC",qty:24,reorder:30,cost:115},
  {sku:"ELV-004",name:"Amber pump bottle",warehouse:"South DC",qty:310,reorder:100,cost:19.9},
  {sku:"ELV-005",name:"Decorative tray",warehouse:"East DC",qty:16,reorder:25,cost:145},
  {sku:"ELV-006",name:"Linen cushion cover",warehouse:"East DC",qty:95,reorder:40,cost:89},
  {sku:"ELV-007",name:"Reed diffuser set",warehouse:"North DC",qty:57,reorder:50,cost:132},
  {sku:"ELV-008",name:"Stoneware mug",warehouse:"South DC",qty:12,reorder:35,cost:74},
  {sku:"ELV-009",name:"Woven basket",warehouse:"East DC",qty:63,reorder:30,cost:160},
  {sku:"ELV-010",name:"Body lotion 250ml",warehouse:"North DC",qty:220,reorder:80,cost:54.5}
];

const $ = (id) => document.getElementById(id);
const money = (amount) => new Intl.NumberFormat("en-ZA", {
  style:"currency", currency:"ZAR", maximumFractionDigits:2
}).format(amount);

function getFilteredInventory(){
  const term = $("search").value.trim().toLowerCase();
  const warehouse = $("warehouse").value;
  return inventory.filter(item => {
    const matchesTerm = `${item.sku} ${item.name}`.toLowerCase().includes(term);
    const matchesWarehouse = warehouse === "all" || item.warehouse === warehouse;
    return matchesTerm && matchesWarehouse;
  });
}

function render(){
  const rows = getFilteredInventory();
  const units = rows.reduce((sum,item)=>sum + item.qty,0);
  const value = rows.reduce((sum,item)=>sum + item.qty * item.cost,0);
  const low = rows.filter(item=>item.qty < item.reorder).length;

  $("itemCount").textContent = rows.length;
  $("unitCount").textContent = units.toLocaleString("en-ZA");
  $("stockValue").textContent = money(value);
  $("lowCount").textContent = low;
  $("resultCount").textContent = `${rows.length} RECORD${rows.length===1?"":"S"}`;

  $("inventoryRows").innerHTML = rows.map(item => {
    const isLow = item.qty < item.reorder;
    return `<tr>
      <td><span class="product-name">${escapeHtml(item.name)}</span><span class="sku">${escapeHtml(item.sku)}</span></td>
      <td>${escapeHtml(item.warehouse)}</td>
      <td>${item.qty.toLocaleString("en-ZA")}</td>
      <td>${item.reorder.toLocaleString("en-ZA")}</td>
      <td>${money(item.cost)}</td>
      <td><span class="status ${isLow?"low":""}">${isLow?"REORDER":"HEALTHY"}</span></td>
    </tr>`;
  }).join("");
  $("emptyState").hidden = rows.length !== 0;
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);
}

function initialise(){
  [...new Set(inventory.map(item=>item.warehouse))].sort().forEach(name=>{
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    $("warehouse").appendChild(option);
  });
  $("search").addEventListener("input",render);
  $("warehouse").addEventListener("change",render);
  $("reset").addEventListener("click",()=>{
    $("search").value = "";
    $("warehouse").value = "all";
    render();
  });
  render();
}
document.addEventListener("DOMContentLoaded",initialise);
