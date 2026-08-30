const express = require('express');
const path = require('path');

const app = express();

// Serve static frontend files from the repository root
app.use(express.static(path.join(__dirname, '..')));

// Lightweight health/status endpoint used by CI/tests
app.get('/api/status', (req, res) => {
  res.json({ ok: true, service: 'brainbee-bd-comp', branch: 'upgrade/fullstack/brainbee-bd-comp' });
});

// Start server when run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

module.exports = app;
