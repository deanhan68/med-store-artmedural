export const categories = [
    {
        name: "Гигиена"
    },
    {
        name: "Медецинская одежда"
    },
    {
        name: "Контроль"
    },
    {
        name: "Перевязочные материалы"
    },
    {
        name: "Документация"
    },
    {
        name: "Стериализация"
    },

    
]

export const countProduct = [
    {
        name: "x1",
        price: 100,
    },
    {
        name: "x2",
        price: 300,
    },
    {
        name: "x5",
        price: 700,
    },
    {
        name: "x10",
        price: 1000,
    },    
].map((obj, index) => ({id: index + 1, ...obj}));


export const products = [
    {
        name:"Маски для лица",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t02/t29/mav_4004-1100x1100w.jpg",
        categoryId: 2,
    },
    {
        name:"Шапочка клип-берет Шарлотта",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t15/shapka_ntk_tovar-1100x1100h.jpg",
        categoryId: 2,
    },
    {
        name:"Молконт-ЧАС",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t08/molkont-chas-1100x1100h.png",
        categoryId: 3,
    },
    {
        name:"БиоТЕСТ-ПЛАЗМА-ВИНАР",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t07/760847c3b7be506384c02d542f951060-1100x1100w.jpg",
        categoryId: 3,
    },
    {
        name:"Эластичный бинт",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t02/t29/img_0008_2-1100x1100w.jpg",
        categoryId: 4,
    },
    {
        name:"Вата гигиеническая",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t02/t29/mav_3902-1100x1100w.jpg",
        categoryId: 4,
    },
    {
        name:"Журнал контроля концентраций рабочих растворов дезинфицирующих и стерилизующих средств",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t08/c1dbd2a2-1100x1100.jpg",
        categoryId: 5,
    },
    {
        name:"Журнал регистрации и контроля ультрафиолетовой бактерицидной установки",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t08/d509449f377be1db4c23fc9072b18f74-1100x1100w.jpg",
        categoryId: 5,
    },
    {
        name:"Бумага крепированная (стандартная/ мягкая/ усиленная) КЛИНИПАК",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t04/8249695-1100x1100.jpeg",
        categoryId: 6,
    },
    {
        name:"Лента липкая для стерилизации, «СтериТ®»",
        imageUrl:"http://artmedural.ru/image/cache/catalog/tovar/t05/lenta_lipkaja_dlja_vozdushnoj_sterilizacii-1100x1100.png",
        categoryId: 6,
    },

    



]
