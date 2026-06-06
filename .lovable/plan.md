## Plan

1. **Make the first frame visible immediately**
   - Update the scene interpolation so scene `01` starts at full opacity at scroll progress `0`.
   - Set its initial `y` and `scale` to the held state, not the entering-from-below state.

2. **Keep the liquid transition after the first frame**
   - Preserve the Marvis-style in/hold/out choreography for scenes `02–05`.
   - Only special-case the first scene’s initial state so it does not appear washed out or hidden.

3. **Improve mobile framing**
   - Reduce top/bottom collision with the announcement banner and bottom nav by using a mobile-safe visible area inside the pinned stage.
   - Keep the logo/headline readable in the first viewport without changing copy, brand, or business message.

4. **Verify on mobile**
   - Check the homepage at mobile viewport and confirm the first frame is visible before scrolling, then that elements still flow in/out smoothly while scrolling.