import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Добавляем товары...')

  const products = [
    { title: 'Кроссовки Nike Air', price: 8990, description: 'Стильные и удобные кроссовки для повседневной носки' },
    { title: 'Футболка хлопок', price: 1990, description: 'Мягкая хлопковая футболка, дышащая' },
    { title: 'Джинсы классические', price: 3990, description: 'Классические джинсы прямого кроя' },
    { title: 'Кепка black', price: 990, description: 'Черная кепка из натурального хлопка' }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
    console.log(`✅ Добавлен: ${product.title}`)
  }

  console.log('🎉 Готово! Товары в базе есть.')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })