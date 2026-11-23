

document.addEventListener('DOMContentLoaded', function () {
  const tripForm = document.getElementById('trip-form');
  const destinationInput = document.getElementById('destination');
  const startDateInput = document.getElementById('start');
  const endDateInput = document.getElementById('end');
  const travelersInput = document.getElementById('travelers');
  const budgetInput = document.getElementById('budget');

  const emptyState = document.getElementById('empty');
  const planWrapper = document.getElementById('plan');
  const planTitle = document.getElementById('plan-title');
  const planSub = document.getElementById('plan-sub');
  const itineraryList = document.getElementById('itinerary');

  const spentEl = document.getElementById('spent');
  const budgetTotalEl = document.getElementById('budget-total');
  const leftEl = document.getElementById('left');
  const meterFill = document.getElementById('meter-fill');

  // Realistic Clean Schedules with Timings & Specific Places
  const cleanSchedule = [
    {
      title: "Arrival & Beach Walk",
      morning: "10:00 AM - 01:00 PM: Hotel Check-in & Relax at Baga Beach",
      evening: "04:00 PM - 07:00 PM: Sunset view & Local Food Street"
    },
    {
      title: "Sightseeing & Fort Tour",
      morning: "09:30 AM - 01:30 PM: Visit Aguada Fort & Calangute Beach",
      evening: "03:30 PM - 07:00 PM: Mandovi River Cruise & Local Market"
    },
    {
      title: "Water Sports & Adventure",
      morning: "10:00 AM - 02:00 PM: Scuba Diving & Jet Skiing at Anjuna",
      evening: "05:00 PM - 08:00 PM: Relaxing Cafe & Music Evening"
    },
    {
      title: "Heritage Walk & Shopping",
      morning: "10:00 AM - 01:30 PM: Old Goa Churches & Museum Visit",
      evening: "04:00 PM - 07:30 PM: Panjim Market Souvenir Shopping"
    },
    {
      title: "Leisure & Departure",
      morning: "10:00 AM - 01:00 PM: Free Time for Cafe Visit & Packing",
      evening: "03:00 PM - 05:00 PM: Check-out & Transfer to Airport/Station"
    }
  ];

  if (tripForm) {
    tripForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let destRaw = destinationInput ? destinationInput.value.trim() : 'Destination';
      const destination = destRaw.charAt(0).toUpperCase() + destRaw.slice(1);

      const startDate = startDateInput && startDateInput.value ? new Date(startDateInput.value) : new Date();
      const endDate = endDateInput && endDateInput.value ? new Date(endDateInput.value) : new Date();
      const travelers = travelersInput ? parseInt(travelersInput.value) || 1 : 1;
      const budget = budgetInput ? parseFloat(budgetInput.value) || 0 : 0;

      // Days Calculation
      const timeDiff = Math.abs(endDate - startDate);
      let totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      if (isNaN(totalDays) || totalDays <= 0) totalDays = 1;

      // Layout ko clean rakhne ke liye max 5 days tak hi dikhayenge
      const displayDays = Math.min(totalDays, 5);

      if (planTitle) planTitle.textContent = `Trip to ${destination}`;
      if (planSub) planSub.textContent = `${totalDays} Days Trip (${displayDays} Days Highlighted) • ${travelers} Travelers`;

      // Dynamic Itinerary Render
      if (itineraryList) {
        itineraryList.innerHTML = '';
        for (let i = 0; i < displayDays; i++) {
          const item = cleanSchedule[i % cleanSchedule.length];
          const li = document.createElement('li');
          li.style.background = '#ffffff';
          li.style.border = '1px solid #e2e8f0';
          li.style.borderRadius = '8px';
          li.style.padding = '14px 18px';
          li.style.marginBottom = '12px';
          li.style.listStyle = 'none';

          li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #0284c7; font-size: 15px;">Day ${i + 1}: ${item.title}</strong>
              <span style="font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 600;">SCHEDULED</span>
            </div>
            <div style="font-size: 13px; color: #334155; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #0284c7; font-weight: bold;">•</span>
                <span style="font-size: 14px;"></span>
                <span style="font-weight: 600; color: #1e293b;">Morning:</span>
                <span style="color: #475569;">${item.morning}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #0284c7; font-weight: bold;">•</span>
                <span style="font-size: 14px;"></span>
                <span style="font-weight: 600; color: #1e293b;">Evening:</span>
                <span style="color: #475569;">${item.evening}</span>
              </div>
            </div>
          `;
          itineraryList.appendChild(li);
        }
      }

      // Budget Calculations
      const estimatedCost = totalDays * 2000;
      const remainingBudget = budget - estimatedCost;

      if (spentEl) spentEl.textContent = `₹${estimatedCost.toLocaleString('en-IN')}`;
      if (budgetTotalEl) budgetTotalEl.textContent = `₹${budget.toLocaleString('en-IN')}`;
      if (leftEl) leftEl.textContent = `₹${remainingBudget.toLocaleString('en-IN')}`;

      let percentage = budget > 0 ? (estimatedCost / budget) * 100 : 0;
      if (percentage > 100) percentage = 100;
      if (meterFill) meterFill.style.width = `${percentage}%`;

      if (emptyState) emptyState.style.display = 'none';
      if (planWrapper) planWrapper.style.display = 'block';
    });
  }
});