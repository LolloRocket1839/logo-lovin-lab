

# General Polish Pass — All Tools

## Summary
After reviewing all 8+ tools (Budget Calculator, Grade Calculator, Exam Session Planner, Property Valuator, Quick Offer Simulator, Study Spaces Directory, Cheap Eats Directory, Gyms Directory), the codebase is solid. Below are the concrete improvements organized by priority.

---

## 1. Accessibility & Console Errors

**Problem**: Console shows `"Some page content is not contained by landmarks"` and missing `aria-describedby` on DialogContent.
- Add `aria-describedby` to all `DialogContent` usages (Budget share dialog, Exam modal)
- Wrap orphan content in `<main>` where missing

**Files**: `BudgetCalculator.tsx`, `ExamModal.tsx`

---

## 2. Budget Calculator — Mobile UX Issues

**Problem**: Student presets are `hidden md:block` — mobile users (the primary audience) can never access them. Also, the desktop-only