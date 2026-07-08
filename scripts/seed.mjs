import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

await mongoose.connect(MONGODB_URI);

const WorkOrderSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const WorkOrder =
  mongoose.models.WorkOrder ||
  mongoose.model("WorkOrder", WorkOrderSchema);

const priorityOptions = ["Low", "Medium", "High"];
const statusOptions = ["Open", "In Progress", "Done"];

const sampleTitles = [
  "Fix water leakage in basement",
  "Replace HVAC thermostat",
  "Install new electrical outlet",
  "Repair kitchen sink drain",
  "Inspect and service boiler",
  "Replace weatherstripping on door",
  "Upgrade insulation in attic",
  "Fix broken window pane",
  "Service air conditioning unit",
  "Repair roof shingles",
  "Install new light fixtures",
  "Unclog main sewer line",
  "Replace water heater",
  "Install new bathroom cabinet",
  "Repair damaged deck boards",
];

const sampleDescriptions = [
  "Customer reported water pooling near foundation wall. Needs investigation and repair.",
  "Thermostat is not responding properly. Suggest replacement with programmable model.",
  "Customer requested outlet installation for new appliance in kitchen.",
  "Drain is running slowly. May require snake or full replacement.",
  "Routine maintenance and efficiency check on heating system.",
  "Sealing is worn and allowing drafts. Replace with new weatherstripping material.",
  "Add additional insulation to improve energy efficiency in winter months.",
  "Single pane glass is cracked. Replace with dual-pane for better insulation.",
  "Unit needs cleaning and refrigerant check before cooling season.",
  "Multiple shingles missing or damaged from recent storm. Full inspection needed.",
  "Replace outdated fixtures with modern LED lighting throughout home.",
  "Major blockage preventing proper drainage. May need professional cleaning.",
  "Water heater is 12 years old and showing signs of rust. Recommend replacement.",
  "Customer wants updated storage solution in master bathroom.",
  "Weather damage has created safety hazard. Immediate repair required.",
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [];

for (let i = 0; i < 15; i++) {
  data.push({
    title: random(sampleTitles),
    description: random(sampleDescriptions),
    priority: random(priorityOptions),
    status: random(statusOptions),
  });
}

await WorkOrder.deleteMany({});
await WorkOrder.insertMany(data);

console.log("✅ 15 Work Orders inserted into MongoDB");

await mongoose.disconnect();