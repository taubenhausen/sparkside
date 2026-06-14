<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kontakt — Sparkside</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <div id="cur"></div>

  <nav id="nav">
    <div class="nav-in">
      <a class="logo" href="index.html">SPARK<span>/</span>SIDE</a>
      <ul class="nl">
        <li><a href="index.html">Home</a></li>
        <li><a href="leistungen.html">Leistungen</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="contact.php" class="on">Kontakt</a></li>
      </ul>
      <a class="ncta" href="contact.php">Projekt starten</a>
      <button class="burg" id="burg" aria-label="Menü"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <div class="drw" id="drw">
    <a href="index.html" onclick="closeDrawer()">Home</a>
    <a href="leistungen.html" onclick="closeDrawer()">Leistungen</a>
    <a href="portfolio.html" onclick="closeDrawer()">Portfolio</a>
    <a href="contact.php" onclick="closeDrawer()">Kontakt</a>
    <a class="drw-cta" href="contact.php" onclick="closeDrawer()">Projekt starten →</a>
  </div>

  <div class="spacer"></div>

  <main>
    <div class="ph">
      <p class="tag rv">Kontakt</p>
      <h1 class="rv d1">LASS UNS<br><span>REDEN.</span></h1>
    </div>

    <div class="cg">
      <div>
        <p class="cl rv" style="font-size:.9rem;color:var(--dim);line-height:1.65;margin-bottom:3rem">
          Ob konkretes Projekt oder offene Frage — wir melden uns innerhalb von 24 Stunden.
          Kein Standardangebot, kein Pitch. Einfach ein ehrliches Gespräch.
        </p>

        <?php if (isset($_GET["status"])): ?>
          <div class="form-msg <?php echo htmlspecialchars($_GET["status"]); ?>">
            <?php
              switch ($_GET["status"]) {
                case "success":
                  echo "Vielen Dank — deine Nachricht wurde erfolgreich gesendet.";
                  break;
                case "error":
                  echo "Bitte fülle alle Pflichtfelder aus.";
                  break;
                case "invalid-email":
                  echo "Bitte gib eine gültige E-Mail-Adresse ein.";
                  break;
                case "send-error":
                  echo "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
                  break;
              }
            ?>
          </div>
        <?php endif; ?>

        <div class="cdet rv">
          <div>
            <div class="cdet-l">E-Mail</div>
            <div class="cdet-v">hello@sparkside.agency</div>
          </div>
        </div>

        <div class="cdet rv d1">
          <div>
            <div class="cdet-l">Standort</div>
            <div class="cdet-v">Schweiz</div>
          </div>
        </div>

        <div class="cdet rv d2">
          <div>
            <div class="cdet-l">Antwortzeit</div>
            <div class="cdet-v">Innerhalb 24 Stunden</div>
          </div>
        </div>
      </div>

      <form class="cf rv d2" action="send.php" method="POST">
        <div class="fr">
          <div class="fg">
            <label for="vorname">Vorname</label>
            <input type="text" id="vorname" name="vorname" placeholder="Max" required>
          </div>
          <div class="fg">
            <label for="nachname">Nachname</label>
            <input type="text" id="nachname" name="nachname" placeholder="Muster" required>
          </div>
        </div>

        <div class="fg">
          <label for="email">E-Mail</label>
          <input type="email" id="email" name="email" placeholder="max@beispiel.ch" required>
        </div>

        <div class="fg">
          <label for="unternehmen">Unternehmen</label>
          <input type="text" id="unternehmen" name="unternehmen" placeholder="Optional">
        </div>

        <div class="fg">
          <label for="interesse">Ich interessiere mich für</label>
          <select id="interesse" name="interesse" required>
            <option value="">Bitte wählen…</option>
            <option>Webdesign & Entwicklung</option>
            <option>Branding & Corporate Design</option>
            <option>Social Media Management</option>
            <option>Print & Digitale Dossiers</option>
            <option>SEO & Digital Ads</option>
            <option>Mehrere Leistungen</option>
          </select>
        </div>

        <div class="fg">
          <label for="nachricht">Nachricht</label>
          <textarea id="nachricht" name="nachricht" placeholder="Erzähl uns kurz von deinem Projekt…" required></textarea>
        </div>

        <button class="fsub" type="submit">Nachricht senden →</button>
      </form>
    </div>
  </main>

  <footer class="foot">
    <div class="foot-top">
      <div>
        <div class="fl">SPARK<span>/</span>SIDE</div>
        <p class="ft-tag">Digitale Lösungen für Unternehmen, die rausstechen wollen.</p>
      </div>
    </div>
    <div class="foot-bot">
      <span class="fcp">© 2025 Sparkside. Alle Rechte vorbehalten.</span>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>