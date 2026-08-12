# Polypak Documentation Portal — Frontend Contract v1

Status: FROZEN BASELINE FOR IMPLEMENTATION
Backend project: Supabase mpqtoeygcoqbzsqczcdu

## 1. Core rule
Frontend is a presentation and workflow layer only. It must not reproduce or bypass server-side regulatory, approval, evidence, lifecycle, immutability, snapshot, package or supersession logic.

## 2. Primary MVP workflow
Login -> Role resolution -> Dashboard -> Documentation Requests -> Review -> Product linkage -> Product Version -> Evidence -> Document 1 / Document 2 -> Approval -> Issue -> Package -> Customer access.

## 3. Roles
- Customer User: own requests; draft/edit/submit; view own issued packages/artifacts.
- Polypak Reviewer: review queue; link product; prepare product/evidence/document data; evidence review.
- Polypak Approver: approve and issue Product Versions, Documents and Packages; supersession actions.
- Polypak Admin: all above plus regulatory ruleset administration.

Frontend must never infer permissions only from UI state. Backend authorization remains authoritative.

## 4. Request statuses
Canonical request lifecycle:
- draft
- submitted
- under_review
- approved
- issued
- closed

Allowed UI transitions:
- Customer: draft -> submitted via submit_documentation_request()
- Reviewer: submitted -> under_review via start_request_review()
- Approver: under_review -> approved via approve_documentation_request()
- Approver: approved -> issued occurs through package issue workflow
- Polypak authorized roles: close via close_documentation_request()

## 5. Request screens
### Login
Fields:
- Email
- Password
Actions:
- Sign in
- Forgot password

After sign-in:
- resolve current profile
- resolve active organization membership
- resolve member role
- redirect to role-appropriate dashboard

### Dashboard
Customer dashboard cards:
- Draft requests
- Submitted / In review
- Approved / Issued
- Recent issued documents
Primary CTA: New documentation request

Polypak dashboard cards:
- Submitted requests awaiting review
- Requests under review
- Documents awaiting approval
- Packages awaiting issue
- Evidence requiring review

### Documentation Requests list
Columns:
- Request number
- Customer / organization
- Product description
- Customer role
- Market scope
- Preferred language
- Status
- Updated/submitted date
- Primary action

Filters:
- Status
- Organization (Polypak only)
- Market scope
- Preferred language
- Search by request number / customer reference / product description

### Request detail — draft
Editable fields are limited to the patch accepted by update_draft_documentation_request():
- customer_reference
- product_description
- width_text
- length_text
- thickness_text
- other_dimensions_text
- intended_use
- food_contact_status
- customer_role
- printing_status
- pcr_claim_requested
- requested_pcr_percent
- compostability_claim_requested
- compostability_type_requested
- reusable_status
- market_scope
- target_countries
- documentation_requested
- customer_comments
- preferred_document_language
- confirmation_accepted
- role_basis
- customer_own_name_or_trademark
- customer_modifies_packaging_compliance
- customer_microenterprise_status
- reassessment_of_request_id
- reassessment_reason

Actions:
- Save draft -> update_draft_documentation_request(target_request_id, patch)
- Submit request -> submit_documentation_request(target_request_id)

Frontend must not directly update lifecycle-controlled fields.

## 6. Production RPC contract
Use these server actions for controlled transitions:
- update_draft_documentation_request(target_request_id, patch)
- submit_documentation_request(target_request_id)
- start_request_review(target_request_id)
- link_request_product(target_request_id, target_product_id)
- approve_documentation_request(target_request_id)
- approve_product_version(target_product_version_id)
- approve_document(target_document_id)
- issue_document(target_document_id)
- issue_documentation_package(target_package_id)
- supersede_document(target_document_id, replacement_document_id)
- supersede_documentation_package(target_package_id, replacement_package_id)
- set_evidence_review_status(target_evidence_id, target_status)
- activate_regulatory_ruleset(target_ruleset_id)

Evidence file verification uses the server-side verification flow / Edge Function. Frontend must not create a trusted verification hash itself.

## 7. Read-only immutable objects
Frontend may display but must not mutate:
- request_submission_snapshots
- issued_document_snapshots
- issued_package_snapshots
- issued_artifacts

## 8. UI restrictions
Frontend must not calculate or assert:
- legal compliance
- PPWR applicability conclusions
- approval eligibility
- Evidence sufficiency
- Evidence validity
- Product Version compatibility
- snapshot contents or hashes
- package validity
- supersession validity
- Polypak regulatory role

The UI may display backend state and backend error messages translated into user-friendly explanations.

## 9. Error handling
Every mutation must:
- disable its action while pending
- prevent double submission
- show success state only after confirmed server response
- display actionable error state on failure
- re-fetch authoritative record after success

## 10. First implementation scope
Implement only:
1. Authentication
2. Role-aware app shell
3. Dashboard
4. Documentation Requests list
5. Request detail / draft edit
6. Submit workflow
7. Polypak Review queue

Do not implement Documents, Evidence or Package screens until this first slice passes E2E tenant-isolation and role tests.
