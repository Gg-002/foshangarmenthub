const SITE_CONFIG = {
  whatsappNumber: '16047679938',
  whatsappMessage: "Hello\nCan we help you?"
};

const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

function initNavigation() {
  const toggle = qs('.menu-toggle');
  const menu = qs('.nav-links');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? I18N[currentLang()].menu_close : I18N[currentLang()].menu_open;
    document.body.classList.toggle('menu-open', open);
  });
}

/* ─────────────────────────────────────────────────────────────
   i18n — multi-language switcher
   ─────────────────────────────────────────────────────────────
   Languages: en (default), id (Indonesian), th (Thai),
   ru (Russian), ar (Arabic — RTL).
   Persistence: localStorage key "lang".
   On switching:
     - swaps data-i18n text content
     - swaps data-i18n-placeholder for <input>/<textarea>
     - toggles <html dir="rtl"> for Arabic
   Translations below are machine-grade and should be reviewed
   by a native speaker before launch.
   ───────────────────────────────────────────────────────────── */

const I18N = {
  en: {
    /* meta */
    'meta.title': 'TOMOLI | Your Direct Gateway to Garment Manufacturing',
    'meta.desc.home': "Connect with Foshan garment factories for childrenswear, adult apparel, sportswear, knitwear and more. OEM/ODM support since 2000.",
    'meta.desc.products': "Children's and adult apparel manufacturing categories from TOMOLI.",
    'meta.desc.about': "Leading manufacturer for children's apparel in China with 30+ years experience, 100,000+ m² factory base, and full OEM/ODM capabilities.",
    'meta.desc.contact': "Get in touch with TOMOLI in Foshan, Guangdong, China.",
    /* utility strip */
    'utility.text': 'Guangdong, China · Global OEM / ODM',
    /* nav */
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'menu_open': 'MENU',
    'menu_close': 'CLOSE',
    /* header buttons */
    'header.whatsapp': 'WhatsApp',
    'header.start_project': 'Start a Project',
    /* home — hero */
    'home.hero.eyebrow': 'Guangdong, China',
    'home.hero.title': 'One-Stop Children Apparel Manufacturer in China',
    'home.hero.lead': "A one-stop solution to children's apparel needs with 30+ years of manufacturing expertise, flexible MOQs and independent quality control.",
    /* home — Why us */
    'why.eyebrow': 'Why us',
    'why.title': 'Why brands<br>choose us.',
    'why.lead': 'Integrated supply chain. Competitive pricing. Flexible volumes. Strict quality control.',
    'why.01.num': '01 / INTEGRATED SUPPLY CHAIN',
    'why.01.body': 'We offer faster, lower-cost sourcing near Zhongda Textile Market. Our one-stop services cover sampling, production, inspection, packaging, and export.',
    'why.02.num': '02 / COMPETITIVE PRICING',
    'why.02.body': 'Our integrated supply chain reduces sourcing and production costs. We provide flexible solutions tailored to your requirements and budget.',
    'why.03.num': '03 / FLEXIBLE PRODUCTION VOLUMES',
    'why.03.body': 'We handle small batches and bulk orders. Flexible MOQs, experienced teams, and stable capacity meet different production needs.',
    'why.04.num': '04 / PROCESS & QUALITY CONTROL',
    'why.04.body': 'Our independent control system ensures consistent quality. Strict inspections, clear timelines, and regular updates keep every order on track.',
    /* home — What we offer */
    'offer.eyebrow': 'What we offer',
    'offer.title': 'From concept<br>to shipment.',
    'offer.lead': 'Complete garment manufacturing from development to export.',
    'offer.01.num': '01 / 30+ YEARS EXPERTISE',
    'offer.01.body': 'Over 30 years of garment manufacturing expertise, backed by skilled craftsmanship and reliable production management.',
    'offer.02.num': '02 / PRODUCT SPECIALIZATION',
    'offer.02.body': 'Specializing in children\'s and adult apparel, including knitwear, sportswear, denim, and customized garment categories.',
    'offer.03.num': '03 / OEM & ODM CAPABILITIES',
    'offer.03.body': 'Flexible OEM and ODM services covering product development, fabric sourcing, sampling, customization, bulk production, and packaging.',
    'offer.04.num': '04 / PRODUCTION CAPACITY',
    'offer.04.body': 'Our 100,000+ m² base, 500+ skilled workers, and 100+ modern machines ensure consistent quality, flexibility, and reliable delivery.',
    /* home — Social */
    'social.eyebrow': 'Social media newsroom',
    'social.title': 'Inside the<br>production floor.',
    'social.lead': 'Live updates from the factory floor.',
    'social.linkedin.handle': 'Handle to be configured',
    'social.linkedin.follow': 'Follow on LinkedIn →',
    'social.instagram.handle': '@tomoli_chinakidswear',
    'social.instagram.follow': 'Follow on Instagram →',
    /* products — hero */
    'products.hero.title': 'From Fabric to Diverse Finishes',
    'products.hero.lead': 'We specialize in children\'s wear, knitwear, sportswear, denim, and custom garments. We offer diverse fabrics, colors, trending prints, patterns, and techniques such as embroidery, printing, washing, and customized finishes.',
    'products.children.title': "Children's<br>apparel.",
    'products.adult.title': "Adult's<br>apparel.",
    'products.next.title': "Next step.",
    'products.next.lead': "Tell us what you need — we'll come back with category fit, MOQs, lead time and a sample plan.",
    'products.next.cta_whatsapp': 'Chat on WhatsApp',
    'products.next.cta_form': 'Send a Project Brief',
    /* about — hero */
    'about.hero.title': "Leading manufacturer for children's apparel in China",
    'about.hero.p1': 'We specialises in a wide range of apparel selections, including but not limited to children\'s wear, knitwear, sportwear and denim. Our products blend style, comfort, and durability, and meet the needs of various ages and communities.',
    'about.hero.p2': 'Our facility, equipped with 100,000+ m² base, 500+ skilled workers, and 100+ sewing and knitting machines, ensures efficiency and adherence to strict product standards.',
    /* about — Core features */
    'about.features.title': 'Core features.',
    'about.features.lead': 'Five steps that take a brief from sample to shipment.',
    'about.f01.num': '01 / DEVELOPMENT & SAMPLING',
    'about.f01.body': 'Pattern, fabric, trims, construction, fit and pre-production confirmation.',
    'about.f02.num': '02 / ORDER BUDGET & PLANNING',
    'about.f02.body': 'Production plans based on customised design, quantity, quality standards, target price, and required delivery schedule.',
    'about.f03.num': '03 / ORDER FOLLOW-UP',
    'about.f03.body': 'Monitor production progress, communicate key milestones, and manage timelines.',
    'about.f04.num': '04 / INDEPENDENT QC & PACKING',
    'about.f04.body': 'Inspections throughout production and customised packing.',
    'about.f05.num': '05 / SHIPPING & EXPORT SUPPORT',
    'about.f05.body': 'Coordinate export documentation, shipping, and logistics to ensure finished garments are delivered safely.',
    /* about — Facility */
    'about.facility.title': 'Inside our<br>facility.',
    'about.facility.lead': 'Snapshots of our production base.',
    'about.facility.fig01': '100,000+ m² Factory',
    'about.facility.fig02': 'Machinery',
    'about.facility.fig03': 'Line workers',
    'about.facility.fig04': 'Manual workers',
    /* contact — hero */
    'contact.hero.title': "Let's start<br>your project.",
    'contact.hero.lead': 'A direct gateway to specialised garment manufacturing in China — over 30 years of experience, integrated production, and full OEM/ODM support.',
    /* contact — Find us */
    'contact.find.title': 'Find us.',
    'contact.find.lead': 'Headquartered in Foshan Children\'s Clothing City, Guangdong, China — the heart of China\'s garment manufacturing base.',
    'contact.find.location_label': 'Location',
    'contact.find.location_value': 'Foshan Children\'s Clothing City, Guangdong, China',
    'contact.find.contact_label': 'Contact No',
    'contact.find.contact_value': '+86 75786222188',
    'contact.find.email_label': 'Email Address',
    /* contact — Send message */
    'contact.message.title': 'Send message.',
    'contact.message.lead': "Drop your details and a brief description — we'll reply with category fit, lead time and next steps.",
    'contact.form.name_label': 'Name',
    'contact.form.name_placeholder': 'Your full name',
    'contact.form.email_label': 'Email',
    'contact.form.email_placeholder': 'you@company.com',
    'contact.form.phone_label': 'Phone No / WhatsApp',
    'contact.form.phone_placeholder': '+86 0000 0000 or WhatsApp number',
    'contact.form.message_label': 'Message',
    'contact.form.message_placeholder': 'Tell us about your product, quantities, target price and timeline.',
    'contact.form.submit': 'Send Message',
    'contact.form.note': 'Demo form — does not submit. Wire to backend endpoint before launch.',
    /* footer */
    'footer.tagline.p1': 'TOMOLI is a leading children\'s apparel manufacturer with a 100,000+ m² production base and 500+ skilled workers.',
    'footer.tagline.p2': 'We specialize in children\'s wear, knitwear, sportswear, denim, and other custom garments, offering diverse fabrics, prints, and finishes that combine style, comfort, and durability.',
    'footer.tagline.p3': 'We\'ve worked with 100+ clients across 20+ countries — from big-box retailers to boutique brands — and we\'re set up to do the same for you.',
    'footer.navigate': 'Navigate',
    'footer.categories': 'Categories',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 TOMOLI. All rights reserved.',
    'footer.disclaimer': 'Privacy · Terms · Placeholder contact details',
    /* floating */
    'floating.whatsapp': 'Chat on WhatsApp',
    /* skip link */
    'skip.link': 'Skip to content',
    /* language switcher */
    'lang.label': 'Language'
  },

  id: {
    'meta.title': 'TOMOLI | Gerbang Langsung Anda ke Manufaktur Garmen',
    'meta.desc.home': 'Terhubung dengan pabrik garmen Foshan untuk pakaian anak, pakaian dewasa, pakaian olahraga, pakaian rajut, dan lainnya. Dukungan OEM/ODM sejak tahun 2000.',
    'meta.desc.products': 'Kategori manufaktur pakaian anak dan dewasa dari TOMOLI.',
    'meta.desc.about': 'Produsen terkemuka pakaian anak di China dengan pengalaman 30+ tahun, basis pabrik 100.000+ m², dan kemampuan OEM/ODM penuh.',
    'meta.desc.contact': 'Hubungi TOMOLI di Foshan, Guangdong, China.',
    'utility.text': 'Guangdong, China · OEM / ODM Global',
    'nav.home': 'Beranda',
    'nav.products': 'Produk',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
    'menu_open': 'MENU',
    'menu_close': 'TUTUP',
    'header.whatsapp': 'WhatsApp',
    'header.start_project': 'Mulai Proyek',
    'home.hero.eyebrow': 'Guangdong, China',
    'home.hero.title': 'Produsen Pakaian Anak One-Stop di China',
    'home.hero.lead': 'Solusi one-stop untuk kebutuhan pakaian anak dengan keahlian manufaktur 30+ tahun, MOQ fleksibel, dan kontrol kualitas independen.',
    'why.eyebrow': 'Mengapa kami',
    'why.title': 'Mengapa merek<br>memilih kami.',
    'why.lead': 'Rantai pasok terintegrasi. Harga kompetitif. Volume fleksibel. Kontrol kualitas ketat.',
    'why.01.num': '01 / RANTAI PASOK TERINTEGRASI',
    'why.01.body': 'Kami menyediakan sourcing yang lebih cepat dan berbiaya lebih rendah di dekat Pasar Tekstil Zhongda. Layanan one-stop kami mencakup sampling, produksi, inspeksi, pengemasan, dan ekspor.',
    'why.02.num': '02 / HARGA KOMPETITIF',
    'why.02.body': 'Rantai pasok terintegrasi kami mengurangi biaya sourcing dan produksi. Kami menyediakan solusi fleksibel yang disesuaikan dengan kebutuhan dan anggaran Anda.',
    'why.03.num': '03 / VOLUME PRODUKSI FLEKSIBEL',
    'why.03.body': 'Kami menangani batch kecil dan pesanan besar. MOQ fleksibel, tim berpengalaman, dan kapasitas stabil memenuhi berbagai kebutuhan produksi.',
    'why.04.num': '04 / PROSES & KONTROL KUALITAS',
    'why.04.body': 'Sistem kontrol independen kami memastikan kualitas konsisten. Inspeksi ketat, jadwal jelas, dan pembaruan rutin menjaga setiap pesanan tetap sesuai rencana.',
    'offer.eyebrow': 'Apa yang kami tawarkan',
    'offer.title': 'Dari konsep<br>hingga pengiriman.',
    'offer.lead': 'Manufaktur garmen lengkap dari pengembangan hingga ekspor.',
    'offer.01.num': '01 / 30+ TAHUN KEAHLIAN',
    'offer.01.body': 'Lebih dari 30 tahun keahlian manufaktur garmen, didukung oleh craftsmanship terampil dan manajemen produksi yang andal.',
    'offer.02.num': '02 / SPESIALISASI PRODUK',
    'offer.02.body': 'Mengkhususkan diri dalam pakaian anak dan dewasa, termasuk pakaian rajut, pakaian olahraga, denim, dan kategori garmen kustom.',
    'offer.03.num': '03 / KEMAMPUAN OEM & ODM',
    'offer.03.body': 'Layanan OEM dan ODM fleksibel yang mencakup pengembangan produk, sourcing kain, sampling, kustomisasi, produksi massal, dan pengemasan.',
    'offer.04.num': '04 / KAPASITAS PRODUKSI',
    'offer.04.body': 'Basis 100.000+ m², 500+ pekerja terampil, dan 100+ mesin modern kami memastikan kualitas konsisten, fleksibilitas, dan pengiriman yang andal.',
    'social.eyebrow': 'Ruang media sosial',
    'social.title': 'Di dalam<br>lantai produksi.',
    'social.lead': 'Pembaruan langsung dari lantai pabrik.',
    'social.linkedin.handle': 'Handle to be configured',
    'social.linkedin.follow': 'Ikuti di LinkedIn →',
    'social.instagram.handle': '@tomoli_chinakidswear',
    'social.instagram.follow': 'Ikuti di Instagram →',
    'products.hero.title': 'Dari Kain hingga Finishing Beragam',
    'products.hero.lead': 'Kami mengkhususkan diri dalam pakaian anak, pakaian rajut, pakaian olahraga, denim, dan garmen kustom. Kami menawarkan beragam kain, warna, cetakan trendi, pola, dan teknik seperti bordir, pencetakan, pencucian, dan finishing kustom.',
    'products.children.title': 'Pakaian<br>anak.',
    'products.adult.title': 'Pakaian<br>dewasa.',
    'products.next.title': 'Langkah berikutnya.',
    'products.next.lead': 'Beri tahu kami kebutuhan Anda — kami akan kembali dengan kecocokan kategori, MOQ, waktu tunggu, dan rencana sampel.',
    'products.next.cta_whatsapp': 'Ngobrol di WhatsApp',
    'products.next.cta_form': 'Kirim Brief Proyek',
    'about.hero.title': 'Produsen terkemuka pakaian anak di China',
    'about.hero.p1': 'Kami mengkhususkan diri dalam berbagai pilihan pakaian, termasuk namun tidak terbatas pada pakaian anak, pakaian rajut, pakaian olahraga, dan denim. Produk kami memadukan gaya, kenyamanan, dan daya tahan, memenuhi kebutuhan berbagai usia dan komunitas.',
    'about.hero.p2': 'Fasilitas kami, dilengkapi dengan basis 100.000+ m², 500+ pekerja terampil, dan 100+ mesin jahit dan rajut, memastikan efisiensi dan kepatuhan terhadap standar produk yang ketat.',
    'about.features.title': 'Fitur inti.',
    'about.features.lead': 'Lima langkah yang membawa brief dari sampel hingga pengiriman.',
    'about.f01.num': '01 / PENGEMBANGAN & SAMPLING',
    'about.f01.body': 'Pola, kain, aksesori, konstruksi, fit, dan konfirmasi pra-produksi.',
    'about.f02.num': '02 / ANGGARAN & PERENCANAAN PESANAN',
    'about.f02.body': 'Rencana produksi berdasarkan desain kustom, kuantitas, standar kualitas, harga target, dan jadwal pengiriman yang dibutuhkan.',
    'about.f03.num': '03 / TINDAK LANJUT PESANAN',
    'about.f03.body': 'Memantau kemajuan produksi, mengkomunikasikan tonggak utama, dan mengelola jadwal.',
    'about.f04.num': '04 / QC INDEPENDEN & PACKING',
    'about.f04.body': 'Inspeksi sepanjang produksi dan packing kustom.',
    'about.f05.num': '05 / SHIPPING & DUKUNGAN EKSPOR',
    'about.f05.body': 'Mengoordinasikan dokumentasi ekspor, pengiriman, dan logistik untuk memastikan garmen jadi dikirim dengan aman.',
    'about.facility.title': 'Di dalam<br>fasilitas kami.',
    'about.facility.lead': 'Snapshot basis produksi kami.',
    'about.facility.fig01': 'Pabrik 100.000+ m²',
    'about.facility.fig02': 'Mesin',
    'about.facility.fig03': 'Pekerja lini',
    'about.facility.fig04': 'Pekerja manual',
    'contact.hero.title': 'Mari mulai<br>proyek Anda.',
    'contact.hero.lead': 'Gerbang langsung ke manufaktur garmen khusus di China — lebih dari 30 tahun pengalaman, produksi terintegrasi, dan dukungan OEM/ODM penuh.',
    'contact.find.title': 'Temukan kami.',
    'contact.find.lead': 'Berkantor pusat di Foshan Children\'s Clothing City, Guangdong, China — jantung basis manufaktur garmen China.',
    'contact.find.location_label': 'Lokasi',
    'contact.find.location_value': 'Foshan Children\'s Clothing City, Guangdong, China',
    'contact.find.contact_label': 'No. Kontak',
    'contact.find.contact_value': '+86 75786222188',
    'contact.find.email_label': 'Alamat Email',
    'contact.message.title': 'Kirim pesan.',
    'contact.message.lead': 'Kirimkan detail Anda dan deskripsi singkat — kami akan menjawab dengan kecocokan kategori, waktu tunggu, dan langkah selanjutnya.',
    'contact.form.name_label': 'Nama',
    'contact.form.name_placeholder': 'Nama lengkap Anda',
    'contact.form.email_label': 'Email',
    'contact.form.email_placeholder': 'anda@perusahaan.com',
    'contact.form.phone_label': 'No. Telepon / WhatsApp',
    'contact.form.phone_placeholder': '+86 0000 0000 atau nomor WhatsApp',
    'contact.form.message_label': 'Pesan',
    'contact.form.message_placeholder': 'Ceritakan tentang produk, kuantitas, harga target, dan jadwal Anda.',
    'contact.form.submit': 'Kirim Pesan',
    'contact.form.note': 'Formulir demo — tidak terkirim. Hubungkan ke endpoint backend sebelum peluncuran.',
    'footer.tagline.p1': 'TOMOLI adalah produsen pakaian anak terkemuka dengan basis produksi 100.000+ m² dan 500+ pekerja terampil.',
    'footer.tagline.p2': 'Kami mengkhususkan diri dalam pakaian anak, pakaian rajut, pakaian olahraga, denim, dan garmen kustom lainnya, menawarkan beragam kain, cetakan, dan finishing yang memadukan gaya, kenyamanan, dan daya tahan.',
    'footer.tagline.p3': 'Kami telah bekerja dengan 100+ klien di 20+ negara — dari retailer besar hingga merek butik — dan kami siap melakukan hal yang sama untuk Anda.',
    'footer.navigate': 'Navigasi',
    'footer.categories': 'Kategori',
    'footer.contact': 'Kontak',
    'footer.copyright': '© 2026 TOMOLI. Hak cipta dilindungi.',
    'footer.disclaimer': 'Privasi · Ketentuan · Detail kontak placeholder',
    'floating.whatsapp': 'Ngobrol di WhatsApp',
    'skip.link': 'Lewati ke konten',
    'lang.label': 'Bahasa'
  },

  th: {
    'meta.title': 'TOMOLI | ประตูตรงของคุณสู่การผลิตเสื้อผ้า',
    'meta.desc.home': 'เชื่อมต่อกับโรงงานเสื้อผ้า Foshan สำหรับเสื้อผ้าเด็ก เสื้อผ้าผู้ใหญ่ ชุดกีฬา เสื้อผ้าถัก และอื่นๆ รองรับ OEM/ODM ตั้งแต่ปี 2000',
    'meta.desc.products': 'หมวดหมู่การผลิตเสื้อผ้าเด็กและผู้ใหญ่จาก TOMOLI',
    'meta.desc.about': 'ผู้ผลิตเสื้อผ้าเด็กชั้นนำในจีน ด้วยประสบการณ์ 30+ ปี ฐานโรงงาน 100,000+ ตร.ม. และความสามารถ OEM/ODM ครบวงจร',
    'meta.desc.contact': 'ติดต่อ TOMOLI ใน Foshan มณฑลกว่างตง ประเทศจีน',
    'utility.text': 'กว่างตง ประเทศจีน · OEM / ODM ระดับโลก',
    'nav.home': 'หน้าแรก',
    'nav.products': 'ผลิตภัณฑ์',
    'nav.about': 'เกี่ยวกับ',
    'nav.contact': 'ติดต่อ',
    'menu_open': 'เมนู',
    'menu_close': 'ปิด',
    'header.whatsapp': 'WhatsApp',
    'header.start_project': 'เริ่มโครงการ',
    'home.hero.eyebrow': 'กว่างตง ประเทศจีน',
    'home.hero.title': 'ผู้ผลิตเสื้อผ้าเด็กแบบครบวงจรในจีน',
    'home.hero.lead': 'โซลูชันครบวงจรสำหรับความต้องการเสื้อผ้าเด็ก ด้วยประสบการณ์การผลิตกว่า 30 ปี MOQ ที่ยืดหยุ่น และการควบคุมคุณภาพอิสระ',
    'why.eyebrow': 'ทำไมเลือกเรา',
    'why.title': 'ทำไมแบรนด์<br>เลือกเรา',
    'why.lead': 'ห่วงโซ่อุปทานแบบบูรณาการ ราคาแข่งขันได้ ปริมาณยืดหยุ่น ควบคุมคุณภาพเข้มงวด',
    'why.01.num': '01 / ห่วงโซ่อุปทานแบบบูรณาการ',
    'why.01.body': 'เรานำเสนอการจัดหาที่เร็วขึ้นและต้นทุนต่ำกว่าใกล้ตลาดสิ่งทอจงดา บริการครบวงจรของเราครอบคลุมการทำตัวอย่าง การผลิต การตรวจสอบ การบรรจุ และการส่งออก',
    'why.02.num': '02 / ราคาแข่งขัน',
    'why.02.body': 'ห่วงโซ่อุปทานแบบบูรณาการของเราช่วยลดต้นทุนการจัดหาและการผลิต เราให้โซลูชันที่ยืดหยุ่นตามความต้องการและงบประมาณของคุณ',
    'why.03.num': '03 / ปริมาณการผลิตที่ยืดหยุ่น',
    'why.03.body': 'เรารับทั้งล็อตเล็กและคำสั่งซื้อจำนวนมาก MOQ ที่ยืดหยุ่น ทีมงานที่มีประสบการณ์ และกำลังการผลิตที่มั่นคง',
    'why.04.num': '04 / กระบวนการและการควบคุมคุณภาพ',
    'why.04.body': 'ระบบควบคุมอิสระของเรารับประกันคุณภาพที่สม่ำเสมอ การตรวจสอบอย่างเข้มงวด ไทม์ไลน์ที่ชัดเจน และการอัปเดตอย่างสม่ำเสมอ',
    'offer.eyebrow': 'สิ่งที่เรานำเสนอ',
    'offer.title': 'จากแนวคิด<br>สู่การจัดส่ง',
    'offer.lead': 'การผลิตเสื้อผ้าครบวงจรตั้งแต่การพัฒนาจนถึงการส่งออก',
    'offer.01.num': '01 / ประสบการณ์ 30+ ปี',
    'offer.01.body': 'ประสบการณ์การผลิตเสื้อผ้ามากกว่า 30 ปี สนับสนุนด้วยฝีมือที่เชี่ยวชาญและการจัดการการผลิตที่เชื่อถือได้',
    'offer.02.num': '02 / ความเชี่ยวชาญด้านผลิตภัณฑ์',
    'offer.02.body': 'เชี่ยวชาญด้านเสื้อผ้าเด็กและผู้ใหญ่ รวมถึงเสื้อผ้าถัก ชุดกีฬา เดนิม และหมวดหมู่เสื้อผ้าที่กำหนดเอง',
    'offer.03.num': '03 / ความสามารถ OEM และ ODM',
    'offer.03.body': 'บริการ OEM และ ODM ที่ยืดหยุ่น ครอบคลุมการพัฒนาผลิตภัณฑ์ การจัดหาผ้า การทำตัวอย่าง การปรับแต่ง การผลิตจำนวนมาก และการบรรจุ',
    'offer.04.num': '04 / กำลังการผลิต',
    'offer.04.body': 'ฐาน 100,000+ ตร.ม. คนงานมากกว่า 500 คน และเครื่องจักรสมัยใหม่กว่า 100 เครื่อง รับประกันคุณภาพ ความยืดหยุ่น และการจัดส่งที่เชื่อถือได้',
    'social.eyebrow': 'ห้องข่าวโซเชียลมีเดีย',
    'social.title': 'ภายใน<br>พื้นที่การผลิต',
    'social.lead': 'อัปเดตสดจากพื้นที่โรงงาน',
    'social.linkedin.handle': 'รอการตั้งค่า handle',
    'social.linkedin.follow': 'ติดตามบน LinkedIn →',
    'social.instagram.handle': '@tomoli_chinakidswear',
    'social.instagram.follow': 'ติดตามบน Instagram →',
    'products.hero.title': 'จากผ้าสู่การตกแต่งที่หลากหลาย',
    'products.hero.lead': 'เราเชี่ยวชาญด้านเสื้อผ้าเด็ก เสื้อผ้าถัก ชุดกีฬา เดนิม และเสื้อผ้าที่กำหนดเอง เรามีผ้า สี ลายพิมพ์ และเทคนิคที่หลากหลาย เช่น การปัก การพิมพ์ การซัก และการตกแต่งตามแบบ',
    'products.children.title': 'เสื้อผ้า<br>เด็ก',
    'products.adult.title': 'เสื้อผ้า<br>ผู้ใหญ่',
    'products.next.title': 'ขั้นตอนถัดไป',
    'products.next.lead': 'บอกเราว่าคุณต้องการอะไร — เราจะกลับมาพร้อมความเหมาะสมของหมวดหมู่ MOQ ระยะเวลา และแผนการทำตัวอย่าง',
    'products.next.cta_whatsapp': 'แชทบน WhatsApp',
    'products.next.cta_form': 'ส่งข้อมูลโครงการ',
    'about.hero.title': 'ผู้ผลิตเสื้อผ้าเด็กชั้นนำในจีน',
    'about.hero.p1': 'เราเชี่ยวชาญในตัวเลือกเสื้อผ้าที่หลากหลาย รวมถึงเสื้อผ้าเด็ก เสื้อผ้าถัก ชุดกีฬา และเดนิม ผลิตภัณฑ์ของเราผสมผสานสไตล์ ความสบาย และความทนทาน',
    'about.hero.p2': 'โรงงานของเรามีพื้นที่ 100,000+ ตร.ม. คนงานมากกว่า 500 คน และเครื่องจักรเย็บและถักกว่า 100 เครื่อง',
    'about.features.title': 'คุณสมบัติหลัก',
    'about.features.lead': 'ห้าขั้นตอนที่นำข้อมูลจากตัวอย่างไปสู่การจัดส่ง',
    'about.f01.num': '01 / การพัฒนาและการทำตัวอย่าง',
    'about.f01.body': 'แพทเทิร์น ผ้า อุปกรณ์ตกแต่ง โครงสร้าง การพอดี และการยืนยันก่อนการผลิต',
    'about.f02.num': '02 / งบประมาณและการวางแผนคำสั่งซื้อ',
    'about.f02.body': 'แผนการผลิตตามการออกแบบที่กำหนดเอง ปริมาณ มาตรฐานคุณภาพ ราคาเป้าหมาย และกำหนดการจัดส่ง',
    'about.f03.num': '03 / ติดตามคำสั่งซื้อ',
    'about.f03.body': 'ตรวจสอบความคืบหน้าการผลิต สื่อสารเหตุการณ์สำคัญ และจัดการไทม์ไลน์',
    'about.f04.num': '04 / QC อิสระและการบรรจุ',
    'about.f04.body': 'การตรวจสอบตลอดการผลิตและการบรรจุแบบกำหนดเอง',
    'about.f05.num': '05 / การส่งออกและการสนับสนุน',
    'about.f05.body': 'ประสานเอกสารการส่งออก การขนส่ง และโลจิสติกส์เพื่อให้แน่ใจว่าเสื้อผ้าสำเร็จรูปถูกส่งมอบอย่างปลอดภัย',
    'about.facility.title': 'ภายใน<br>โรงงานของเรา',
    'about.facility.lead': 'ภาพตัวอย่างของฐานการผลิตของเรา',
    'about.facility.fig01': 'โรงงาน 100,000+ ตร.ม.',
    'about.facility.fig02': 'เครื่องจักร',
    'about.facility.fig03': 'คนงานสายการผลิต',
    'about.facility.fig04': 'คนงานฝีมือ',
    'contact.hero.title': 'มาเริ่ม<br>โครงการของคุณ',
    'contact.hero.lead': 'ประตูตรงสู่การผลิตเสื้อผ้าเฉพาะทางในจีน — ประสบการณ์กว่า 30 ปี การผลิตแบบบูรณาการ และการสนับสนุน OEM/ODM เต็มรูปแบบ',
    'contact.find.title': 'ค้นหาเรา',
    'contact.find.lead': 'สำนักงานใหญ่ตั้งอยู่ใน Foshan Children\'s Clothing City มณฑลกว่างตง ประเทศจีน — หัวใจของฐานการผลิตเสื้อผ้าของจีน',
    'contact.find.location_label': 'ที่ตั้ง',
    'contact.find.location_value': 'Foshan Children\'s Clothing City มณฑลกว่างตง ประเทศจีน',
    'contact.find.contact_label': 'เบอร์โทรศัพท์',
    'contact.find.contact_value': '+86 75786222188',
    'contact.find.email_label': 'ที่อยู่อีเมล',
    'contact.message.title': 'ส่งข้อความ',
    'contact.message.lead': 'ส่งรายละเอียดและคำอธิบายสั้นๆ ของคุณ — เราจะตอบกลับพร้อมความเหมาะสมของหมวดหมู่ ระยะเวลา และขั้นตอนถัดไป',
    'contact.form.name_label': 'ชื่อ',
    'contact.form.name_placeholder': 'ชื่อเต็มของคุณ',
    'contact.form.email_label': 'อีเมล',
    'contact.form.email_placeholder': 'คุณ@บริษัท.com',
    'contact.form.phone_label': 'เบอร์โทร / WhatsApp',
    'contact.form.phone_placeholder': '+86 0000 0000 หรือเบอร์ WhatsApp',
    'contact.form.message_label': 'ข้อความ',
    'contact.form.message_placeholder': 'บอกเราเกี่ยวกับผลิตภัณฑ์ ปริมาณ ราคาเป้าหมาย และระยะเวลาของคุณ',
    'contact.form.submit': 'ส่งข้อความ',
    'contact.form.note': 'แบบฟอร์มสาธิต — ไม่ได้ส่งจริง โปรดเชื่อมต่อกับ backend endpoint ก่อนใช้งานจริง',
    'footer.tagline.p1': 'TOMOLI เป็นผู้ผลิตเสื้อผ้าเด็กชั้นนำด้วยฐานการผลิต 100,000+ ตร.ม. และคนงานมากกว่า 500 คน',
    'footer.tagline.p2': 'เราเชี่ยวชาญด้านเสื้อผ้าเด็ก เสื้อผ้าถัก ชุดกีฬา เดนิม และเสื้อผ้าที่กำหนดเองอื่นๆ',
    'footer.tagline.p3': 'เราทำงานกับลูกค้ามากกว่า 100 รายในกว่า 20 ประเทศ — ตั้งแต่ร้านค้าปลีกขนาดใหญ่ไปจนถึงแบรนด์บูติก — และเราพร้อมทำเช่นเดียวกันให้คุณ',
    'footer.navigate': 'นำทาง',
    'footer.categories': 'หมวดหมู่',
    'footer.contact': 'ติดต่อ',
    'footer.copyright': '© 2026 TOMOLI สงวนลิขสิทธิ์',
    'footer.disclaimer': 'ความเป็นส่วนตัว · ข้อกำหนด · รายละเอียดการติดต่อตัวอย่าง',
    'floating.whatsapp': 'แชทบน WhatsApp',
    'skip.link': 'ข้ามไปยังเนื้อหา',
    'lang.label': 'ภาษา'
  },

  ru: {
    'meta.title': 'TOMOLI | Прямой путь к производству одежды',
    'meta.desc.home': 'Прямой контакт с швейными фабриками Фошань: детская и взрослая одежда, спортивная одежда, трикотаж и многое другое. Поддержка OEM/ODM с 2000 года.',
    'meta.desc.products': 'Категории производства детской и взрослой одежды от TOMOLI.',
    'meta.desc.about': 'Ведущий производитель детской одежды в Китае с опытом 30+ лет, фабричной базой 100 000+ м² и полным спектром OEM/ODM.',
    'meta.desc.contact': 'Свяжитесь с TOMOLI в Фошане, провинция Гуандун, Китай.',
    'utility.text': 'Гуандун, Китай · Глобальный OEM / ODM',
    'nav.home': 'Главная',
    'nav.products': 'Продукция',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'menu_open': 'МЕНЮ',
    'menu_close': 'ЗАКРЫТЬ',
    'header.whatsapp': 'WhatsApp',
    'header.start_project': 'Начать проект',
    'home.hero.eyebrow': 'Гуандун, Китай',
    'home.hero.title': 'Комплексный производитель детской одежды в Китае',
    'home.hero.lead': 'Комплексное решение для детской одежды с более чем 30-летним опытом производства, гибкими MOQ и независимым контролем качества.',
    'why.eyebrow': 'Почему мы',
    'why.title': 'Почему бренды<br>выбирают нас.',
    'why.lead': 'Интегрированная цепочка поставок. Конкурентные цены. Гибкие объёмы. Строгий контроль качества.',
    'why.01.num': '01 / ИНТЕГРИРОВАННАЯ ЦЕПОЧКА ПОСТАВОК',
    'why.01.body': 'Мы предлагаем более быстрые и дешёвые поставки рядом с текстильным рынком Чжунда. Наши комплексные услуги охватывают образцы, производство, контроль, упаковку и экспорт.',
    'why.02.num': '02 / КОНКУРЕНТНЫЕ ЦЕНЫ',
    'why.02.body': 'Наша интегрированная цепочка поставок снижает затраты на материалы и производство. Мы предлагаем гибкие решения под ваши требования и бюджет.',
    'why.03.num': '03 / ГИБКИЕ ОБЪЁМЫ ПРОИЗВОДСТВА',
    'why.03.body': 'Работаем как с малыми партиями, так и с крупными заказами. Гибкие MOQ, опытные команды и стабильные мощности.',
    'why.04.num': '04 / ПРОЦЕСС И КОНТРОЛЬ КАЧЕСТВА',
    'why.04.body': 'Наша независимая система контроля обеспечивает стабильное качество. Строгие проверки, чёткие сроки и регулярные обновления.',
    'offer.eyebrow': 'Что мы предлагаем',
    'offer.title': 'От концепции<br>до отгрузки.',
    'offer.lead': 'Полный цикл производства одежды от разработки до экспорта.',
    'offer.01.num': '01 / 30+ ЛЕТ ОПЫТА',
    'offer.01.body': 'Более 30 лет экспертизы в производстве одежды, поддержанной мастерством и надёжным управлением.',
    'offer.02.num': '02 / СПЕЦИАЛИЗАЦИЯ ПРОДУКЦИИ',
    'offer.02.body': 'Специализируемся на детской и взрослой одежде, включая трикотаж, спортивную одежду, деним и индивидуальные категории.',
    'offer.03.num': '03 / ВОЗМОЖНОСТИ OEM И ODM',
    'offer.03.body': 'Гибкие OEM и ODM услуги: разработка продукта, подбор тканей, образцы, кастомизация, серийное производство и упаковка.',
    'offer.04.num': '04 / ПРОИЗВОДСТВЕННЫЕ МОЩНОСТИ',
    'offer.04.body': 'База 100 000+ м², более 500 квалифицированных рабочих и более 100 современных машин обеспечивают стабильное качество и надёжные поставки.',
    'social.eyebrow': 'Новостная студия соцсетей',
    'social.title': 'Внутри<br>производства.',
    'social.lead': 'Прямые обновления с фабричного пола.',
    'social.linkedin.handle': 'Handle to be configured',
    'social.linkedin.follow': 'Подписаться на LinkedIn →',
    'social.instagram.handle': '@tomoli_chinakidswear',
    'social.instagram.follow': 'Подписаться на Instagram →',
    'products.hero.title': 'От ткани к разнообразным отделкам',
    'products.hero.lead': 'Мы специализируемся на детской одежде, трикотаже, спортивной одежде, дениме и одежде на заказ. Разнообразные ткани, цвета, трендовые принты, узоры и техники: вышивка, печать, стирка и индивидуальные отделки.',
    'products.children.title': 'Детская<br>одежда.',
    'products.adult.title': 'Взрослая<br>одежда.',
    'products.next.title': 'Следующий шаг.',
    'products.next.lead': 'Расскажите, что вам нужно — мы вернёмся с подбором категорий, MOQ, сроками и планом образцов.',
    'products.next.cta_whatsapp': 'Чат в WhatsApp',
    'products.next.cta_form': 'Отправить бриф',
    'about.hero.title': 'Ведущий производитель детской одежды в Китае',
    'about.hero.p1': 'Мы специализируемся на широком ассортименте одежды, включая детскую одежду, трикотаж, спортивную одежду и деним. Наши изделия сочетают стиль, комфорт и долговечность.',
    'about.hero.p2': 'Наша фабрика с базой 100 000+ м², более 500 квалифицированными рабочими и более 100 швейными и трикотажными машинами обеспечивает эффективность и соответствие строгим стандартам.',
    'about.features.title': 'Ключевые особенности.',
    'about.features.lead': 'Пять шагов от брифа до отгрузки.',
    'about.f01.num': '01 / РАЗРАБОТКА И ОБРАЗЦЫ',
    'about.f01.body': 'Лекала, ткани, фурнитура, конструкция, посадка и подтверждение перед производством.',
    'about.f02.num': '02 / БЮДЖЕТ И ПЛАНИРОВАНИЕ ЗАКАЗА',
    'about.f02.body': 'План производства на основе индивидуального дизайна, количества, стандартов качества, целевой цены и графика поставки.',
    'about.f03.num': '03 / СОПРОВОЖДЕНИЕ ЗАКАЗА',
    'about.f03.body': 'Мониторинг прогресса, коммуникация ключевых этапов и управление сроками.',
    'about.f04.num': '04 / НЕЗАВИСИМЫЙ QC И УПАКОВКА',
    'about.f04.body': 'Проверки в течение производства и индивидуальная упаковка.',
    'about.f05.num': '05 / ОТГРУЗКА И ЭКСПОРТ',
    'about.f05.body': 'Координация экспортной документации, отгрузки и логистики для безопасной доставки готовой продукции.',
    'about.facility.title': 'Внутри нашей<br>фабрики.',
    'about.facility.lead': 'Кадры нашей производственной базы.',
    'about.facility.fig01': 'Фабрика 100 000+ м²',
    'about.facility.fig02': 'Оборудование',
    'about.facility.fig03': 'Линейные рабочие',
    'about.facility.fig04': 'Ручной труд',
    'contact.hero.title': 'Давайте начнём<br>ваш проект.',
    'contact.hero.lead': 'Прямой путь к специализированному производству одежды в Китае — более 30 лет опыта, интегрированное производство и полная поддержка OEM/ODM.',
    'contact.find.title': 'Найдите нас.',
    'contact.find.lead': 'Штаб-квартира в Foshan Children\'s Clothing City, провинция Гуандун, Китай — в сердце китайской швейной промышленности.',
    'contact.find.location_label': 'Адрес',
    'contact.find.location_value': 'Foshan Children\'s Clothing City, Гуандун, Китай',
    'contact.find.contact_label': 'Телефон',
    'contact.find.contact_value': '+86 75786222188',
    'contact.find.email_label': 'Электронная почта',
    'contact.message.title': 'Отправить сообщение.',
    'contact.message.lead': 'Оставьте свои данные и краткое описание — мы ответим с подбором категории, сроками и следующими шагами.',
    'contact.form.name_label': 'Имя',
    'contact.form.name_placeholder': 'Ваше полное имя',
    'contact.form.email_label': 'Email',
    'contact.form.email_placeholder': 'вы@компания.com',
    'contact.form.phone_label': 'Телефон / WhatsApp',
    'contact.form.phone_placeholder': '+86 0000 0000 или номер WhatsApp',
    'contact.form.message_label': 'Сообщение',
    'contact.form.message_placeholder': 'Расскажите о продукте, количестве, целевой цене и сроках.',
    'contact.form.submit': 'Отправить сообщение',
    'contact.form.note': 'Демо-форма — не отправляется. Подключите к backend перед запуском.',
    'footer.tagline.p1': 'TOMOLI — ведущий производитель детской одежды с производственной базой 100 000+ м² и более 500 квалифицированными рабочими.',
    'footer.tagline.p2': 'Мы специализируемся на детской одежде, трикотаже, спортивной одежде, дениме и другой одежде на заказ, предлагая разнообразные ткани, принты и отделки.',
    'footer.tagline.p3': 'Мы работали с более чем 100 клиентами в более чем 20 странах — от крупных ритейлеров до бутиковых брендов — и готовы сделать то же для вас.',
    'footer.navigate': 'Навигация',
    'footer.categories': 'Категории',
    'footer.contact': 'Контакты',
    'footer.copyright': '© 2026 TOMOLI. Все права защищены.',
    'footer.disclaimer': 'Конфиденциальность · Условия · Пример контактных данных',
    'floating.whatsapp': 'Чат в WhatsApp',
    'skip.link': 'Перейти к содержимому',
    'lang.label': 'Язык'
  },

  ar: {
    'meta.title': 'TOMOLI | بوابتك المباشرة لتصنيع الملابس',
    'meta.desc.home': 'تواصل مباشر مع مصانع الملابس في فوشان: ملابس الأطفال والكبار، الملابس الرياضية، التريكو، والمزيد. دعم OEM/ODM منذ عام 2000.',
    'meta.desc.products': 'فئات تصنيع ملابس الأطفال والكبار من TOMOLI.',
    'meta.desc.about': 'شركة رائدة في تصنيع ملابس الأطفال في الصين بخبرة تزيد عن 30 عامًا، وقاعدة مصنع تزيد عن 100,000+ م²، وقدرات OEM/ODM كاملة.',
    'meta.desc.contact': 'تواصل مع TOMOLI في فوشان، مقاطعة قوانغدونغ، الصين.',
    'utility.text': 'قوانغدونغ، الصين · OEM / ODM عالمي',
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'menu_open': 'القائمة',
    'menu_close': 'إغلاق',
    'header.whatsapp': 'WhatsApp',
    'header.start_project': 'ابدأ مشروعًا',
    'home.hero.eyebrow': 'قوانغدونغ، الصين',
    'home.hero.title': 'الشركة المصنعة الشاملة لملابس الأطفال في الصين',
    'home.hero.lead': 'حل شامل لاحتياجات ملابس الأطفال مع خبرة تصنيع تزيد عن 30 عامًا، وحد أدنى مرن للطلب، ومراقبة جودة مستقلة.',
    'why.eyebrow': 'لماذا نحن',
    'why.title': 'لماذا تختار<br>العلامات التجارية لنا',
    'why.lead': 'سلسلة توريد متكاملة. أسعار تنافسية. أحجام مرنة. رقابة صارمة على الجودة.',
    'why.01.num': '01 / سلسلة توريد متكاملة',
    'why.01.body': 'نقدم توريدًا أسرع وأقل تكلفة بالقرب من سوق تشونغدا للنسيج. تشمل خدماتنا الشاملة أخذ العينات والإنتاج والفحص والتغليف والتصدير.',
    'why.02.num': '02 / أسعار تنافسية',
    'why.02.body': 'تقلل سلسلة التوريد المتكاملة لدينا من تكاليف التوريد والإنتاج. نقدم حلولًا مرنة مصممة لمتطلباتك وميزانيتك.',
    'why.03.num': '03 / أحجام إنتاج مرنة',
    'why.03.body': 'نتعامل مع الدفعات الصغيرة والطلبات الكبيرة. الحد الأدنى المرن للطلب، فرق ذات خبرة، وقدرة إنتاجية ثابتة.',
    'why.04.num': '04 / العملية ومراقبة الجودة',
    'why.04.body': 'يضمن نظام المراقبة المستقل لدينا جودة ثابتة. عمليات تفتيش صارمة، جداول زمنية واضحة، وتحديثات منتظمة.',
    'offer.eyebrow': 'ماذا نقدم',
    'offer.title': 'من الفكرة<br>إلى الشحن',
    'offer.lead': 'تصنيع ملابس متكامل من التطوير إلى التصدير.',
    'offer.01.num': '01 / خبرة تزيد عن 30 عامًا',
    'offer.01.body': 'أكثر من 30 عامًا من الخبرة في تصنيع الملابس، مدعومة بحرفية ماهرة وإدارة إنتاج موثوقة.',
    'offer.02.num': '02 / تخصص المنتج',
    'offer.02.body': 'متخصصون في ملابس الأطفال والكبار، بما في ذلك التريكو والملابس الرياضية والدينم وفئات الملابس المخصصة.',
    'offer.03.num': '03 / قدرات OEM وODM',
    'offer.03.body': 'خدمات OEM وODM مرنة تغطي تطوير المنتج، وتوفير الأقمشة، وأخذ العينات، والتخصيص، والإنتاج بالجملة، والتعبئة.',
    'offer.04.num': '04 / الطاقة الإنتاجية',
    'offer.04.body': 'قاعدتنا البالغة 100,000+ م²، وأكثر من 500 عامل ماهر، وأكثر من 100 آلة حديثة تضمن جودة ثابتة ومرونة وتسليمًا موثوقًا.',
    'social.eyebrow': 'غرفة أخبار وسائل التواصل',
    'social.title': 'داخل<br>أرضية الإنتاج',
    'social.lead': 'تحديثات مباشرة من أرضية المصنع.',
    'social.linkedin.handle': 'سيتم تكوين الحساب',
    'social.linkedin.follow': 'تابعنا على LinkedIn →',
    'social.instagram.handle': '@tomoli_chinakidswear',
    'social.instagram.follow': 'تابعنا على Instagram →',
    'products.hero.title': 'من القماش إلى التشطيبات المتنوعة',
    'products.hero.lead': 'نتخصص في ملابس الأطفال والتريكو والملابس الرياضية والدينم والملابس المخصصة. نقدم أقمشة وألوانًا ومطبوعات عصرية وأنماطًا وتقنيات مثل التطريز والطباعة والغسيل والتشطيبات المخصصة.',
    'products.children.title': 'ملابس<br>الأطفال',
    'products.adult.title': 'ملابس<br>الكبار',
    'products.next.title': 'الخطوة التالية',
    'products.next.lead': 'أخبرنا بما تحتاجه — سنعود إليك بمطابقة الفئات، والحد الأدنى للطلب، والمهلة، وخطة العينات.',
    'products.next.cta_whatsapp': 'دردشة على WhatsApp',
    'products.next.cta_form': 'إرسال موجز المشروع',
    'about.hero.title': 'شركة رائدة في تصنيع ملابس الأطفال في الصين',
    'about.hero.p1': 'نتخصص في مجموعة واسعة من خيارات الملابس، بما في ذلك على سبيل المثال لا الحصر ملابس الأطفال والتريكو والملابس الرياضية والدينم. تمزج منتجاتنا بين الأناقة والراحة والمتانة.',
    'about.hero.p2': 'يضمن مصنعنا، المجهز بقاعدة 100,000+ م²، وأكثر من 500 عامل ماهر، وأكثر من 100 ماكينة خياطة وحياكة، الكفاءة والالتزام بمعايير المنتج الصارمة.',
    'about.features.title': 'الميزات الأساسية',
    'about.features.lead': 'خمس خطوات تنقل الموجز من العينة إلى الشحن.',
    'about.f01.num': '01 / التطوير وأخذ العينات',
    'about.f01.body': 'النمط، القماش، الإكسسوارات، البناء، المقاس، وتأكيد ما قبل الإنتاج.',
    'about.f02.num': '02 / ميزانية الطلب والتخطيط',
    'about.f02.body': 'خطط الإنتاج بناءً على التصميم المخصص والكمية ومعايير الجودة والسعر المستهدف وجدول التسليم المطلوب.',
    'about.f03.num': '03 / متابعة الطلب',
    'about.f03.body': 'مراقبة تقدم الإنتاج، والتواصل بشأن المعالم الرئيسية، وإدارة الجداول الزمنية.',
    'about.f04.num': '04 / فحص الجودة المستقل والتعبئة',
    'about.f04.body': 'عمليات التفتيش طوال الإنتاج والتعبئة المخصصة.',
    'about.f05.num': '05 / الشحن ودعم التصدير',
    'about.f05.body': 'تنسيق وثائق التصدير والشحن واللوجستيات لضمان تسليم الملابس الجاهزة بأمان.',
    'about.facility.title': 'داخل<br>مصنعنا',
    'about.facility.lead': 'لمحات من قاعدتنا الإنتاجية.',
    'about.facility.fig01': 'مصنع 100,000+ م²',
    'about.facility.fig02': 'الآلات',
    'about.facility.fig03': 'عمال خط الإنتاج',
    'about.facility.fig04': 'العمال اليدويون',
    'contact.hero.title': 'لنبدأ<br>مشروعك',
    'contact.hero.lead': 'بوابة مباشرة لتصنيع الملابس المتخصصة في الصين — أكثر من 30 عامًا من الخبرة، وإنتاج متكامل، ودعم كامل لـ OEM/ODM.',
    'contact.find.title': 'جدنا',
    'contact.find.lead': 'مقرنا الرئيسي في Foshan Children\'s Clothing City، مقاطعة قوانغدونغ، الصين — قلب قاعدة تصنيع الملابس في الصين.',
    'contact.find.location_label': 'الموقع',
    'contact.find.location_value': 'Foshan Children\'s Clothing City، قوانغدونغ، الصين',
    'contact.find.contact_label': 'رقم الاتصال',
    'contact.find.contact_value': '+86 75786222188',
    'contact.find.email_label': 'عنوان البريد الإلكتروني',
    'contact.message.title': 'إرسال رسالة',
    'contact.message.lead': 'أرسل بياناتك ووصفًا موجزًا — سنرد بمطابقة الفئة والمهلة والخطوات التالية.',
    'contact.form.name_label': 'الاسم',
    'contact.form.name_placeholder': 'اسمك الكامل',
    'contact.form.email_label': 'البريد الإلكتروني',
    'contact.form.email_placeholder': 'you@company.com',
    'contact.form.phone_label': 'الهاتف / WhatsApp',
    'contact.form.phone_placeholder': '+86 0000 0000 أو رقم WhatsApp',
    'contact.form.message_label': 'الرسالة',
    'contact.form.message_placeholder': 'أخبرنا عن منتجك والكميات والسعر المستهدف والجدول الزمني.',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.note': 'نموذج تجريبي — لا يُرسل. قم بتوصيله بنقطة نهاية خلفية قبل الإطلاق.',
    'footer.tagline.p1': 'TOMOLI هي شركة رائدة في تصنيع ملابس الأطفال بقاعدة إنتاج تزيد عن 100,000+ م² وأكثر من 500 عامل ماهر.',
    'footer.tagline.p2': 'نتخصص في ملابس الأطفال والتريكو والملابس الرياضية والدينم والملابس المخصصة الأخرى، نقدم أقمشة ومطبوعات وتشطيبات متنوعة تمزج بين الأناقة والراحة والمتانة.',
    'footer.tagline.p3': 'عملنا مع أكثر من 100 عميل في أكثر من 20 دولة — من تجار التجزئة الكبار إلى العلامات التجارية المتخصصة — ونحن مستعدون لفعل الشيء نفسه من أجلك.',
    'footer.navigate': 'التنقل',
    'footer.categories': 'الفئات',
    'footer.contact': 'اتصل',
    'footer.copyright': '© 2026 TOMOLI. جميع الحقوق محفوظة.',
    'footer.disclaimer': 'الخصوصية · الشروط · تفاصيل الاتصال المؤقتة',
    'floating.whatsapp': 'دردشة على WhatsApp',
    'skip.link': 'تخطي إلى المحتوى',
    'lang.label': 'اللغة'
  }
};

