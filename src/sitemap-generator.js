// sitemap-generator.js
import path from 'path';
import { Sitemap } from 'react-router-sitemap';
import routes from './src/routes';

new Sitemap(routes)
  .build('http://example.com')
  .save(path.resolve(__dirname, 'public', 'sitemap.xml'));
