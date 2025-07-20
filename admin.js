// 🚀 Step 1: Fetch pending events from backend
fetch("http://localhost:5002/events")
  .then((res) => res.json())
  .then((events) => {
    const container = document.getElementById("admin-container");
    container.innerHTML = "";

    if (events.length === 0) {
      container.innerHTML = "<p>No pending events 🎉</p>";
      return;
    }

    console.log("Events received:", events);

    events.events.forEach((event) => {

      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${event.title}</h3>

        <p>${event.description || 'No description provided'}</p>
        <button onclick="approveEvent('${event.title}')">✅ Approve</button>
        <button onclick="rejectEvent('${event.title}')">❌ Reject</button>
        <hr>
      `;
      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Error fetching events", err);
  });

// 🚀 Step 2: Handle Approve/Reject button clicks
function approveEvent(title) {
  fetch(`http://localhost:5002/approve/${encodeURIComponent(title)}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Approved:', data);
    location.reload();
  })
  .catch(error => console.error('Error approving:', error));
}

function rejectEvent(title) {
  fetch(`http://localhost:5002/reject/${encodeURIComponent(title)}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Rejected:', data);
    location.reload();
  })
  .catch(error => console.error('Error rejecting:', error));
}
function clearAllEvents() {
  if (!confirm("Are you sure you want to delete ALL events?")) return;

  fetch("http://localhost:5002/events", {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    location.reload();
  })
  .catch(err => {
    console.error("Error clearing events:", err);
    alert("Failed to clear events.");
  });
}
