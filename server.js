const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Basic API endpoint for VIN decoding (optional, for demonstration)
app.get('/api/decode-vin/:vin', (req, res) => {
  const vin = req.params.vin.toUpperCase();
  if (vin.length !== 17) {
    return res.status(400).json({ error: 'VIN must be exactly 17 characters long.' });
  }

  // Simple decoding logic (can be expanded)
  const country = (vin.substring(0, 2) === 'MA' || vin.substring(0, 2) === 'ME') ? 'India' : 'Unknown';
  const manufacturer = getManufacturer(vin.substring(0, 3));

  res.json({
    country,
    manufacturer,
    vin
  });
});

// Helper function for manufacturer (simplified)
function getManufacturer(wmi) {
  const manufacturers = {
    'MAT': 'Tata',
    'MA1': 'Mahindra',
    'MA3': 'Maruti Suzuki',
    'ME3': 'Royal Enfield'
  };
  return manufacturers[wmi] || 'Unknown';
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});