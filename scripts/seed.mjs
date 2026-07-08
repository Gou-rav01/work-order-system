import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const WORK_ORDERS_FILE = path.join(DATA_DIR, 'work-orders.json');

const priorityOptions = ['Low', 'Medium', 'High'];
const statusOptions = ['Open', 'In Progress', 'Done'];

const sampleTitles = [
  'Fix water leakage in basement',
  'Replace HVAC thermostat',
  'Install new electrical outlet',
  'Repair kitchen sink drain',
  'Inspect and service boiler',
  'Replace weatherstripping on door',
  'Upgrade insulation in attic',
  'Fix broken window pane',
  'Service air conditioning unit',
  'Repair roof shingles',
  'Install new light fixtures',
  'Unclog main sewer line',
  'Replace water heater',
  'Install new bathroom cabinet',
  'Repair damaged deck boards',
];

const sampleDescriptions = [
  'Customer reported water pooling near foundation wall. Needs investigation and repair.',
  'Thermostat is not responding properly. Suggest replacement with programmable model.',
  'Customer requested outlet installation for new appliance in kitchen.',
  'Drain is running slowly. May require snake or full replacement.',
  'Routine maintenance and efficiency check on heating system.',
  'Sealing is worn and allowing drafts. Replace with new weatherstripping material.',
  'Add additional insulation to improve energy efficiency in winter months.',
  'Single pane glass is cracked. Replace with dual-pane for better insulation.',
  'Unit needs cleaning and refrigerant check before cooling season.',
  'Multiple shingles missing or damaged from recent storm. Full inspection needed.',
  'Replace outdated fixtures with modern LED lighting throughout home.',
  'Major blockage preventing proper drainage. May need professional cleaning.',
  'Water heater is 12 years old and showing signs of rust. Recommend replacement.',
  'Customer wants updated storage solution in master bathroom.',
  'Weather damage has created safety hazard. Immediate repair required.',
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateWorkOrders(count = 15) {
  const orders = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    orders.push({
      id: uuidv4(),
      title: getRandomItem(sampleTitles),
      description: getRandomItem(sampleDescriptions),
      priority: getRandomItem(priorityOptions),
      status: getRandomItem(statusOptions),
      createdAt: date.toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return orders;
}

async function seed() {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Generate work orders
    const workOrders = generateWorkOrders(15);

    // Write to file
    await fs.writeFile(WORK_ORDERS_FILE, JSON.stringify(workOrders, null, 2));

    console.log('✅ Seeded 15 work orders successfully!');
    console.log(`📁 Data saved to ${WORK_ORDERS_FILE}`);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed();