const SUPPORTED_LANGS = ['en', 'id', 'th', 'ru', 'ar'];
const RTL_LANGS = ['ar'];
const LANG_LABELS = { en: 'English', id: 'Bahasa Indonesia', th: 'ไทย', ru: 'Русский', ar: 'العربية' };

function currentLang() {
  return document.documentElement.lang || 'en';
}

function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  document.title = dict['meta.title'] || document.title;
  qsa('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  qsa('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  qsa('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });
  const sel = qs('#lang-select');
  if (sel && sel.value !== lang) sel.value = lang;
}

function initLanguage() {
  const sel = qs('#lang-select');
  if (!sel) return;
  sel.addEventListener('change', () => {
    applyLanguage(sel.value);
    try { localStorage.setItem('lang', sel.value); } catch (e) { /* private mode */ }
  });
  let saved = 'en';
  try { saved = localStorage.getItem('lang') || 'en'; } catch (e) { /* private mode */ }
  if (SUPPORTED_LANGS.includes(saved)) applyLanguage(saved);
}

/* ─────────────────────────────────────────────────────────────
   initReveals / initGallery / initForms / initWhatsApp unchanged
   ───────────────────────────────────────────────────────────── */

function initReveals() {
  const items = qsa('.reveal');
  if (!('IntersectionObserver' in window)) return items.forEach(x => x.classList.add('visible'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function initGallery() {
  const buttons = qsa('.filter-btn');
  const cards = qsa('[data-category]');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active'); button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    cards.forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  }));
  const lightbox = qs('.lightbox');
  if (!lightbox) return;
  const image = qs('img', lightbox);
  const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
  const openWith = source => {
    if (!source) return;
    image.src = source.src; image.alt = source.alt;
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false');
    qs('.lightbox-close', lightbox).focus();
  };
  cards.forEach(card => card.addEventListener('click', () => openWith(qs('img', card))));
  qsa('.product-card').forEach(card => {
    const source = qs('img', card);
    if (!source) return;
    card.addEventListener('click', () => openWith(source));
  });
  qs('.lightbox-close', lightbox).addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initForms() {
  qsa('.inquiry-form').forEach(form => {
    const category = new URLSearchParams(location.search).get('category');
    if (category && form.elements.category) form.elements.category.value = category;
  });
}

function initWhatsApp() {
  const { whatsappNumber: number, whatsappMessage: message } = SITE_CONFIG;
  qsa('[data-whatsapp]').forEach(el => {
    if (!number) { el.href = 'contact.html'; return; }
    let url = `https://wa.me/${number}`;
    if (message) url += `?text=${encodeURIComponent(message)}`;
    el.href = url;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();   // must run first so menu button reads "MENU" in current lang
  initNavigation();
  initReveals();
  initGallery();
  initForms();
  initWhatsApp();
});
