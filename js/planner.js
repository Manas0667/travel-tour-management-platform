
document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. DOM ELEMENTS =====
  const tripForm = document.getElementById("trip-form");
  const destinationInput = document.getElementById("destination") || document.querySelector('input[placeholder*="Goa"], input[type="text"]');
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const startDateInput = document.getElementById("start") || document.getElementById("startDate") || dateInputs[0];
  const endDateInput = document.getElementById("end") || document.getElementById("endDate") || dateInputs[1];
  const numberInputs = document.querySelectorAll('input[type="number"]');
  const travelersInput = document.getElementById("travelers") || numberInputs[0];
  const budgetInput = document.getElementById("budget") || numberInputs[1];

  const allButtons = Array.from(document.querySelectorAll("button"));
  const generateBtn = document.getElementById("generateBtn") || allButtons.find(b => b.textContent.toLowerCase().includes("generate"));
  const bookTripBtn = document.getElementById("bookTripBtn") ||
    Array.from(document.querySelectorAll("a, button")).find(b => b.textContent.toLowerCase().includes("book trip"));
  const clearPlanBtn = document.getElementById("clearPlanBtn") || allButtons.find(b => b.textContent.toLowerCase().includes("clear"));

  const emptyState = document.getElementById("empty");
  const planContainer = document.getElementById("plan");
  const scheduleContainer =
    document.getElementById("scheduleOutput") ||
    document.getElementById("scheduleContainer") ||
    planContainer;

  // ===== 2. STRICT DATE RESTRICTIONS (NO PAST DATES & END >= START) =====
  const todayStr = new Date().toISOString().split("T")[0];

  if (startDateInput) {
    startDateInput.min = todayStr;
    startDateInput.addEventListener("change", () => {
      if (startDateInput.value < todayStr) {
        alert("Start Date cannot be in the past!");
        startDateInput.value = todayStr;
      }
      if (endDateInput) {
        endDateInput.min = startDateInput.value;
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
          endDateInput.value = startDateInput.value;
        }
      }
    });
  }

  if (endDateInput) {
    endDateInput.min = startDateInput?.value || todayStr;
    endDateInput.addEventListener("change", () => {
      const minAllowed = startDateInput?.value || todayStr;
      if (endDateInput.value < minAllowed) {
        alert("End Date cannot be earlier than Start Date!");
        endDateInput.value = minAllowed;
      }
    });
  }

  // ===== 3. ITINERARY TEMPLATES =====
  const destinationTemplates = {
    goa: [
      { day: 1, title: "Arrival & Beach Walk", morning: "10:00 AM - 01:00 PM: Hotel Check-in & Relax at Baga Beach", evening: "04:00 PM - 07:00 PM: Sunset view & Local Food Street", costPerPerson: 3500 },
      { day: 2, title: "Sightseeing & Fort Tour", morning: "09:30 AM - 01:30 PM: Visit Aguada Fort & Calangute Beach", evening: "03:30 PM - 07:00 PM: Mandovi River Cruise & Local Market", costPerPerson: 4500 },
      { day: 3, title: "Water Sports & Adventure", morning: "10:00 AM - 02:00 PM: Scuba Diving & Jet Skiing at Anjuna", evening: "05:00 PM - 08:00 PM: Relaxing Cafe & Music Evening", costPerPerson: 6000 },
      { day: 4, title: "Heritage Walk & Shopping", morning: "10:00 AM - 01:30 PM: Old Goa Churches & Museum Visit", evening: "04:00 PM - 07:30 PM: Panjim Market Souvenir Shopping", costPerPerson: 3000 },
      { day: 5, title: "Leisure & Departure", morning: "10:00 AM - 01:00 PM: Free Time for Cafe Visit & Packing", evening: "03:00 PM - 05:00 PM: Check-out & Transfer to Airport/Station", costPerPerson: 2500 }
    ],
    manali: [
      { day: 1, title: "Arrival & Mall Road", morning: "10:00 AM - 01:00 PM: Hotel Check-in & Rest", evening: "04:00 PM - 07:30 PM: Walk at Mall Road & Hidimba Temple", costPerPerson: 3200 },
      { day: 2, title: "Solang Valley Snow Adventure", morning: "09:00 AM - 02:00 PM: Paragliding, Skiing & Ropeway at Solang", evening: "05:00 PM - 08:00 PM: Bonfire & Local Himachali Dinner", costPerPerson: 5500 },
      { day: 3, title: "Atal Tunnel & Sissu Excursion", morning: "09:30 AM - 02:30 PM: Drive through Atal Tunnel to Sissu Waterfall", evening: "05:30 PM - 08:00 PM: Old Manali Cafe Hopping", costPerPerson: 4800 },
      { day: 4, title: "Kullu River Rafting & Shawl Factory", morning: "10:00 AM - 01:30 PM: Beas River White Water Rafting", evening: "04:00 PM - 07:00 PM: Kullu Local Market Shopping", costPerPerson: 4000 },
      { day: 5, title: "Vashisht Hot Springs & Departure", morning: "09:30 AM - 12:30 PM: Vashisht Temple & Hot Water Springs", evening: "03:00 PM - 06:00 PM: Check-out & Return Journey", costPerPerson: 2500 }
    ],
    default: [
      { day: 1, title: "Arrival & City Orientation", morning: "10:00 AM - 01:00 PM: Hotel Check-in & Refreshment", evening: "04:00 PM - 07:30 PM: Local Market & Famous Landmark Walk", costPerPerson: 3500 },
      { day: 2, title: "Top Attractions & Guided Tour", morning: "09:30 AM - 01:30 PM: Full-Day City Sightseeing Tour", evening: "04:30 PM - 07:30 PM: Cultural Show & Authentic Local Cuisine", costPerPerson: 5000 },
      { day: 3, title: "Adventure & Nature Exploration", morning: "09:00 AM - 02:00 PM: Scenic Viewpoints & Outdoor Activities", evening: "05:00 PM - 08:00 PM: Sunset Point & Leisure Evening", costPerPerson: 5500 },
      { day: 4, title: "Heritage, Museums & Shopping", morning: "10:00 AM - 01:30 PM: Historical Monuments & Art Galleries", evening: "04:00 PM - 07:30 PM: Handicraft & Souvenir Shopping", costPerPerson: 3500 },
      { day: 5, title: "Relaxation & Departure", morning: "10:00 AM - 01:00 PM: Breakfast, Cafe Visit & Packing", evening: "03:00 PM - 05:00 PM: Check-out & Departure Transfer", costPerPerson: 2500 }
    ]
  };

  let currentPlan = JSON.parse(localStorage.getItem("tourvista_saved_plan")) || null;

  // ===== 4. UPDATE BUDGET TRACKER UI =====
  function updateBudgetUI(plannedCost, totalBudget) {
    const remaining = totalBudget - plannedCost;

    const plannedEl = document.getElementById("plannedCost") || document.getElementById("spent");
    const totalEl = document.getElementById("totalBudgetDisplay") || document.getElementById("budget-total");
    const remainingEl = document.getElementById("remainingBudget") || document.getElementById("left");
    const progressBar = document.getElementById("budgetProgress") || document.getElementById("meter-fill");

    if (plannedEl && totalEl && remainingEl) {
      plannedEl.textContent = `₹${plannedCost.toLocaleString("en-IN")}`;
      totalEl.textContent = `₹${totalBudget.toLocaleString("en-IN")}`;
      remainingEl.textContent = `₹${remaining.toLocaleString("en-IN")}`;
      remainingEl.style.color = remaining < 0 ? "#ef4444" : "#10b981";
    } else {
      const budgetCard = Array.from(document.querySelectorAll("div, section")).find(
        el => el.textContent.includes("Budget Tracker") && !el.querySelector("input")
      );
      if (budgetCard) {
        const rupeeNodes = Array.from(budgetCard.querySelectorAll("strong, p, span, div")).filter(
          el => el.children.length === 0 && el.textContent.trim().startsWith("₹")
        );
        if (rupeeNodes.length >= 3) {
          rupeeNodes[0].textContent = `₹${plannedCost.toLocaleString("en-IN")}`;
          rupeeNodes[1].textContent = `₹${totalBudget.toLocaleString("en-IN")}`;
          rupeeNodes[2].textContent = `₹${remaining.toLocaleString("en-IN")}`;
          rupeeNodes[2].style.color = remaining < 0 ? "#ef4444" : "#0f172a";
        }
      }
    }

    if (progressBar) {
      const pct = totalBudget > 0 ? Math.min(100, Math.round((plannedCost / totalBudget) * 100)) : 0;
      progressBar.style.width = `${pct}%`;
      progressBar.style.backgroundColor = remaining < 0 ? "#ef4444" : "#0284c7";
    }
  }

  // ===== 5. RENDER SCHEDULE =====
  function renderSchedule(plan) {
    if (!scheduleContainer) return;

    const formattedDest = plan.destination.charAt(0).toUpperCase() + plan.destination.slice(1);
    const daysShown = plan.itinerary.length;

    if (emptyState) emptyState.style.display = "none";
    if (planContainer) planContainer.style.display = "block";
    scheduleContainer.style.border = "1px solid #e2e8f0";
    scheduleContainer.style.textAlign = "left";
    scheduleContainer.innerHTML = `
      <div style="margin-bottom: 18px;">
        <h2 style="margin: 0 0 4px 0; font-size: 1.35rem; color: #0f172a;">Trip to ${formattedDest}</h2>
        <p style="margin: 0; font-size: 0.88rem; color: #64748b;">
          ${plan.totalDays} Day${plan.totalDays > 1 ? "s" : ""} Trip (${daysShown} Day${daysShown > 1 ? "s" : ""} Highlighted) &bull; ${plan.travelers} Traveler${plan.travelers > 1 ? "s" : ""}
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${plan.itinerary
          .map(
            item => `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #0284c7; font-size: 0.98rem;">Day ${item.day}: ${item.title}</strong>
              <span style="background: #e0f2fe; color: #0369a1; font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 6px;">SCHEDULED</span>
            </div>
            <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 0.85rem; line-height: 1.65;">
              <li><strong>Morning:</strong> ${item.morning}</li>
              <li><strong>Evening:</strong> ${item.evening}</li>
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    updateBudgetUI(plan.plannedCost, plan.totalBudget);
  }

  // ===== 6. GENERATE SCHEDULE HANDLER =====
  const generateSchedule = (e) => {
    e.preventDefault();

    const rawDest = destinationInput?.value.trim() || "";
    const startVal = startDateInput?.value || "";
    const endVal = endDateInput?.value || "";
    const travelers = Math.max(1, Number(travelersInput?.value) || 2);
    const totalBudget = Math.max(1000, Number(budgetInput?.value) || 30000);

    if (!rawDest) {
      alert("Please enter a destination (e.g., Goa, Manali)!");
      destinationInput?.focus();
      return;
    }

    if (!startVal || !endVal) {
      alert("Please select both Start Date and End Date!");
      return;
    }

    if (startVal < todayStr) {
      alert("Start Date cannot be in the past!");
      return;
    }

    if (endVal < startVal) {
      alert("End Date cannot be earlier than Start Date!");
      return;
    }

    // Signed difference (no Math.abs!)
    const startObj = new Date(startVal);
    const endObj = new Date(endVal);
    const diffDays = Math.round((endObj - startObj) / (1000 * 60 * 60 * 24)) + 1;

    const key = rawDest.toLowerCase();
    const template = destinationTemplates[key] || destinationTemplates.default;
    const daysToShow = Math.min(diffDays, template.length);
    const selectedItinerary = template.slice(0, daysToShow);

    const baseCostPerPerson = selectedItinerary.reduce((sum, d) => sum + d.costPerPerson, 0);
    const plannedCost = Math.round(baseCostPerPerson * travelers * (diffDays > 5 ? 1.25 : 1));

    currentPlan = {
      destination: rawDest,
      startDate: startVal,
      endDate: endVal,
      totalDays: diffDays,
      travelers,
      totalBudget,
      plannedCost,
      itinerary: selectedItinerary
    };

    localStorage.setItem("tourvista_saved_plan", JSON.stringify(currentPlan));
    renderSchedule(currentPlan);
  };

  if (tripForm) tripForm.addEventListener("submit", generateSchedule);
  else if (generateBtn) generateBtn.addEventListener("click", generateSchedule);

  // ===== 7. BOOK TRIP HANDLER =====
  if (bookTripBtn) {
    bookTripBtn.addEventListener("click", (e) => {
      if (!currentPlan) {
        e.preventDefault();
        alert("Please generate a trip schedule first before clicking Book Trip!");
        return;
      }
      localStorage.setItem("tourvista_pending_trip", JSON.stringify(currentPlan));
      if (bookTripBtn.tagName !== "A") {
        e.preventDefault();
        window.location.href = "bookings.html";
      }
    });
  }

  // ===== 8. CLEAR PLAN HANDLER =====
  if (clearPlanBtn) {
    clearPlanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPlan = null;
      localStorage.removeItem("tourvista_saved_plan");
      localStorage.removeItem("tourvista_pending_trip");

      if (destinationInput) destinationInput.value = "";
      if (startDateInput) startDateInput.value = "";
      if (endDateInput) {
        endDateInput.value = "";
        endDateInput.min = todayStr;
      }
      if (travelersInput) travelersInput.value = 2;
      if (budgetInput) budgetInput.value = 30000;

      if (scheduleContainer) {
        scheduleContainer.style.border = "2px dashed #cbd5e1";
        scheduleContainer.style.textAlign = "center";
        scheduleContainer.innerHTML = `
          <h3 style="margin: 0 0 8px 0; color: #334155; font-size: 1.2rem;">No Schedule Created Yet</h3>
          <p style="margin: 0; font-size: 0.9rem; color: #64748b;">Fill out the trip details form on the left and click "GENERATE SCHEDULE" to view your plan.</p>
        `;
      }

      if (emptyState) emptyState.style.display = "block";
      if (planContainer) planContainer.style.display = "none";
      updateBudgetUI(0, 0);
    });
  }

  // Restore saved plan if valid (not in past)
  if (currentPlan && currentPlan.startDate >= todayStr && currentPlan.endDate >= currentPlan.startDate) {
    if (destinationInput) destinationInput.value = currentPlan.destination;
    if (startDateInput) startDateInput.value = currentPlan.startDate;
    if (endDateInput) {
      endDateInput.min = currentPlan.startDate;
      endDateInput.value = currentPlan.endDate;
    }
    if (travelersInput) travelersInput.value = currentPlan.travelers;
    if (budgetInput) budgetInput.value = currentPlan.totalBudget;
    renderSchedule(currentPlan);
  } else {
    localStorage.removeItem("tourvista_saved_plan");
    currentPlan = null;
  }
});