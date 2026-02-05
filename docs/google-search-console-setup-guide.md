# Guide de Configuration Google Search Console

**Date de création:** 2026-02-05  
**Projet:** ProjetPerso (mystya.dev)  
**Story:** 2.4 - Google Search Console Integration

---

## 📋 Prérequis

- ✅ Domaine mystya.dev déployé et accessible publiquement sur Infomaniak
- ✅ Compte Google (Gmail)
- ✅ Accès au code source du site
- ⏳ Attendre 48-72h après vérification pour voir les premières données

---

## 🚀 Étape 1: Accéder à Google Search Console

1. **Ouvrir Google Search Console**
   - URL: https://search.google.com/search-console/
   - Se connecter avec votre compte Google (Gmail)

2. **Première visite**
   - Si c'est la première fois, accepter les conditions d'utilisation
   - Cliquer sur "Start now" ou "Add property"

---

## 🏠 Étape 2: Ajouter la propriété mystya.dev

1. **Choisir le type de propriété**
   - Sélectionner **"URL prefix"** (recommandé pour v0.2)
   - Ne pas choisir "Domain" (nécessite accès DNS)

2. **Entrer l'URL du site**
   ```
   https://mystya.dev
   ```
   - Bien utiliser `https://` (pas `http://`)
   - Ne pas ajouter de trailing slash

3. **Cliquer sur "Continue"**

---

## ✅ Étape 3: Choisir la méthode de vérification

### Méthode recommandée: HTML Tag

1. **Dans Google Search Console, sélectionner "HTML tag"**

2. **Copier la meta tag fournie**
   - Format: `<meta name="google-site-verification" content="abc123xyz456" />`
   - Exemple: `<meta name="google-site-verification" content="1A2B3C4D5E6F7G8H9I0J" />`

3. **⚠️ NE PAS CLIQUER SUR "VERIFY" ENCORE**
   - On doit d'abord déployer le site avec la meta tag

---

## 📝 Étape 4: Ajouter la meta tag au site

### Option A: Modification manuelle (Simple)

1. **Ouvrir le fichier `index.html`**

2. **Localiser la ligne commentée dans le `<head>`:**
   ```html
   <!-- Google Search Console Verification (pending setup) -->
   <!-- <meta name="google-site-verification" content="YOUR_CODE" /> -->
   ```

3. **Décommenter et remplacer `YOUR_CODE`:**
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="VOTRE_CODE_ICI" />
   ```

4. **Exemple concret:**
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="1A2B3C4D5E6F7G8H9I0J" />
   ```

5. **Sauvegarder le fichier**

### Option B: Utilisation du script (Automatisé)

Un script PowerShell est disponible pour automatiser cette étape:

```powershell
# Dans le terminal PowerShell
.\scripts\update-gsc-verification.ps1 -VerificationCode "VOTRE_CODE_ICI"
```

---

## 🚀 Étape 5: Déployer le site

1. **Déployer le fichier `index.html` mis à jour sur Infomaniak**
   - Via FTP, SSH, ou panneau de contrôle Infomaniak
   - S'assurer que le fichier est bien dans le répertoire racine du site

2. **Vérifier que le site est accessible**
   - Ouvrir: https://mystya.dev
   - Le site doit se charger normalement

3. **Vérifier que la meta tag est visible**
   - Faire clic droit → "Afficher le code source" (ou Ctrl+U)
   - Chercher "google-site-verification"
   - La meta tag doit être visible dans le `<head>`

4. **Attendre quelques minutes**
   - Laisser le temps au serveur de propager les changements

---

## ✅ Étape 6: Vérifier la propriété

1. **Retourner sur Google Search Console**
   - Revenir à la page de vérification

2. **Cliquer sur le bouton "Verify"**

3. **Attendre la vérification (quelques secondes)**

4. **Message de succès attendu:**
   ```
   ✅ Ownership verified
   ```
   - Badge vert avec coche
   - Message: "You are a verified owner"

