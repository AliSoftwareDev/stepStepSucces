# 🚀 Adım Adım Başarı (Step by Step Success)

Bu proje, 1'den 50'ye kadar uzanan dinamik bir **S-Yolu (Yılan Dizilimi - Zigzag Parkur)** üzerinde, `step.json` dosyasından beslenen yazılım ve algoritma sorularını çözerek ilerlemeyi sağlayan interaktif bir web uygulamasıdır. 

Projenin felsefesi ve seviye atlama mantığı, **Mimar Sinan'ın** çıraklık (Şehzade Camii), kalfalık (Süleymaniye Camii) ve ustalık (Selimiye Camii) dönemlerindeki metodolojik gelişim sürecinden ilham alınarak tasarlanmıştır.

---

## 🛠️ Mimari ve Öne Çıkan Özellikler

### 1. Dinamik S-Yolu (Yılan Dizilimi) Algoritması
Haritadaki 50 adımlık parkur tamamen JavaScript döngüsüyle dinamik olarak DOM üzerinde üretilir. Matematiksel **Modulo (`%`)** aritmetiği kullanılarak her 10 adımda bir yön tersine çevrilir (`flex-direction: row-reverse`). Bu sayede CSS tarafında tasarım kırılması yaşanmadan kusursuz bir yılan kıvrımı (zigzag) elde edilir.

### 2. Asenkron Veri ve Döngü Yönetimi (Dizi Taşma Koruması)
Soru bankası, asenkron `async/await` ve `fetch` mimarisi kullanılarak `step.json` dosyasından dinamik olarak çekilir. Parkurdaki adım sayısı (50) ile JSON'daki soru sayısı uyuşmadığında kodun `undefined` dönüp patlamasını engellemek için, soru indeksi dizi uzunluğuna göre mod işlemine sokulmuştur (`currentStep % allQuestions.length`). Bu sayede sistem dizi taşma hatalarına karşı korumalıdır.

### 3. Gelişmiş UX ve Anlık Geri Bildirim Mekanizması
Kullanıcı şıklar arasında özgürce gezinebilir, seçimini değiştirebilir. `Next` butonuna basıldığında doğrulamalar hem indeks hem de metin bazlı (`string comparison`) esnek bir yapıyla kontrol edilir. Yanlış cevap durumlarında kullanıcı kilitlenmez, CSS `shake` (titreme) animasyonu ile anlık geri bildirim verilir ve doğruyu bulana kadar sonraki adıma geçiş engellenir.

### 4. Asenkron Zamanlayıcı Motoru (Timer)
Her soru başına **15 saniyelik** dinamik bir geri sayım sayacı çalışır. JavaScript `setInterval` ve `clearInterval` mekanizmaları ile yönetilen bu sayaç, bellek sızıntılarını (memory leak) önleyecek şekilde her yeni soruda kendini sıfırlar ve temizler.

### 5. Dinamik Bağlantı Çizgileri (Road Lines)
Daireler arasındaki yatay çizgiler saf CSS yerine JavaScript döngüsü içinde dinamik elemanlar olarak üretilir. Kullanıcı doğru cevap verip ilerledikçe, arkasında bıraktığı gri (pasif) çizgiler animasyonlu bir şekilde parlayarak maviye (aktif) dönüşür.

---

## 💻 Kullanılan Teknolojiler

* **HTML5:** Semantik etiket yapısı ve dinamik veri yönetimi için `data-*` öznitelikleri.
* **CSS3:** Flexbox (Dinamik yönlendirmeler), CSS Variables, Özel Keyframe Animasyonları (`shake`, `fade-in`).
* **Vanilla JavaScript (ES6+):** Async/Await, Fetch API, Veri Doğrulama, `setInterval` Zaman Yönetimi ve Gelişmiş DOM Manipülasyonu.

---

## 📂 Proje Yapısı

```text
├── index.html          # Semantik HTML iskeleti
├── style.css           # Grid/Flexbox düzeni ve animasyonlar
├── pass.js             # Oyun motoru, asenkron süreçler ve algoritma mantığı
└── step.json           # Seviye ve soru verilerini tutan JSON havuzu
