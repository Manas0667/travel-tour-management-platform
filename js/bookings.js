
document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. DOM ELEMENTS =====
  const packageSelect = document.getElementById("packageSelect") || document.querySelector("select");
  const nameInput = document.getElementById("fullName") || document.querySelector('input[placeholder*="Name"]');
  const emailInput = document.getElementById("email") || document.querySelector('input[placeholder*="Email"], input[type="email"]');
  const guestsInput = document.getElementById("guests") || document.querySelector('input[type="number"]');
  const dateInput = document.getElementById("travelDate") || document.querySelector('input[type="date"]');

  const allButtons = Array.from(document.querySelectorAll("button"));
  const confirmBtn = document.getElementById("confirmBookingBtn") || allButtons.find(b => b.textContent.toLowerCase().includes("confirm"));

  // Prevent past dates on booking page too
  const todayStr = new Date().toISOString().split("T")[0];
  if (dateInput) {
    dateInput.min = todayStr;
  }

  // ===== 2. CHECK IF REDIRECTED FROM PLANNER PAGE =====
  const pendingTripRaw = localStorage.getItem("tourvista_pending_trip");

  if (pendingTripRaw && packageSelect) {
    const trip = JSON.parse(pendingTripRaw);
    const destTitle = trip.destination.charAt(0).toUpperCase() + trip.destination.slice(1);
    const plannedTotal = Number(trip.plannedCost) || 25000;

    const customOption = document.createElement("option");
    customOption.value = plannedTotal;
    customOption.dataset.custom = "true";
    customOption.textContent = `Custom ${destTitle} Trip - ${trip.totalDays || 5} Days (₹${plannedTotal.toLocaleString("en-IN")})`;
    customOption.selected = true;
    packageSelect.prepend(customOption);

    if (guestsInput && trip.travelers) guestsInput.value = trip.travelers;
    if (dateInput && trip.startDate && trip.startDate >= todayStr) dateInput.value = trip.startDate;
  }

  // ===== 3. DYNAMIC PRICE CALCULATION (FIXES STATIC ₹15,749 BUG) =====
  function getBasePrice() {
    if (!packageSelect) return 19999;
    const selectedOpt = packageSelect.options[packageSelect.selectedIndex];
    if (!selectedOpt) return 19999;

    const val = Number(selectedOpt.value);
    if (!isNaN(val) && val > 0) return val;

    const match = selectedOpt.textContent.match(/₹([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, "")) : 19999;
  }

  function updatePriceSummary() {
    const basePrice = getBasePrice();
    const guests = Math.max(1, Number(guestsInput?.value) || 1);
    const selectedOpt = packageSelect?.options[packageSelect.selectedIndex];

    const subtotal = selectedOpt?.dataset.custom === "true" ? basePrice : basePrice * guests;
    const gst = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + gst;

    // Update by IDs if present
    const subEl = document.getElementById("subtotalAmount");
    const gstEl = document.getElementById("gstAmount");
    const totalEl = document.getElementById("totalAmount");

    if (subEl && gstEl && totalEl) {
      subEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
      gstEl.textContent = `₹${gst.toLocaleString("en-IN")}`;
      totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
    } else {
      // Directly target the 3 price values inside the summary box
      const summaryBox = Array.from(document.querySelectorAll("div")).find(
        el => el.textContent.includes("Subtotal") && el.textContent.includes("Total Price") && el.querySelectorAll("*").length < 20
      );
      if (summaryBox) {
        const priceNodes = Array.from(summaryBox.querySelectorAll("span, strong, div, p")).filter(
          el => el.children.length === 0 && el.textContent.trim().startsWith("₹")
        );
        if (priceNodes.length >= 3) {
          priceNodes[0].textContent = `₹${subtotal.toLocaleString("en-IN")}`;
          priceNodes[1].textContent = `₹${gst.toLocaleString("en-IN")}`;
          priceNodes[2].textContent = `₹${total.toLocaleString("en-IN")}`;
        }
      }
    }

    return { subtotal, gst, total };
  }

  if (packageSelect) packageSelect.addEventListener("change", updatePriceSummary);
  if (guestsInput) guestsInput.addEventListener("input", updatePriceSummary);
  updatePriceSummary();

  // ===== 4. PAYMENT MODAL POPUP (OPENS ON "CONFIRM & PAY") =====
  function openPaymentModal(bookingDetails) {
    // Remove existing modal if any
    const oldModal = document.getElementById("tvPaymentModal");
    if (oldModal) oldModal.remove();

    const modalOverlay = document.createElement("div");
    modalOverlay.id = "tvPaymentModal";
    modalOverlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; padding: 16px; font-family: 'Poppins', sans-serif;
    `;

    modalOverlay.innerHTML = `
      <div style="background: #ffffff; width: 100%; max-width: 420px; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.25); animation: fadeIn 0.2s ease;">
        <!-- Header -->
        <div style="background: #0f172a; color: #ffffff; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">TourVista Secure Checkout</div>
            <div style="font-size: 1.25rem; font-weight: 700; margin-top: 2px;">Pay ₹${bookingDetails.total.toLocaleString("en-IN")}</div>
          </div>
          <button id="closePayModal" style="background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 1.1rem; cursor: pointer;">&times;</button>
        </div>

        <!-- Body -->
        <div id="payModalBody" style="padding: 20px 22px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 0.85rem; color: #334155;">
            <strong>${bookingDetails.packageName}</strong><br>
            <span style="color: #64748b;">${bookingDetails.fullName} &bull; ${bookingDetails.guests} Guest(s) &bull; ${bookingDetails.travelDate}</span>
          </div>

          <label style="display: block; font-size: 0.82rem; font-weight: 600; color: #334155; margin-bottom: 8px;">Select Payment Method</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
            <button type="button" class="pay-tab active-tab" data-method="upi" style="padding: 8px; border: 2px solid #0284c7; background: #e0f2fe; color: #0369a1; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">UPI / QR</button>
            <button type="button" class="pay-tab" data-method="card" style="padding: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">Card</button>
            <button type="button" class="pay-tab" data-method="netbanking" style="padding: 8px; border: 1px solid #cbd5e1; background: #fff; color: #475569; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">NetBanking</button>
          </div>

          <!-- Method Inputs -->
          <div id="payMethodFields">
            <label style="display: block; font-size: 0.8rem; color: #475569; margin-bottom: 5px;">Enter UPI ID</label>
            <input type="text" id="upiInput" value="omprakash@upi" placeholder="username@upi" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
          </div>

          <button type="button" id="completePaymentBtn" style="width: 100%; margin-top: 18px; background: #10b981; color: #ffffff; border: none; padding: 12px; border-radius: 8px; font-size: 0.98rem; font-weight: 600; cursor: pointer;">
            Pay ₹${bookingDetails.total.toLocaleString("en-IN")} Now
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // Close modal handler
    document.getElementById("closePayModal").addEventListener("click", () => modalOverlay.remove());
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.remove();
    });

    // Switch payment tabs (UPI / Card / NetBanking)
    const tabs = modalOverlay.querySelectorAll(".pay-tab");
    const fieldsBox = document.getElementById("payMethodFields");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.style.border = "1px solid #cbd5e1";
          t.style.background = "#fff";
          t.style.color = "#475569";
        });
        tab.style.border = "2px solid #0284c7";
        tab.style.background = "#e0f2fe";
        tab.style.color = "#0369a1";

        const method = tab.dataset.method;
        if (method === "upi") {
          fieldsBox.innerHTML = `
            <label style="display: block; font-size: 0.8rem; color: #475569; margin-bottom: 5px;">Enter UPI ID</label>
            <input type="text" value="omprakash@upi" placeholder="username@upi" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
          `;
        } else if (method === "card") {
          fieldsBox.innerHTML = `
            <label style="display: block; font-size: 0.8rem; color: #475569; margin-bottom: 5px;">Card Number</label>
            <input type="text" value="4532 •••• •••• 8890" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; margin-bottom: 10px; box-sizing: border-box;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <input type="text" value="09/29" placeholder="MM/YY" style="padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
              <input type="password" value="123" placeholder="CVV" style="padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
            </div>
          `;
        } else {
          fieldsBox.innerHTML = `
            <label style="display: block; font-size: 0.8rem; color: #475569; margin-bottom: 5px;">Select Bank</label>
            <select style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; box-sizing: border-box;">
              <option>State Bank of India (SBI)</option>
              <option>Punjab National Bank (PNB)</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
            </select>
          `;
        }
      });
    });

    // Final "Pay Now" button inside modal
    document.getElementById("completePaymentBtn").addEventListener("click", () => {
      const bookingId = "TV" + Math.floor(100000 + Math.random() * 900000);
      const savedList = JSON.parse(localStorage.getItem("tourvista_bookings")) || [];
      savedList.unshift({ ...bookingDetails, bookingId });
      localStorage.setItem("tourvista_bookings", JSON.stringify(savedList));
      localStorage.removeItem("tourvista_pending_trip");

      // Show instant Payment Success receipt inside the same modal
      document.getElementById("payModalBody").innerHTML = `
        <div style="text-align: center; padding: 14px 6px;">
          <div style="width: 56px; height: 56px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 12px;">&#10003;</div>
          <h3 style="margin: 0 0 6px; color: #0f172a; font-size: 1.25rem;">Payment Successful!</h3>
          <p style="margin: 0 0 14px; color: #64748b; font-size: 0.88rem;">Your tour booking is confirmed.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: left; font-size: 0.85rem; color: #334155; margin-bottom: 16px;">
            <div><strong>Booking ID:</strong> #${bookingId}</div>
            <div><strong>Package:</strong> ${bookingDetails.packageName}</div>
            <div><strong>Passenger:</strong> ${bookingDetails.fullName}</div>
            <div><strong>Date:</strong> ${bookingDetails.travelDate} (${bookingDetails.guests} Guests)</div>
            <div><strong>Amount Paid:</strong> ₹${bookingDetails.total.toLocaleString("en-IN")}</div>
          </div>
          <button type="button" id="doneModalBtn" style="width: 100%; background: #0284c7; color: #fff; border: none; padding: 11px; border-radius: 8px; font-weight: 600; cursor: pointer;">Done</button>
        </div>
      `;

      document.getElementById("doneModalBtn").addEventListener("click", () => {
        modalOverlay.remove();
        if (nameInput) nameInput.value = "";
        if (emailInput) emailInput.value = "";
      });
    });
  }

  // ===== 5. CONFIRM & PAY BUTTON CLICK =====
  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const fullName = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const guests = Math.max(1, Number(guestsInput?.value) || 1);
      const travelDate = dateInput?.value;

      if (!fullName) {
        alert("Please enter your Full Name!");
        nameInput?.focus();
        return;
      }
      if (!email || !email.includes("@")) {
        alert("Please enter a valid Email Address!");
        emailInput?.focus();
        return;
      }
      if (!travelDate || travelDate < todayStr) {
        alert("Please select a valid upcoming Travel Date!");
        dateInput?.focus();
        return;
      }

      const { subtotal, gst, total } = updatePriceSummary();
      const rawOptionText = packageSelect
        ? packageSelect.options[packageSelect.selectedIndex].textContent
        : "Tour Package";
      const packageName = rawOptionText.split("(")[0].trim();

      openPaymentModal({
        packageName,
        fullName,
        email,
        guests,
        travelDate,
        subtotal,
        gst,
        total
      });
    });
  }
});