5. **En cas d'erreur:**
   - Vérifier que la meta tag est exactement celle fournie par Google
   - Vérifier que le site est accessible publiquement
   - Vérifier qu'il n'y a pas de typos dans le code
   - Attendre quelques minutes et réessayer

6. **Capturer un screenshot de la confirmation**
   - Pour documentation future

---

## 🗺️ Étape 7: Soumettre le sitemap.xml

1. **Dans Google Search Console, aller à "Sitemaps"**
   - Sidebar → Sitemaps

2. **Entrer l'URL du sitemap:**
   ```
   sitemap.xml
   ```
   - Juste le nom du fichier (relatif au domaine)
   - Pas besoin de l'URL complète

3. **Cliquer sur "Submit"**

4. **Attendre le parsing**
   - Peut prendre de quelques minutes à 2 jours
   - Actualiser la page pour voir le statut

5. **Statut attendu:**
   ```
   ✅ Success
   URLs discovered: 1
   ```

6. **En cas d'erreur "Couldn't fetch":**
   - Vérifier que sitemap.xml est accessible: https://mystya.dev/sitemap.xml
   - Vérifier qu'il n'y a pas d'erreur 404
   - Vérifier que le XML est bien formé

---

## 🔍 Étape 8: Demander l'indexation de la homepage

1. **Utiliser l'URL Inspection Tool**
   - Dans le top bar de GSC, il y a un champ de recherche
   - Entrer: `https://mystya.dev`
   - Appuyer sur Entrée

2. **Attendre l'analyse (quelques secondes)**

3. **Résultat possible 1: "URL is on Google"**
   - ✅ La page est déjà indexée
   - Noter la date d'indexation

4. **Résultat possible 2: "URL is not on Google"**
   - ⏳ La page n'est pas encore indexée
   - Cliquer sur "Request Indexing"
   - Attendre confirmation (quelques secondes)
   - Message: "Indexing requested"

5. **Résultat possible 3: "URL has errors"**
   - ❌ Problème technique détecté
   - Lire le message d'erreur
   - Corriger le problème
   - Réessayer

---

## 📊 Étape 9: Attendre la collecte de données (J+2-7)

### Quand les données apparaissent-elles?

| Rapport | Délai | Données attendues |
|---------|-------|-------------------|
| **Overview** | 2-3 jours | Premières impressions/clicks |
| **Coverage** | 1-2 jours | 1 page indexée |
| **Sitemap** | Quelques minutes à 2 jours | 1 URL discovered |
| **Performance** | 2-7 jours | Requêtes, CTR, position |
| **Rich Results** | 2-7 jours | Person schema détecté |
| **Mobile Usability** | 2-7 jours | No issues |
| **Core Web Vitals** | 28+ jours | LCP, FID, CLS (besoin traffic) |

### Actions à J+7 (1 semaine après vérification)

1. **Vérifier l'indexation:**
   - GSC → Coverage
   - Devrait afficher "1 valid page"

2. **Vérifier les premières données Performance:**
   - GSC → Performance
   - Devrait afficher quelques impressions (même si 0 clicks)

3. **Vérifier le Rich Results:**
   - GSC → Enhancements → Rich Results
   - Devrait détecter le JSON-LD Person schema

4. **Vérifier Mobile Usability:**
   - GSC → Mobile Usability
   - Devrait afficher "No issues"

---

## 🎯 Étape 10: Configuration avancée (Optionnel)

### Ajouter des utilisateurs

1. **GSC → Settings (⚙️) → Users and permissions**
2. Cliquer "Add user"
3. Entrer l'email de l'utilisateur
4. Choisir le niveau de permission:
   - **Owner:** Accès complet (peut ajouter/supprimer utilisateurs)
   - **Full:** Tous les rapports et actions
   - **Restricted:** Vue lecture seule

### Configurer les paramètres de URL

1. **GSC → Settings → Crawl rate**
   - Par défaut, Google décide automatiquement
   - Optionnel: Limiter le crawl rate si serveur limité

2. **GSC → Settings → Change of address**
   - Utiliser si le domaine change (migration)

---

## 📈 Rapports à surveiller régulièrement

### Rapport Coverage (Indexation)

**Fréquence:** Hebdomadaire (v0.2), après chaque publication (v0.3+)

**Métriques clés:**
- Valid pages: Devrait être 1 en v0.2
- Errors: Devrait être 0
- Excluded: Vérifier pourquoi certaines pages sont exclues

**Actions si erreurs:**
- "404 not found": Corriger liens cassés
- "Blocked by robots.txt": Vérifier robots.txt
- "Redirect": Corriger redirects inutiles

### Rapport Performance (SEO)

**Fréquence:** Hebdomadaire (v0.2), mensuel (v0.3+)

**Métriques clés:**
- **Impressions:** Combien de fois le site apparaît dans Google (target: 100/mois v0.2)
- **Clicks:** Combien de visiteurs viennent de Google (target: 10/mois v0.2)
- **CTR (Click-Through Rate):** Clicks / Impressions * 100 (target: 10%+)
- **Average position:** Position moyenne dans résultats (target: <20)

**Queries Tab:**
- Voir quelles requêtes génèrent du trafic
- Exemples attendus: "développeur fullstack junior", "portfolio JavaScript"
- Identifier opportunités: requêtes avec impressions élevées mais CTR faible = améliorer meta description

**Pages Tab:**
- En v0.2: 1 page (homepage)
- En v0.3+: Comparer performance des articles blog

### Rapport Rich Results

**Fréquence:** Après chaque modification structured data

**Métriques clés:**
- Type: Person (v0.2)
- Valid items: 1
- Errors: 0
- Warnings: Vérifier et corriger si possible

**Actions si erreurs:**
- Utiliser Google Rich Results Test: https://search.google.com/test/rich-results
- Corriger le JSON-LD dans index.html
- Attendre 1-2 jours pour recrawl

### Rapport Core Web Vitals

**Fréquence:** Mensuel (besoin 28+ jours de données)

**Métriques clés:**
- LCP (Largest Contentful Paint): Target <2.5s (🟢 Good)
- FID/INP (First Input Delay): Target <100ms (🟢 Good)
- CLS (Cumulative Layout Shift): Target <0.1 (🟢 Good)

**Mobile vs Desktop:**
- Vérifier les deux
- Mobile souvent plus critique (majorité du traffic)

---

## 🔧 Dépannage (Troubleshooting)

### Problème 1: "Couldn't verify ownership"

**Symptômes:**
- Message d'erreur lors du clic sur "Verify"
- Badge rouge ❌

**Solutions:**
1. Vérifier que la meta tag est exactement celle fournie par Google (copier-coller)
2. Vérifier que le site est déployé et accessible: https://mystya.dev
3. Vérifier que la meta tag est visible dans le source HTML (Ctrl+U)
4. Attendre 5-10 minutes et réessayer
5. Vider le cache du navigateur et réessayer
6. Essayer depuis un autre navigateur (mode incognito)

### Problème 2: "Sitemap couldn't be fetched"

**Symptômes:**
- Erreur "Couldn't fetch" dans rapport Sitemaps
- Status: Failed

