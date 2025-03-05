document.addEventListener('DOMContentLoaded', function () {
  const npcContainer = document.getElementById('npc-container');
  const searchInput = document.getElementById('search');
  let npcData = [];

  // Fetch data from the published Google Sheet (CSV format)
  fetch('YOUR_GOOGLE_SHEET_CSV_LINK')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      npcData = csvToArray(data);
      displayNPCs(npcData);
    });

  // Search functionality
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNPCs = npcData.filter(npc => npc.Name.toLowerCase().includes(searchTerm));
    displayNPCs(filteredNPCs);
  });

  // Display NPC cards
  function displayNPCs(npcs) {
    npcContainer.innerHTML = '';
    npcs.forEach(npc => {
      const card = document.createElement('div');
      card.className = 'npc-card';
      card.innerHTML = `
        <h2>${npc.Name}</h2>
        <p><strong>Archetype:</strong> ${npc.Archetype}</p>
        <p><strong>Location:</strong> ${npc.Location}</p>
        <p><strong>Affiliation:</strong> ${npc.Affiliation}</p>
        <p><strong>Skills:</strong> ${npc.Skills}</p>
        <p><strong>Trump Card:</strong> ${npc['Trump Card']}</p>
        <p><strong>Notes:</strong> ${npc.Notes}</p>
        <p><strong>Contact:</strong> ${npc.Contact}</p>
        <p><strong>Physical Status:</strong> ${npc['Physical Status']}</p>
        <p><strong>Information:</strong> ${npc.Information}</p>
      `;
      npcContainer.appendChild(card);
    });
  }

  // Helper function to convert CSV to an array of objects
  function csvToArray(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
        return obj;
      }, {});
    });
  }
});