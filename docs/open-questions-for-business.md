# Open questions for the business

The new Admin Portal screens were built from the Figma screenshots. Where a screenshot did not show something, we chose a sensible default so the screen still works. Please confirm each default below or tell us what it should be.

**How to answer:** reply under each question with "OK" or with what it should be instead.
**Links:** each link opens the screen in the prototype (it must be running on the developer's computer at `http://localhost:5173`). If a link does not open for you, ask the development team for a shared link or a screenshot.

---

## Accounts

**1. New Account form for account types other than "Group"**
- **Question:** When someone creates a new Account and picks a type other than "Group" (for example Broker Agency, General Agency or EP Facility), which fields should the form ask for?
- **Current default:** Every account type uses the same form as "Group" (the only form shown in Figma).
- **Screen:** http://localhost:5173/lightning/o/Account/new

## Contacts

**2. Emergency Contact Information and Enrollment & Plan sections**
- **Question:** Which fields belong in the "Emergency Contact Information" and "Enrollment & Plan" sections of a contact?
- **Current default:** Both sections are shown with their titles but no fields (Figma showed them empty).
- **Screen:** http://localhost:5173/lightning/r/Contact/003Ec0000a1962939d/view

## Claims

**3. Which buttons a claim shows, depending on its status**
- **Question:** Are these the right buttons for each claim status, and what should the small ▼ menu next to them contain?
- **Current default:**
  - Claims that are still open (Pending Review, Pending Information, In Review, Request More Information (RMI), Pending Reimbursement (PRB)) show Approve, Deny, RMI, Split Approval and a ▼ menu with "Edit".
  - Finished claims (Approved, Auto Approved, Paid, Partial Pay, Applied, Denied, Expired) show Split Approval, Repayment Recovery and Delete.
  - Approve, Deny and RMI change the claim's status straight away.
- **Screens:** open claim http://localhost:5173/lightning/r/Claim/a0CEc00000000023AA/view · finished claim http://localhost:5173/lightning/r/Claim/a0CEc00000000020AA/view

**4. What "Submit Split" does in Split Approval**
- **Question:** After someone splits a claim into approved / denied / more-information parts and clicks "Submit Split", what should the claim's status become?
- **Current default:** "Partial Pay" if any part is denied or needs more information; "Approved" if the whole amount is approved.
- **Screen:** http://localhost:5173/lightning/r/Claim/a0CEc00000000020AA/view?action=splitApproval

## Reports

**5. Report contents**
- **Question:** Should opening a report show the actual report (numbers and charts)? If yes, which reports are needed and where does their data come from?
- **Current default:** Opening a report shows an empty grey area where the report would be (Figma did not show any report contents).
- **Screen:** http://localhost:5173/lightning/o/Account/list?scenario=R2

**6. "New Report" button**
- **Question:** What should happen when someone clicks "New Report"?
- **Current default:** Nothing happens. ("New Folder" works: it creates a folder.)
- **Screen:** http://localhost:5173/lightning/o/Report/list?filterName=sharedWithMe

## Plan Years and enrollments

**7. New Plan Year form**
- **Question:** Is this the right list of fields for creating a new Plan Year, in this order?
- **Current default:** Plan Year Name, Valid Start Date, Annual Family Maximum, Valid End Date, Deductible Application Type, Run Out Days, Deductible Rule, Renewal Type, Draft Claim Expiry Days, Status (starts as "Active"), Draft Expiry Reminder Days, Start Date, Plan Year Label, End Date.
- **Screen:** http://localhost:5173/lightning/o/PlanYear/new

**8. Adding a member to a Plan Year Enrollment**
- **Question:** When someone clicks "New" in the members list of a Plan Year Enrollment, which fields should they fill in? And what should "Change Owner" do there?
- **Current default:** "New" asks for the Member (required) and a Status (starts as "Active"). "Change Owner" does nothing yet.
- **Screen:** http://localhost:5173/lightning/r/PlanYearEnrollment/a1EEc00000PYE00001/view

## Card Transactions

**9. Card Transaction details**
- **Question:** Which fields belong in the "Amounts", "Merchant & Description", "Adjudication & Status" and "Participant & Receipt Info" sections of a card transaction?
- **Current default:** The four sections are shown with their titles but no fields (Figma showed only the titles).
- **Screen:** http://localhost:5173/lightning/r/CardTransaction/a2CEc00000CTX00000/view

## Portal Informations

**10. New Portal Information form**
- **Question:** Is this the right form for creating a new portal message, and are the starting values right?
- **Current default:** The form has the same fields as the message's details. New messages start with Severity "Info", Display Location "Dashboard", Approval Status "Draft" and "Is Active" ticked.
- **Screen:** http://localhost:5173/lightning/o/PortalInformation/new

## Participant search

**11. Employer Search — which employers should be found**
- **Question:** When searching employers for "A", Figma showed "13 employer(s) found" but only the first 10. Which employers should the search return?
- **Current default:** Employers whose name contains the letters typed. Page 2 shows SAL952, Test Aarete and Unifi Aviation, LLC. "QA Test Employer - CBSR Role" is not treated as an employer.
- **Screen:** http://localhost:5173/lightning/n/Participant_Search?tab=employer&name=A&search=1

**12. Claim Search results**
- **Question:** When a claim search finds claims, which columns should the results list show (for example Claim Number, Member, Status, Amount, Date)?
- **Current default:** Claim search always says "No records found matching your search criteria." (Figma never showed claim results.)
- **Screen:** http://localhost:5173/lightning/n/Participant_Search?tab=claim&advanced=1&employer=QA+Test+Employer+Group+-+CBSR&search=1

**13. Drop-down lists on the search screens**
- **Question:** What choices should these drop-down lists offer: Employer (Participant and Claim Search), Plan Year, Expense Type, Escalation State?
- **Current default:** Employer lists the 11 employers seen in the Figma results. Plan Year and Expense Type only offer "--None--". Escalation State only offers "Either".
- **Screens:** http://localhost:5173/lightning/n/Participant_Search?tab=participant · http://localhost:5173/lightning/n/Participant_Search?tab=claim&advanced=1

**14. How the searches match what is typed**
- **Question:** Are these search rules right?
- **Current default:**
  - Last Name, First Name, Employee Number, Email Address and EIN find records that **start with** what is typed (typing "A" finds "Abate" and "Ackerman").
  - Employer Name finds employers whose name **contains** what is typed (typing "A" also finds "Blalock").
  - Last Name must be filled in before a Participant Search can run; otherwise the screen says "Complete this field."
  - Employer Employee ID works like Employee Number; Dependent Last / First Name find members whose dependents' names contain what is typed.
  - Employer Code (Participant Search), Dependent Date of Birth and the advanced claim filters do not narrow the search yet, because the results have no matching column.
- **Screens:** http://localhost:5173/lightning/n/Participant_Search?tab=participant&lastName=A&search=1 · http://localhost:5173/lightning/n/Participant_Search?tab=participant&advanced=1&lastName=A&search=1

**15. The "All" tick box in the status filters**
- **Question:** How should "All" behave in the status tick-box lists?
- **Current default:**
  - Claim Status, Employer Status and the advanced claim filters: ticking "All" clears the other boxes; ticking any other box clears "All".
  - Participant Status: ticking "All" ticks every status, and unticking any status also unticks "All" (as the Figma screenshot shows all statuses ticked).
- **Screens:** http://localhost:5173/lightning/n/Participant_Search?tab=claim · http://localhost:5173/lightning/n/Participant_Search?tab=participant&advanced=1