**Solutions:**
1. Vérifier que sitemap.xml est accessible: https://mystya.dev/sitemap.xml
2. Vérifier qu'il n'y a pas d'erreur 404 ou redirect
3. Vérifier que le XML est bien formé (pas d'erreurs de syntaxe)
4. Vérifier que robots.txt référence le sitemap:
   ```
   Sitemap: https://mystya.dev/sitemap.xml
   ```
5. Attendre quelques heures et réessayer

### Problème 3: "URL not indexed" après 7+ jours

**Symptômes:**
- URL Inspection Tool affiche "URL is not on Google"
- Aucune donnée dans Coverage report

**Solutions:**
1. Vérifier que robots.txt n'interdit pas le crawling
2. Vérifier qu'il n'y a pas de balise `<meta name="robots" content="noindex">`
3. Requêter l'indexation via URL Inspection Tool → "Request Indexing"
4. Vérifier que le sitemap est bien soumis et parsé
5. Vérifier qu'il n'y a pas d'erreurs techniques (404, 500, redirect loops)
6. Attendre encore 7-14 jours (indexation peut être lente pour nouveaux sites)

### Problème 4: "No data available yet"

**Symptômes:**
- Tous les rapports affichent "No data"
- Graphiques vides

**Solutions:**
1. **C'est normal** dans les premières 48-72h après vérification
2. Attendre au moins 2-3 jours pour premières données
3. Performance data nécessite du traffic réel (peut prendre 7+ jours)
4. Core Web Vitals nécessitent 28+ jours minimum et traffic suffisant
5. Vérifier que le site génère du traffic (via Plausible Analytics)

### Problème 5: Rich Results errors

**Symptômes:**
- Rapport Rich Results affiche "Errors" ou "Warnings"
- JSON-LD Person schema non détecté

**Solutions:**
1. Utiliser Google Rich Results Test: https://search.google.com/test/rich-results
2. Copier-coller l'URL: https://mystya.dev
3. Voir les erreurs détectées
4. Corriger le JSON-LD dans index.html (Story 2.1)
5. Redéployer le site
6. Attendre 1-2 jours pour recrawl
7. Revérifier dans GSC → Rich Results

---

## 📚 Ressources supplémentaires

### Documentation officielle Google

- **Google Search Console:** https://search.google.com/search-console/
- **GSC Help Center:** https://support.google.com/webmasters/
- **GSC Setup Guide:** https://developers.google.com/search/docs/monitor-debug/search-console-start
- **Verification Methods:** https://support.google.com/webmasters/answer/9008080

### Outils de validation

- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Structured Data Testing Tool (deprecated):** https://validator.schema.org/

### Ressources SEO

- **Google Search Central:** https://developers.google.com/search
- **SEO Starter Guide:** https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- **Core Web Vitals:** https://web.dev/vitals/

---

## ✅ Checklist de vérification finale

- [ ] Propriété mystya.dev ajoutée dans GSC
- [ ] Ownership vérifié avec badge vert ✅
- [ ] Meta tag de vérification visible dans source HTML
- [ ] Sitemap.xml soumis avec statut "Success"
- [ ] Homepage indexation requestée via URL Inspection Tool
- [ ] Screenshot de confirmation ownership enregistré
- [ ] Attente J+2-7 pour premières données
- [ ] Vérifié Coverage: 1 page indexée
- [ ] Vérifié Rich Results: Person schema détecté
- [ ] Vérifié Mobile Usability: No issues
- [ ] Monitoring hebdomadaire configuré

---

## 📝 Notes pour v0.3+ (Migration DNS TXT)

### Pourquoi migrer vers DNS TXT?

**Avantages:**
- ✅ Vérification au niveau DNS (indépendant du site)
- ✅ Survit aux redéploiements complets du site
- ✅ Méthode la plus robuste recommandée par Google
- ✅ Aucune modification du code HTML nécessaire

**Quand migrer:**
- v0.3+ quand accès DNS Infomaniak disponible
- Lors de migration Astro SSG (redéploiement complet)
- Si meta tag HTML pose problèmes

### Process de migration

1. **Dans GSC, aller à Settings → Verification details**
2. Cliquer "Add verification method"
3. Choisir "Domain name provider"
4. Copier le TXT record fourni par Google:
   ```
   google-site-verification=abc123xyz456
   ```
5. Se connecter au panneau DNS Infomaniak
6. Ajouter TXT record:
   - Type: TXT
   - Host: @ (ou mystya.dev)
   - Value: `google-site-verification=abc123xyz456`
   - TTL: 3600
7. Attendre propagation DNS (1-48h)
8. Revenir à GSC et cliquer "Verify"
9. Une fois vérifié, **garder aussi la meta tag HTML** (double vérification = plus robuste)

---

**Document créé le:** 2026-02-05  
**Dernière mise à jour:** 2026-02-05  
**Version:** 1.0
