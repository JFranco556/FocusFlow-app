---
name: FocusFlow Professional
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#6bd8cb'
  on-secondary: '#003732'
  secondary-container: '#29a195'
  on-secondary-container: '#00302b'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#39000b'
  on-tertiary-container: '#ee3a59'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#920029'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
  urgent-red: '#f23d5c'
  ai-surface: '#86f2e4'
  surface-deep: '#213145'
  user-container: '#131b2e'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 20px
  gutter-mobile: 12px
---

## Brand & Style

FocusFlow is a high-performance productivity companion designed for professionals who require mental clarity and efficient task execution. The brand personality is **composed, intelligent, and unobtrusive**. 

The visual style follows a **Corporate / Modern** approach with subtle **Minimalist** influences. It prioritizes information density and hierarchy through clear typography and a refined color palette. The interface avoids unnecessary flourishes, instead using purposeful color blocks and soft tonal shifts to guide the user's attention toward urgent actions and AI-driven insights. The emotional response is one of "calm control"—the UI feels organized, responsive, and reliable.

## Colors

The system employs a sophisticated **Dark Mode** by default, utilizing deep navy and slate tones to reduce eye strain and provide a premium backdrop for work.

- **Primary:** A deep, authoritative slate-black used for structural grounding and primary text.
- **Secondary:** A vibrant teal-green used for primary actions, active navigation states, and the AI's identity markers.
- **Tertiary (Urgent):** A high-visibility crimson-red reserved exclusively for high-priority alerts and deadline indicators.
- **Surface Strategy:** We use a "Fidelity" approach where surfaces are layered. The background is a deep `inverse-surface` (#213145), while chat bubbles and cards use slightly lighter or more saturated variants to create a clear visual stack.

## Typography

The typography system is built entirely on **Inter**, a typeface chosen for its exceptional legibility in digital interfaces and its neutral, systematic feel.

Hierarchy is established primarily through weight shifts and tight tracking in larger headlines. For mobile devices, headlines are scaled down by approximately 10-15% to maintain balance. Labels (UI metadata) utilize a slightly increased letter-spacing to ensure readability at very small sizes (11px-12px). Body text remains at a comfortable 14px for dense chat interactions.

## Layout & Spacing

FocusFlow uses a **Fluid Grid** model with dynamic safe margins. 

- **Horizontal Margins:** A standard 20px margin is applied to mobile screens to provide breathing room.
- **Vertical Rhythm:** A base-4 spacing system is used. 16px (md) is the standard padding for containers and message bubbles, while 24px (lg) separates major content groups in the chat stream.
- **Safe Areas:** The bottom navigation bar is fixed at 56px height, with an equivalent padder used at the bottom of the scrollable canvas to prevent content occlusion.
- **Responsiveness:** On larger displays, the chat canvas should constrain to a max-width of 768px and center itself, maintaining the 20px gutter as a minimum.

## Elevation & Depth

Hierarchy is communicated through **Tonal Layering** and **Ambient Shadows** rather than stark elevation.

1.  **Background:** The lowest layer is the dark slate background.
2.  **Containers:** Message bubbles and input fields use a subtle background tint (Surface Variant or Primary Container) to distinguish themselves from the background.
3.  **Shadows:** We use an extremely soft "Diffuse Shadow" (`shadow-[0px_4px_12px_rgba(15,23,42,0.04)]`) on message bubbles to give them a slight lift without appearing heavy.
4.  **Interactivity:** Active states (like input focus) are indicated by a 1px border stroke in the secondary teal color, rather than a change in elevation.

## Shapes

The shape language is **Rounded**, balancing professional structure with a modern, approachable feel.

- **Primary Radius:** 0.5rem (8px) is the default for list items and task cards.
- **Large Radius:** 1rem (16px) is used for major containers like message bubbles and the chat input bar.
- **Asymmetric Bubbles:** Message bubbles feature a unique asymmetric corner (4px on the anchor side) to clearly indicate the origin of the message (Left for AI, Right for User).
- **Interactive Elements:** Buttons and avatars utilize a "Full" (pill-shaped) radius for a clear tactile affordance.

## Components

### Buttons
- **Action Buttons:** Circular (40x40px) or pill-shaped, using the secondary color for the primary "Send" action and surface-variant backgrounds for secondary actions like "Notifications."
- **Navigation Items:** Tab-style buttons with icon-label stacks. The active state includes a centered dot indicator beneath the icon.

### Chat Bubbles
- **AI Bubbles:** Surface-variant background, asymmetric corners, accompanied by an avatar. 
- **User Bubbles:** Primary-container background (darker navy), right-aligned, asymmetric corners.
- **Task Embeds:** Nestled within AI bubbles, these use a light border and a left-hand color-coded accent bar (red for urgent) to signify task status.

### Input Fields
- **Chat Input:** A large 16px-rounded container with a subtle border. It supports multi-line text and features integrated circular action buttons at the flanks.

### Navigation
- **Top Bar:** Sticky, semi-transparent background blur, containing the brand logotype and user profile/notifications.
- **Bottom Bar:** Fixed 56px height, providing quick access to the core functional modules (Dashboard, Tasks, Calendar, Chat).