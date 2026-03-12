# Admin CMS - Admin Info

## Wichtige Konfiguration

### 1. Passwort ändern (empfohlen!)

Öffnet `admin.html` und findet diese Zeile (ca. Zeile 235):

```javascript
ADMIN_PASSWORD: 'spotbust123',
```

Ändert es zu einem sicheren Passwort, z.B.:
```javascript
ADMIN_PASSWORD: 'mein-super-geheimes-passwort-2026',
```

**Teilt das neue Passwort mit der Band** (z.B. im Telegram).

---

### 2. Repo-Konfiguration

**Besitzer:** `4maggio`  
**Repo:** `spotbust`  
**Branch:** `main`  
**Datei:** `gigs.json`

Diese sind in `admin.html` hardkodiert (Zeile 230-233):

```javascript
GITHUB_OWNER: '4maggio',
GITHUB_REPO: 'spotbust',
GITHUB_BRANCH: 'main',
```

Falls sich das ändert, müsst ihr die Werte hier anpassen.

---

### 3. Wie es funktioniert

1. **Band öffnet `admin.html`**
2. **Gibt Passwort + GitHub Token ein** (Token wird im Browser gespeichert)
3. **Bearbeitet Gigs** in der Tabelle (Add/Edit/Delete)
4. **Speichert zu GitHub** über die GitHub API
5. **Website aktualisiert sich automatisch** (gigs.json wird neu geladen in `main.js`)

---

### 4. GitHub Token Setup für Band

**Wichtig:** Jedes Band-Member braucht seinen eigenen Token!

#### Kurz-Anleitung für Band:
1. GitHub anmelden → [Settings → Tokens](https://github.com/settings/tokens/new)
2. ✅ Haken bei `repo` (Full control of private repositories)
3. Token generieren
4. Token ins Admin CMS eingeben
5. Fertig!

**Die Band-Mitglieder erhalten die volle Anleitung in `_local/HOWTO/admin-cms-setup.md`**

---

### 5. Troubleshooting für Admin

**Problem:** "Token ungültig" oder "401 Unauthorized"
- Token ist abgelaufen oder falsch
- Token hat nicht die `repo` Scope
- => Band-Member soll neuen Token erstellen

**Problem:** "409 Conflict"
- Zwei Personen haben gleichzeitig bearbeitet
- GitHub blockiert die 2. Änderung
- => Seite refreshen, nochmal probieren

**Problem:** "404 Not Found"
- `gigs.json` ist nicht in `main` Branch
- Repo-Namen/Besitzer ist falsch
- => E-Mails prüfen

**Problem:** CMS zeigt alte Gigs
- Browser-Cache ist veraltet
- => `Strg+Shift+Delete` oder `Cmd+Shift+Delete` (Hard Fresh)

---

### 6. Optional: Weitere Customization

**Custom Committer-Name/Email:**
In `admin.html` (Zeile 420), ändert:
```javascript
committer: {
    name: 'Spotbust Admin',
    email: 'admin@spotbust.local'
}
```

**Loading-Timeout anpassen:**
Falls die Band langsame Verbindung hat, könnt ihr `timeout` in den fetch()-Requests erhöhen.

**Zusätzliche Gig-Felder:**
Falls ihr mehr Infos speichern wollt (z.B. Preis, Ticketlink), müsst ihr:
1. `gigForm` in `admin.html` um Input-Felder erweitern
2. `main.js` aktualisieren (wie Gigs angezeigt werden)
3. `gigs.json` mit neuen Feldern füllen

---

### 7. Deployment

Die `admin.html` wird wie alles andere über GitHub Pages deployed:
- Committet `admin.html` in den `main` Branch
- GitHub Pages generiert die Website automatisch
- Admin CMS ist dann erreichbar unter: `https://4maggio.github.io/spotbust/admin.html`

---

### 8. Sicherheit

**Achtung:**
- Passwort ist im Code visible (nur für kleine, vertraute Groups)
- GitHub Token wird im Client-seitige localStorage gespeichert
- Für sensitivere Systeme, würde man ein echtes Backend mit Session-Management machen

Für eine kleine DIY-Band reicht das vollkommen aus! 🎸

---

## Checkliste für Setup

- [ ] Passwort in `admin.html` angepasst
- [ ] `admin.html` committeed & gepusht
- [ ] Band hat die Anleitung in `admin-cms-setup.md` gelesen
- [ ] Erstes Band-Mitglied hat Token erstellt und testet

**Viel Erfolg!** 🚀
