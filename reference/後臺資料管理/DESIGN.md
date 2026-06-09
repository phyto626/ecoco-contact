---
name: Vibrant Circularity
colors:
  surface: '#f6faff'
  surface-dim: '#b7dfff'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf5ff'
  surface-container: '#e0f0ff'
  surface-container-high: '#d4ebff'
  surface-container-highest: '#c9e6ff'
  on-surface: '#001e2f'
  on-surface-variant: '#5c4037'
  inverse-surface: '#00344d'
  inverse-on-surface: '#e5f2ff'
  outline: '#917065'
  outline-variant: '#e5beb2'
  surface-tint: '#ad3300'
  primary: '#a83200'
  on-primary: '#ffffff'
  primary-container: '#d34100'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59e'
  secondary: '#434cca'
  on-secondary: '#ffffff'
  secondary-container: '#5d67e5'
  on-secondary-container: '#fffbff'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfa600'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#390b00'
  on-primary-fixed-variant: '#842500'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bec2ff'
  on-secondary-fixed: '#00036b'
  on-secondary-fixed-variant: '#2b34b5'
  tertiary-fixed: '#ffe086'
  tertiary-fixed-dim: '#efc100'
  on-tertiary-fixed: '#231a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f6faff'
  on-background: '#001e2f'
  surface-variant: '#c9e6ff'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
  label-reg:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The brand personality is energetic, sustainable, and high-impact, centered on the spirit of "Vibrant Circularity." This design system shifts from traditional "green" environmental tropes to a bold, high-contrast palette that signals urgency and modern efficiency. 

The design style is **Corporate Modern with a Tech-Optimist edge**. It utilizes clean layouts, generous white space, and purposeful color blocking to create a professional yet highly accessible experience. The emotional response should be one of confidence, activity, and seamless integration into a circular economy.

## Colors
The palette is built on high-contrast interaction. **Orange (#FF5000)** is the primary action color, reserved for CTAs, critical buttons, and active states. **Blue (#060E9F)** serves as the structural foundation, used for navigation bars, footers, and primary headings to provide a grounded, professional feel.

**Yellow (#FFCE00)** is used sparingly for highlights or warning states that require attention without the urgency of red. **Deep Blue (#0076A9)** and **Light Blue Gray (#8EB8C9)** provide tonal depth for secondary UI elements, while **Beige (#FAE0B8)** is utilized for subtle card backgrounds or sectional containers to soften the high-contrast transitions. The background is strictly **White (#FFFFFF)** to maintain maximum legibility and a clean aesthetic.

## Typography
The typography system prioritizes clarity and a geometric, modern feel. 
- **Headings (English):** Use **Montserrat** (as a high-quality substitute for Futura) in Bold weights for all primary titles to convey the brand's strength.
- **Body (English):** Use **Inter** (as a modern substitute for Helvetica Neue) for superior screen legibility and a neutral, professional tone.
- **Chinese Text:** Use **Noto Sans CJK TC**. Use the Bold weight for sub-headings and the Regular weight for all body copy and descriptions.

Maintain a strict vertical rhythm. Large display sizes must scale down for mobile devices to prevent awkward line breaks.

## Layout & Spacing
The system uses a **Fluid Grid** model based on a 4px baseline unit. 
- **Desktop:** 12-column grid with 24px gutters and 48px side margins. Content is typically centered with a max-width of 1280px.
- **Tablet:** 8-column grid with 16px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing should be used to create clear groupings. Use `xxl` (64px) for major vertical section breaks and `md` (16px) for standard padding within cards and containers.

## Elevation & Depth
This design system uses **Tonal Layers** and **Low-contrast Outlines** rather than heavy shadows to maintain a clean, modern aesthetic. 

- **Level 0 (Surface):** The main background (#FFFFFF).
- **Level 1 (Cards/Containers):** Subtle borders (1px) using Blue Gray (#8EB8C9 at 30% opacity) or Beige (#FAE0B8) backgrounds.
- **Level 2 (Interactive):** Elements that require focus (like active input fields) use a 2px Orange (#FF5000) border.
- **Overlays:** Modals and menus use a soft, ultra-diffused ambient shadow (10% opacity Blue) to lift them from the base plane without appearing "heavy."

## Shapes
In alignment with the "Circularity" theme, the shape language is **Rounded**. 
- Standard components (Buttons, Inputs, Cards) use a **0.5rem (8px)** corner radius.
- Large containers or featured sections use **1rem (16px)**.
- Specific accent elements, like chips or status badges, may use a **Pill-shape** (fully rounded) to emphasize the "circular" brand motif.

## Components
- **Buttons:** Primary buttons are Solid Orange (#FF5000) with White text. Secondary buttons use a Blue (#060E9F) outline with Blue text.
- **Navigation:** Top navigation bars should use the Deep Blue (#0076A9) or Blue (#060E9F) background with White typography to create a strong structural frame.
- **Input Fields:** Use 1px Light Blue Gray (#8EB8C9) borders, turning Orange (#FF5000) upon focus.
- **Chips/Badges:** Use the Beige (#FAE0B8) or Light Blue Gray (#8EB8C9) backgrounds with dark text for categorizing items or displaying metadata.
- **Cards:** White background with a 1px Blue Gray (#8EB8C9) border. For "featured" cards, use a subtle Beige (#FAE0B8) background.
- **Circular Indicators:** Progress rings and eco-stats should utilize the primary Orange and Yellow to visualize "circularity" and completion.