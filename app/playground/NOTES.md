# Accessibility Implementation Notes: Manual vs shadcn/ui (Radix)

After implementing the accessible components manually and comparing them against the versions provided by `shadcn/ui` (which uses Radix UI under the hood), I identified several concrete improvements and edge-cases that the library handles automatically:

### 1. Modal Dialog
* **Scroll Locking and Body Management:** The shadcn/ui Dialog utilizes `react-remove-scroll` to prevent the background body from scrolling while the modal is open. In my manual implementation, the background could still be scrolled if the user spun their mouse wheel.
* **React Portals for DOM Placement:** The shadcn/ui version uses Radix's `<Portal>` component to render the modal at the very end of the DOM (`document.body`). This guarantees that it breaks out of any parent container's `overflow: hidden` or complex `z-index` stacking contexts, whereas my manual implementation was rendered in-place.
* **Advanced Focus Management:** While my manual version restores focus when closing and traps focus using a simple `keydown` listener, Radix uses a more robust `FocusScope` that handles edge cases like dynamically added focusable elements, shadow DOM boundaries, and returning focus even if the triggering element was removed from the DOM.

### 2. Tabs
* **Roving Tabindex Implementation:** My manual implementation handled the arrow keys, but shadcn/ui (Radix) implements a strict "roving tabindex" where only the *selected* tab is in the page's tab sequence (`tabIndex={0}`). The unselected tabs are completely removed from the tab sequence (`tabIndex={-1}`), ensuring keyboard users don't have to hit `Tab` multiple times to skip past the tablist.
* **Automatic ID Generation:** My manual implementation required passing unique IDs for the tabs and tabpanels so that `aria-controls` and `aria-labelledby` could be linked. Radix automatically generates unique, stable IDs internally (using React's `useId`), which prevents ID collisions if multiple Tab components are rendered on the same page.

### 3. Disclosure (Accordion)
* Radix handles smooth height animations by exposing CSS custom properties (like `--radix-accordion-content-height`), whereas my manual implementation simply toggled `hidden` which makes CSS transitions on height very difficult.
