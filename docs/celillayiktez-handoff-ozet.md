# Celil Layiktez site — el değiştirme özeti

**Tarih:** 5 Kas 2026 (Europe/London)

## Ne yaptık

- Eski WP sitesinin klonunu değil, yeni editorial Next.js sitesini kurduk (Türkçe içerik).
- Dergi arşivleri: kapak gridleri + sayı sayfası + flipbook tarzı okuyucu (Sayfalar / Çift sayfa / Ses / Tam ekran / İndir).
- PDF ve kapaklar WordPress uploads üzerinde kaldı; site `/api/wp-media` ile PDF proxy ediyor.
- Kronoloji, footer, hakkımda, kitaplar, makaleler sayfaları var.

## Bağımsız repo

| | |
|---|---|
| **Yeni repo** | https://github.com/aliveli412/celillayiktez-site |
| **Eski (yanlışlıkla)** | https://github.com/aliveli412/idea-fabrika-site |
| **Eski branch** | `cursor/celillayiktez-rebuild-50e1` |
| **PR (Idea Fabrika)** | #8 |

Bundan sonra sadece **celillayiktez-site** kullanılacak. Idea Fabrika chat/agent’ı bırakılacak.

## Staging (Hostinger)

- **URL:** https://azure-sardine-885215.hostingersite.com/
- **Domain hedefi:** staging.celillayiktez.com (bağlanacak)
- **Canlı WP:** dokunulmadı — uploads korunacak
- Hostinger şu an Git auto-deploy’u kapatmış → **zip upload** ile deploy edildi
- **Build:** `npm run build --webpack` (`package.json` içinde `next build --webpack`), Node 22, start `npm start`

## Kritik fix durumu

| Commit | Ne | Durum |
|---|---|---|
| webpack (`next build --webpack`) | Hostinger Turbopack panic | `main`’de |
| `10d2076` | CDN pdf worker, direkt WP kapaklar, on-site makaleler | `main`’de (2026-11-05 push) |

**Doğrulama (2026-11-05, bu agent):**

- Staging ayakta; arşiv / okuyucu / kitaplar / kronoloji 200.
- Dergi okuyucu çalışıyor (Sayfalar / Çift sayfa / Ses / Tam ekran / İndir); PDF proxy + CDN worker OK.
- Makale listesi on-site (`/makaleler/...`) — ancak gövde parse’ı `post_data` yorumunda erken kesiliyordu; sadece başlık/meta görünüyordu. Düzeltme bu branch’te.

Hostinger Git auto-deploy kapalıysa her içerik/fix sonrası **ZIP yeniden deploy** gerekir.

## Canlı cutover planı (sonra)

1. Staging’te her şeyi doğrula (arsiv, okuyucu, makale, kitap)
2. `staging.celillayiktez.com` bağla
3. Onay → domain’i Next’e al
4. WP çekirdeğini silmeden önce PDF URL’leri/içerik gömülü mü kontrol et
5. `wp-content/uploads/` (ve `ipages_flipbook/`) **asla silinmez**

## Yeni Cursor agent

1. https://cursor.com/agents → New agent
2. Repo: **aliveli412/celillayiktez-site** (Idea Fabrika değil)
3. GitHub App: All repositories + Save
4. İlk prompt: staging URL + okuyucu/makale fix’inin `main`’de olduğunu doğrula, Hostinger deploy’a yardım et

## Bilinen kısıtlar

- Eski agent `idea-fabrika-site` ortamına kilitliydi; `celillayiktez-site`’a 403 yazıyordu.
- Hostinger Git deploy geçici kapalıyken her güncelleme zip upload olabilir.
- Makale metinleri WP’den çekiliyor; WP kapanmadan önce içerik gömmek gerekebilir.
