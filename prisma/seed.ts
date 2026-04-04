import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

const PRODUCTS = [
  { name: "Диван 'Нордик'", price: 45000, category: "sofas", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { name: "Минималист", price: 38200, category: "sofas", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80" },
  { name: "Вельветовый шик", price: 52000, category: "sofas", img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80" },
  { name: "Кожаный Честер", price: 89900, category: "sofas", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80" },
  { name: "Угловой Модерн", price: 74500, category: "sofas", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" },
  { name: "Стол дубовый", price: 12000, category: "tables", img: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80" },
  { name: "Мраморный кофейный", price: 18500, category: "tables", img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80" },
  { name: "Рабочий 'Scandi'", price: 9900, category: "tables", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80" },
  { name: "Круглый обеденный", price: 24000, category: "tables", img: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80" },
  { name: "Стул 'Лофт'", price: 4500, category: "chairs", img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80" },
  { name: "Кресло 'Eames'", price: 15800, category: "chairs", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80" },
  { name: "Барный стул", price: 6300, category: "chairs", img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80" },
  { name: "Офисный комфорт", price: 21000, category: "chairs", img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80" },
  { name: "Плетеный стул", price: 8900, category: "chairs", img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&q=80" },
  { name: "Кровать 'Cloud'", price: 60000, category: "beds", img: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80" },
  { name: "Королевский бархат", price: 120000, category: "beds", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80" },
  { name: "Деревянная база", price: 42500, category: "beds", img: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80" },
  { name: "Мягкое изголовье", price: 55000, category: "beds", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80" },
  { name: "Минимал бокс", price: 35000, category: "beds", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" },
];

async function main() {
  await prisma.aiMessage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123', saltRounds);
  const admin = await prisma.user.create({
    data: {
      email: 'lev@gmail.com',
      passwordHash: hashedPassword,
      firstName: 'Лев',
      role: 'ADMIN' as any, 
    },
  });

  for (const item of PRODUCTS) {
    const category = await prisma.category.upsert({
      where: { name: item.category },
      update: {},
      create: { name: item.category },
    });

    await prisma.product.create({
      data: {
        name: item.name,
        description: `Премиальное качество из категории ${item.category}`,
        price: item.price,
        stock: 50,
        images: [item.img],
        categoryId: category.id,
      },
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); 
  });