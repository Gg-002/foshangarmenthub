# FoshanGarmentHub Website

A responsive, English-language static lead-generation website for Foshan garment manufacturing.

## Preview locally

From this directory, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Pages

- `index.html` — full homepage and inquiry section
- `about.html` — company/network positioning
- `gallery.html` — filterable product gallery
- `factories.html` — manufacturing network and quality route
- `contact.html` — detailed inquiry form and contact information

## Required before launch

1. Replace `SITE_CONFIG.whatsappNumber` in `script.js` with the real number in international format, without `+`, spaces, or punctuation.
2. The site currently uses `service@foshangarmenthub.cn` as the configured contact email. Verify and replace it as needed before launch.
3. Connect the inquiry form by setting `SITE_CONFIG.formEndpoint` and implementing the request in `initForms()`, or embed the chosen hosted-form submission method.
4. Replace all Unsplash demonstration images with licensed, optimized company photography. Update alt text to match each image.
5. Add the real logo, favicon, Open Graph image, canonical URL, address, operating hours, social links, and domain.
6. Replace certificate placeholders only with current, verifiable certificates and clarify which factory/entity each covers.
7. Verify any production figures, customer logos, capacity claims, response times, markets served, and compliance statements before publishing.
8. Add final privacy policy, cookie policy (if required), and terms pages suitable for target markets.
9. Add server-side file upload rules, spam protection, consent logging, and secure lead storage when connecting the form.
10. Run accessibility, link, mobile, and performance checks after production assets are added.

## Form status

The forms currently validate user input and show a demo completion notice. They do **not** send data or upload files. This is intentional for the initial placeholder version.
