# Admin CMS Setup für Spotbust Gigs

## 🚀 Was ist das?

Das **Admin CMS** ist eine passwortgeschützte Seite, auf der ihr Gigs direkt verwalten könnt — ohne Code, ohne GitHub zu verstehen. 

**URL:** Öffnet `admin.html` auf der Website
- Lokal: `http://localhost:8000/admin.html`
- Online: `https://4maggio.github.io/spotbust/admin.html`

---

## 📋 Einrichtung (einmalig!)

### 1. GitHub Personal Access Token erstellen

Ein Token ist wie ein Passwort speziell für die Gigs-App. So funktioniert's:

1. Geht auf **[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)**
   - Müsst auf GitHub eingeloggt sein!
   - Falls nicht: [Login hier](https://github.com/login)

2. Unter "Scopes" wählt ihr: `repo` (voller Zugriff auf Repositories)

3. Klickt **"Generate token"**

4. **Wichtig:** Copy die lange Zeichenkette (fängt mit `ghp_` an)
   - Diese könnt ihr später nicht mehr sehen!
   - Speichert sie sicher (z.B. im Browser-Passwort-Manager oder 1Password)

**Jedes Band-Member braucht seinen eigenen Token!**

---

### 2. Admin CMS Login

1. Öffnet [https://4maggio.github.io/spotbust/admin.html](https://4maggio.github.io/spotbust/admin.html)

2. Gebt ein:
   - **Admin Password:** `spotbust123` (wird später geändert)
   - **GitHub Token:** Euren Token von oben

3. Klickt **LOGIN**

4. Der Token wird lokal im Browser gespeichert (nur auf eurem Gerät!)

---

## 🎮 Gigs verwalten

### Gig hinzufügen

1. Klickt **"+ Neuer Gig"**
2. Füllst das Formular aus:
   - **Datum:** z.B. `14.03.2026`
   - **Stadt:** z.B. `Berlin`
   - **Venue:** z.B. `Lido Club`
   - **Uhrzeit:** z.B. `22:00`
   - **Info:** Optional (z.B. "Gästeliste", "10€ Eintritt")
3. Klickt **SPEICHERN**
4. => Neue Gig wird zu GitHub übertragen
5. => Website aktualisiert sich automatisch

### Gig bearbeiten

1. Bei einem Gig in der Tabelle: klickt **EDIT**
2. Ändert die Felder
3. Klickt **SPEICHERN**
4. => Änderungen live auf der Website

### Gig löschen

1. Bei einem Gig: klickt **DELETE**
2. Bestätigt die Frage
3. => Gig ist weg

---

## ✅ Best Practices

✅ **Datumformat:** Immer `YYYY-MM-DD` (z.B. `2026-03-20`)  
✅ **Zeitformat:** Immer `HH:MM` (24-Stunden, z.B. `22:00`)  
✅ **Sortierung:** Gigs werden automatisch nach Datum sortiert  
✅ **Browser-Speicher:** Token bleibt lokal gespeichert (nur auf diesem Gerät)  
✅ **Alte Gigs:** Vergangene Gigs werden automatisch ausgegraut auf der Website  

❌ **Nicht:** Passwort/Token im Telegram/Chat teilen  
❌ **Nicht:** Auf fremdem Computer Token eingeben (nur privater Computer!)  
❌ **Nicht:** Datum-Format ändern (muss ISO sein: `YYYY-MM-DD`)  

---

## 🔒 Sicherheit

**Passwort:** `spotbust123`
- Gleich für alle
- Später ändern (in `admin.html` Line 235: `ADMIN_PASSWORD`)

**GitHub Token:**
- Nur lokal im Browser gespeichert
- Jedes Band-Member hat seinen eigenen Token
- Falls Token gehackt wird: auf GitHub [hier löschen](https://github.com/settings/tokens) und neuen erstellen

---

## ❓ Häufige Fragen

### "Wo wird mein Token gespeichert?"
Nur im Browser deines Geräts (localStorage). Wird nicht irgendwo hochgeladen.

### "Kann ich den Token mehrmals eingeben?"
Ja — jedes Mal wenn ihr euch zum ersten Mal anmeldet. Der Browser speichert ihn dann ab.

### "Was passiert, wenn 2 von uns gleichzeitig ändern?"
GitHub sperrt dann konflikt-fähig ab. Einfach neu laden & probieren.

### "Ich habe das falsche Passwort eingegeben"
Gebt einfach `spotbust123` ein.

### "Mein Token funktioniert nicht"
1. GitHub Token ist abgelaufen? → neuen erstellen
2. Token hat nicht die `repo` Rolle? → neuen mit `repo` Scope erstellen
3. Unsicher? → Logout, GitHub Token auf [github.com/settings/tokens](https://github.com/settings/tokens) und nochmal probieren

### "Du hast dich ausgeloggt, wie melde ich mich wieder an?"
Klick auf **LOGOUT** oben rechts, fülle das Login-Formular erneut aus.

---

## 📞 Support

Falls es nicht funktioniert:
1. **Browser-Console checken:** F12 → "Console" Tab → Fehler-Meldungen?
2. **Token erneut erstellen** (auf GitHub)
3. **Browser-Cache löschen** (Strg+Shift+Delete)
4. **Frag Philipp** 😄

---

**Fertig!** 🎉 Ihr könnt jetzt Gigs direkt verwalten!
