const eventList = document.getElementById("event-list");

async function loadApprovedEvents() {
  const res = await fetch("http://localhost:5002/events");
  const events = await res.json();

  eventList.innerHTML = "";

  events
    .filter((event) => event.status === "approved")
    .forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Provider:</strong> ${event.provider}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Type:</strong> ${event.type}</p>
        <p>${event.desc}</p>
      `;
      eventList.appendChild(card);
    });
}

loadApprovedEvents();


