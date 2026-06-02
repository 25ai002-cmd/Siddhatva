# Siddhatva Builders Website

A premium, modern, responsive multi-page website for **Siddhatva Builders** (Siddhatva Group) built with pure semantic HTML5, Vanilla CSS, and modern Vanilla ES6 JavaScript.

## Live Preview & Local Development

To run the project locally:
1. Ensure you have Python installed.
2. Navigate to the project root directory.
3. Run the local development server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and navigate to: **[http://localhost:8000](http://localhost:8000)**

---

## Deployment to Render

This repository is pre-configured for instant zero-config deployment to **Render** using a Render Blueprint (`render.yaml`).

### Steps to Deploy:
1. Ensure this repository is pushed to your GitHub account:
   ```bash
   git push -u origin main
   ```
2. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
3. Click **New** (top right) and select **Blueprint**.
4. Connect this GitHub repository.
5. Render will automatically read the `render.yaml` configuration file and deploy the project as a high-performance **Static Site**.

### Manual Configuration on Render (Alternative):
If you prefer to configure the site manually on Render without Blueprints:
1. Create a new **Static Site** on Render.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Build Command**: `(leave blank)`
   - **Publish Directory**: `.` (or root directory)

---

## Directory Structure
- `index.html` - Home page (with hero slider, key amenities, featured projects, and credentials).
- `about.html` - About Us page (detailing company standards, structural margins, vision/mission).
- `gallery.html` - Gallery page (with active category filter tabs and visual lightbox modal).
- `contact.html` - Contact page (with office addresses, styled maps, and validating query form).
- `css/style.css` - Custom design system, typography, breakpoints, and UI transitions.
- `js/main.js` - Logic for hero slider, mobile menu drawer, gallery category filters, image lightbox, and inquiry form submission.
- `images/` - High-resolution architectural visualization renders and vector logo emblems.
