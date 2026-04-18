import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * Nuxt Content Configuration
 *
 * Цей файл визначає структуру та валідацію контенту для @nuxt/content модуля.
 *
 * Навіщо потрібний content.config.ts:
 *
 * 1. **Type Safety (Безпека типів)**
 *    - Визначає TypeScript схеми для контенту
 *    - Автодоповнення в IDE для полів контенту
 *    - Валідація даних під час розробки
 *
 * 2. **Структурування контенту**
 *    - Організація контенту в колекції (collections)
 *    - Кожна колекція може мати свою схему
 *    - Приклад: blog posts, projects, authors тощо
 *
 * 3. **Валідація даних**
 *    - Перевірка обов'язкових полів
 *    - Валідація типів даних (string, number, date)
 *    - Кастомні валідатори
 *
 * 4. **Трансформація контенту**
 *    - Автоматична обробка markdown/yaml файлів
 *    - Генерація додаткових метаданих
 *    - Оптимізація зображень
 *
 * 5. **Покращена продуктивність**
 *    - Кешування структури контенту
 *    - Швидший парсинг під час збірки
 */

export default defineContentConfig({
  // Налаштування колекцій контенту
  collections: {
    // Колекція для налаштувань сайту
    settings: defineCollection({
      type: 'data', // data = YAML/JSON файли (не markdown)
      source: 'settings.yaml',
      schema: z.object({
        collections: z.object({
          main: z.object({
            baseURL: z.string().default('/'),
          }),
        }),
      }),
    }),

    // Приклад: колекція для блогу (якщо додасте пізніше)
    // blog: defineCollection({
    //   type: 'page', // page = Markdown файли
    //   source: 'blog/**/*.md',
    //   schema: z.object({
    //     title: z.string(),
    //     description: z.string(),
    //     date: z.string().transform((str) => new Date(str)),
    //     tags: z.array(z.string()).optional(),
    //     image: z.string().optional(),
    //   }),
    // }),

    // Приклад: колекція для проєктів (альтернатива Firebase)
    // works: defineCollection({
    //   type: 'data',
    //   source: 'works/*.json',
    //   schema: z.object({
    //     id: z.string(),
    //     name: z.string(),
    //     descr: z.string(),
    //     demo: z.string().url(),
    //     link: z.string().url(),
    //     technologies: z.array(z.string()).optional(),
    //     year: z.number().optional(),
    //   }),
    // }),
  },

  // Глобальні налаштування
  // defaultLocale: 'uk',
  // locales: ['uk', 'en'],

  // Налаштування markdown (якщо використовуєте)
  markdown: {
    // Підсвітка синтаксису коду
    remarkPlugins: [],
    rehypePlugins: [],
  },

  // Налаштування пошуку
  search: {
    indexed: true, // Індексувати контент для пошуку
  },
})
