# Google Search Console - Configuration Required

## 📋 Status de la Story 2.4

**Status:** ✅ Implémentation technique terminée - Configuration manuelle requise

Cette story est **partiellement automatisable** car Google Search Console nécessite des actions manuelles via leur interface web.

---

## ✅ Ce qui a été fait (Automatisé)

1. **Meta tag de vérification préparée**
   - Fichier: `index.html` (lignes 7-8)
   - Commentée et prête à activer avec votre code de vérification

2. **Guide de configuration complet**
   - Fichier: `docs/google-search-console-setup-guide.md`
   - 10 étapes détaillées avec instructions précises
   - Section troubleshooting complète
   - Checklist de vérification finale

3. **Script PowerShell d'automatisation**
   - Fichier: `scripts/update-gsc-verification.ps1`
   - Automatise le remplacement du code dans index.html

---

## ⏳ Ce qu'il vous reste à faire (Manuel)

### 1. Accéder à Google Search Console

```
URL: https://search.google.com/search-console/
```

- Se connecter avec votre compte Google (Gmail)
- Accepter les conditions d'utilisation si première visite

### 2. Ajouter la propriété mystya.dev

- Choisir "URL prefix"
- Entrer: `https://mystya.dev`
- Choisir méthode "HTML tag"
- Copier le code de vérification fourni

### 3. Activer la meta tag avec votre code

**Option A: Script PowerShell (Recommandé)**

```powershell
.\scripts\update-gsc-verification.ps1 -VerificationCode "VOTRE_CODE_ICI"
```

**Option B: Modification manuelle**

Dans `index.html`, remplacer:
```html
<!-- <meta name="google-site-verification" content="YOUR_CODE" /> -->
```

Par:
```html
<meta name="google-site-verification" content="VOTRE_CODE_ICI" />
```

### 4. Déployer sur Infomaniak

- Uploader `index.html` mis à jour
- Vérifier que le site est accessible
- Vérifier la meta tag dans le source (Ctrl+U)

### 5. Vérifier la propriété dans GSC

- Retourner sur Google Search Console
- Cliquer "Verify"
- Attendre confirmation "Ownership verified" ✅

### 6. Soumettre le sitemap

- GSC → Sitemaps
- Entrer: `sitemap.xml`
- Cliquer "Submit"

### 7. Requérir l'indexation

- GSC → URL Inspection Tool
- Entrer: `https://mystya.dev`
- Cliquer "Request Indexing" si nécessaire

### 8. Attendre la collecte de données (J+2-7)

- Premières données apparaissent après 2-7 jours
- Monitoring hebdomadaire recommandé

---

## 📚 Documentation détaillée

**Guide complet:** [docs/google-search-console-setup-guide.md](docs/google-search-console-setup-guide.md)

Ce guide contient:
- Instructions détaillées pour chaque étape
- Screenshots verbaux
- Section troubleshooting
- Conseils de monitoring
- Ressources et liens officiels

---

## 🎯 Pourquoi cette approche?

**Limites d'automatisation:**
- ❌ Google Search Console nécessite authentification humaine
- ❌ Interface web GSC nécessite interactions manuelles
- ❌ Code de vérification unique généré par Google
- ❌ Pas d'API publique pour automatiser la vérification initiale

**Ce qui a été automatisé:**
- ✅ Préparation du HTML avec emplacement meta tag
- ✅ Documentation exhaustive du processus
- ✅ Script pour faciliter le remplacement du code
- ✅ Checklist et troubleshooting

---

## ⚠️ Important

Cette configuration est un **prérequis obligatoire** pour:
- Monitoring SEO du site
- Vérification de l'indexation Google
- Analyse des requêtes de recherche
- Détection des erreurs techniques
- Suivi des Core Web Vitals

**Temps estimé:** 15-20 minutes + attente J+2-7 pour données

---

## ✅ Validation

Après avoir complété les étapes manuelles, vérifier:

- [ ] Badge "Ownership verified" ✅ dans Google Search Console
- [ ] Sitemap soumis avec statut "Success"
- [ ] Homepage indexation requestée
- [ ] Meta tag visible dans source HTML de mystya.dev
- [ ] Attente J+2-7 pour premières données

**Note:** Une fois ces étapes complétées, la story 2.4 sera **entièrement terminée**.

---

**Créé le:** 2026-02-05  
**Story:** 2.4 - Google Search Console Integration  
**Guide détaillé:** [docs/google-search-console-setup-guide.md](docs/google-search-console-setup-guide.md)
