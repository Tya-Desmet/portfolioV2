import rss from '@astrojs/rss';

export async function GET(context) {
  // Articles hardcodés (Content Collections viendront dans une story future)
  const articles = [
    {
      title: 'Introduction à Astro SSG',
      slug: 'article-1-introduction-astro',
      description: 'Découvrez Astro, le framework moderne pour sites statiques performants. Apprenez comment Astro combine la simplicité du HTML avec la puissance des composants modernes.',
      pubDate: new Date('2026-02-01'),
    },
    {
      title: 'Migration de HTML vanilla vers Astro',
      slug: 'article-2-migration-vanilla-astro',
      description: 'Guide complet pour migrer un site statique HTML/CSS/JS vers Astro. Découvrez les stratégies de migration et les pièges à éviter.',
      pubDate: new Date('2026-02-03'),
    },
    {
      title: 'Créer des composants réutilisables avec Astro',
      slug: 'article-3-components-astro',
      description: 'Apprenez à structurer vos composants Astro efficacement. Découvrez les props, les slots, et les scoped styles pour des composants maintenables.',
      pubDate: new Date('2026-02-05'),
    }
  ].sort((a, b) => b.pubDate - a.pubDate).slice(0, 20); // 20 plus récents

  return rss({
    title: 'Blog Technique - Mystya',
    description: 'Articles techniques sur le développement web : JavaScript, React, Node.js, Astro, PostgreSQL et plus. Partagez mes apprentissages et expériences en développement full-stack.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.title,
      link: `/blog/${article.slug}/`,
      description: article.description,
      pubDate: article.pubDate,
      author: 'Mystya',
    })),
    customData: `<language>fr-fr</language>`,
    stylesheet: '/rss-styles.xsl', // Optionnel: style RSS pour browsers
  });
}
