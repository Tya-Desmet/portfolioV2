# Portfolio Personnel - Mystya

[![Deploy Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Build,%20Test%20&%20Deploy/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions)

Portfolio professionnel de Mystya, développeur full-stack junior.

## 🌐 Site en ligne

**https://tyadesmet.dev**

## ✨ Features

- Hero section avec présentation
- Technologies & compétences (Frontend, Backend, Outils)
- Portfolio de projets réalisés
- Section contact avec liens sociaux
- Navigation responsive
- SEO optimisé avec sitemap automatique
- RSS feed pour articles de blog
- Accessibilité WCAG 2.1 Level AA
- Performance optimisée (Core Web Vitals)

## 🛠️ Stack Technique

- **Framework:** Astro 5.17.1 (SSG)
- **Frontend:** HTML5, CSS3, TypeScript, React
- **Backend (en cours):** Node.js, Express, PostgreSQL, Java
- **Build:** Vite, esbuild, lightningcss
- **CI/CD:** GitHub Actions, Lighthouse CI
- **Hébergement:** Infomaniak Web Hosting (FTP)
- **Outils:** Git, VS Code, npm

## 📦 Structure

```
├── src/                    # Code source Astro
│   ├── components/         # Composants réutilisables
│   ├── layouts/            # Layouts de page
│   ├── pages/              # Pages et routes
│   └── styles/             # Styles globaux
├── public/                 # Fichiers statiques
├── dist/                   # Build de production
├── .github/workflows/      # CI/CD GitHub Actions
├── astro.config.mjs        # Configuration Astro
└── lighthouserc.json       # Configuration Lighthouse CI
```

## 🚀 Développement local

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Prévisualisation build
npm run preview
```

Ouvrir: http://localhost:4321

## 🔄 CI/CD & Déploiement

Le déploiement est automatisé avec GitHub Actions :

1. **Build** : Compilation du site Astro
2. **Lighthouse CI** : Tests de performance, accessibilité, SEO
   - Performance: ≥85
   - Accessibilité: ≥90
   - SEO: ≥95
3. **Deploy** : Déploiement FTP vers Infomaniak
4. **Notify** : Notification du résultat

### Configuration GitHub Secrets

Pour activer le déploiement automatique, configurer ces secrets dans GitHub :

```
FTP_SERVER          # ftps.infomaniak.com
FTP_USERNAME        # Votre nom d'utilisateur FTP
FTP_PASSWORD        # Votre mot de passe FTP
```

**Configuration > Secrets and variables > Actions > New repository secret**

### Rollback manuel

En cas de problème après déploiement :

1. Aller sur **Actions > Rollback Deployment**
2. Cliquer **Run workflow**
3. Entrer le SHA du commit stable (exemple: `abc1234`)
4. Lancer le workflow

Le site sera restauré automatiquement.

## 📫 Contact

**LinkedIn:** [Tya Desmet](https://www.linkedin.com/in/tya-desmet)  
**GitHub:** [Tya-Desmet](https://github.com/Tya-Desmet)

---

© 2026 Mystya
