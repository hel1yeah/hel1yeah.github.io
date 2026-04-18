import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      // Якщо є збережена позиція (browser back)
      if (savedPosition) {
        resolve(savedPosition)
        return
      }

      // Якщо є hash
      if (to.hash) {
        resolve({
          el: to.hash,
          behavior: 'smooth',
          top: 80,
        })
        return
      }

      // Перевіряємо чи це зміна лише locale
      const toPathClean = to.path.replace(/^\/(en|uk)/, '') || '/'
      const fromPathClean = from.path.replace(/^\/(en|uk)/, '') || '/'

      // Якщо шлях той самий (змінилась тільки мова)
      if (toPathClean === fromPathClean && from.name) {
        // Повертаємо undefined щоб не змінювати позицію скролу
        resolve()
        return
      }

      // Для інших випадків - скрол до верху
      resolve({ top: 0, behavior: 'smooth' })
    })
  },
}
