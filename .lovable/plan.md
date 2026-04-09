

## Additional Automated Emails You Can Set Up

You already have a **lead confirmation** email that fires when someone registers interest. Here are the most impactful automated emails you can add, all using the same infrastructure already in place:

---

### 1. Owner/Admin Notification Email (highest value)
**Trigger:** Every time a new lead signs up (investor, seller, or student)
**What it does:** Sends YOU an email instantly with the lead details — name, email, type, source — so you never miss a lead even if you're not checking Formspree.
**Template:** `lead-notification` with a fixed `to` field pointing to your email address.

### 2. Seller Lead Confirmation
**Trigger:** When a property owner submits interest via the seller form
**What it does:** Sends the seller a branded confirmation with next steps (e.g., "We'll evaluate your property and contact you within 48h").
**Template:** `seller-confirmation` — different copy and tone from the investor one.

### 3. Quiz Completion Follow-Up
**Trigger:** After someone completes the Investor Quiz
**What it does:** Sends a personalized recap based on their quiz answers (budget range, property preferences) with a Calendly link to book a call.
**Template:** `quiz-followup` with dynamic data from quiz responses.

### 4. Calendly Booking Confirmation (custom branded)
**Trigger:** After someone books via Calendly (requires Calendly webhook integration)
**What it does:** Sends a branded pre-meeting email with preparation tips, your company intro, and what to expect.
**Note:** This requires setting up a Calendly webhook — slightly more complex.

---

### Recommended Starting Point

I'd suggest **#1 (Owner notification)** and **#2 (Seller confirmation)** first — they're quick to implement and immediately useful. Both just need a new template + a small trigger update.

### Technical Summary
- Each new email = one new `.tsx` template file + registry update + one `supabase.functions.invoke()` call at the trigger point
- All emails go through the existing `send-transactional-email` function — no new infrastructure needed
- Templates get branded to match your site automatically

