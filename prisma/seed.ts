import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from './prisma-client';
import { Verified } from 'lucide-react';
import {hashSync} from 'bcrypt';
import { categories, countProduct, products } from './constatnts';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};


const generateProductItem = ({ 
  productId,
  productType,
  size,
}: {
  productId: number,
  productType?: 1 | 2, // стерильные | не стерильыне
  size?:  500 | 1000 | 2000 , // объем
}
) => {
  return {
    productId,
    price:randomNumber(190, 600),
    productType,
    size,

  } as Prisma.ProductItemUncheckedCreateInput;
}

async function up() {
  // Добавляем вызов метода Prisma, чтобы данные улетели в базу
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@user.ru',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@admin.ru',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ]
  });


  await prisma .category.createMany({
    data: categories,
  });

  await prisma .countProduct.createMany({
    data: countProduct,
  });

  await prisma .product.createMany({
    data: products,
  });


  const gigiena1 = await prisma.product.create({
    data: {
      name:'АВАНСЕПТ АКТИВ',
      imageUrl: 
      'http://artmedural.ru/image/cache/catalog/tovar/t02/t28/xavansept-aktiv-1-litr.jpg.pagespeed.ic.ycekifye05-1100x1100w.jpg',
      categoryId: 1,
      countProduct : {
        connect: countProduct.slice(0, 5)
      },
    }
  })

  const gigiena2 = await prisma.product.create({
    data: {
      name:'Кутасепт Ф ',
      imageUrl: 
      'http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg',
      categoryId: 1,
      countProduct : {
        connect: countProduct.slice(0, 5)
      },
    }
  })

  const gigiena3 = await prisma.product.create({
    data: {
      name:'Фолицид Ультра',
      imageUrl: 
      'http://artmedural.ru/image/cache/catalog/tovar/t02/t28/6f61b3a50f24e6a33ddc2d1f949e743b-1100x1100.jpg',
      categoryId: 1, 
      countProduct : {
        connect: countProduct.slice(0, 5)
      },
    }
  })
  await prisma.productItem.createMany({
    data :[


          // АВАНСЕПТ АКТИВ
      // Стерильный (Type 1) - убираем 0.5 л, оставляем только крупные
      { productId: gigiena1.id, productType: 1, size: 1000, price: 550 },
      { productId: gigiena1.id, productType: 1, size: 2000, price: 900 },

      // Не стерильный (Type 2) - есть всё
      { productId: gigiena1.id, productType: 2, size: 500, price: 300 },
      { productId: gigiena1.id, productType: 2, size: 1000, price: 550 },
      { productId: gigiena1.id, productType: 2, size: 2000, price: 900 },

      // КУТАСЕПТ Ф
      // Стерильный (Type 1) - только 0.5 л (как ты и хотел для теста)
      { productId: gigiena2.id, productType: 1, size: 500, price: 250 },

      // Не стерильный (Type 2) - есть всё
      { productId: gigiena2.id, productType: 2, size: 500, price: 250 },
      { productId: gigiena2.id, productType: 2, size: 1000, price: 450 },
      { productId: gigiena2.id, productType: 2, size: 2000, price: 800 },

      // ФОЛИЦИД УЛЬТРА
      // Стерильный (Type 1) - ТЕПЕРЬ ТОЛЬКО ОДНА УПАКОВКА (например, 2 л)
      { productId: gigiena3.id, productType: 1, size: 2000, price: 1300 },

      // Не стерильный (Type 2) - А тут оставим всё, чтобы был контраст
      { productId: gigiena3.id, productType: 2, size: 500, price: 400 },
      { productId: gigiena3.id, productType: 2, size: 1000, price: 750 },
      { productId: gigiena3.id, productType: 2, size: 2000, price: 1300 },

            // Остальные продукты
      generateProductItem ({productId:1}),
      generateProductItem ({productId:2}),
      generateProductItem ({productId:3}),
      generateProductItem ({productId:4}),
      generateProductItem ({productId:5}),
      generateProductItem ({productId:6}),
      generateProductItem ({productId:7}),
      generateProductItem ({productId:8}),
      generateProductItem ({productId:9}),
      generateProductItem ({productId:10}),
      






    ],
  })


  await prisma.cart.createMany({
    data : [
      {
        userId: 1,
        totalAmount: 0,
        token: "111111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "22222",
      },
    ]
  })


  await prisma.cartItem.create({
    data : {
        productItemId: 1,
        cartId:1,
        quantity: 2,
        countProduct: {
          connect: [{id: 1}, {id: 2}, {id: 3 }, {id: 4}]
      },
    },
  });
  
  
  console.log('Данные успешно засеяны! 🌱');
}

async function down() {

  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CountProduct" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  
    
}

async function main() {
    try {
        await down();
        await up();
      } catch (e) {
        console.error(e);
      }
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });