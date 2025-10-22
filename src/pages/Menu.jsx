import { useRef, useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import ShopingCart from "../components/ShopingCart";
import SortItems from "../components/SortItems";
import NavBar from "../components/NavBar";
import ItemDescription from "../components/ItemDescription";

const eternalCategories = [
  {
    id: "appetizers",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
  {
    id: "main",
    name: "غذای اصلی",
    items: [
      {
        id: 7,
        name: "کباب کوبیده",
        description: "کباب زغالی خوشمزه همراه با برنج ایرانی و گوجه کبابی.",
        ingredients: ["گوشت گوسفندی", "پیاز", "برنج", "گوجه"],
        price: "250,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 500,
        rating: 4.8,
      },
      {
        id: 8,
        name: "پیتزا مارگاریتا",
        description:
          "پیتزای کلاسیک ایتالیایی با گوجه تازه، ریحان و پنیر موزارلا.",
        ingredients: ["خمیر پیتزا", "سس گوجه", "پنیر موزارلا", "ریحان"],
        price: "180,000 تومان",
        discount: 20,
        isVegan: false,
        sold: 350,
        rating: 4.6,
      },
      {
        id: 9,
        name: "خوراک بامیه گیاهی",
        description: "غذای اصیل ایرانی با بامیه، گوجه و ادویه‌جات مخصوص.",
        ingredients: ["بامیه", "گوجه", "پیاز", "سیر", "روغن زیتون"],
        price: "160,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 220,
        rating: 4.4,
      },
      {
        id: 10,
        name: "استیک گوشت",
        description: "استیک آبدار با سس قارچ و سبزیجات گریل‌شده.",
        ingredients: ["گوشت گاو", "قارچ", "کره", "سبزیجات"],
        price: "320,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 410,
        rating: 4.7,
      },
      {
        id: 11,
        name: "قرمه‌سبزی",
        description: "خورشت ایرانی محبوب با سبزیجات تازه و گوشت.",
        ingredients: ["سبزی", "لوبیا قرمز", "گوشت گوسفندی", "لیمو عمانی"],
        price: "220,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 600,
        rating: 4.9,
      },
      {
        id: 12,
        name: "چلو جوجه‌کباب",
        description: "جوجه‌کباب زعفرانی همراه با برنج ایرانی.",
        ingredients: ["مرغ", "زعفران", "برنج", "ماست"],
        price: "200,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 520,
        rating: 4.8,
      },
      {
        id: 13,
        name: "ماهی سالمون گریل",
        description: "سالمون تازه گریل‌شده با لیمو و سبزیجات.",
        ingredients: ["ماهی سالمون", "لیمو", "سبزیجات", "کره"],
        price: "350,000 تومان",
        discount: 15,
        isVegan: false,
        sold: 280,
        rating: 4.5,
      },
      {
        id: 14,
        name: "کاری سبزیجات",
        description: "کاری هندی گیاهی با سبزیجات تازه و ادویه کاری.",
        ingredients: ["هویج", "سیب‌زمینی", "فلفل دلمه‌ای", "کاری"],
        price: "170,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 150,
        rating: 4.3,
      },
      {
        id: 15,
        name: "پاستا آلفردو",
        description: "پاستای کرمی با مرغ و قارچ.",
        ingredients: ["پاستا", "خامه", "مرغ", "قارچ", "پنیر پارمسان"],
        price: "210,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 360,
        rating: 4.4,
      },
      {
        id: 16,
        name: "لازانیا",
        description: "لازانیای خوشمزه با گوشت چرخ‌کرده و پنیر کشدار.",
        ingredients: ["خمیر لازانیا", "گوشت", "سس گوجه", "پنیر"],
        price: "230,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 270,
        rating: 4.5,
      },
      {
        id: 17,
        name: "خوراک عدس گیاهی",
        description: "غذای مقوی و سالم برای گیاه‌خواران.",
        ingredients: ["عدس", "پیاز", "سیر", "گوجه"],
        price: "130,000 تومان",
        discount: 10,
        isVegan: true,
        sold: 190,
        rating: 4.2,
      },
      {
        id: 18,
        name: "مرغ سوخاری",
        description: "مرغ ترد سوخاری‌شده با ادویه مخصوص.",
        ingredients: ["مرغ", "آرد", "ادویه"],
        price: "180,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 450,
        rating: 4.6,
      },
      {
        id: 19,
        name: "خوراک لوبیا پلو",
        description: "لوبیا پلو سنتی با گوشت قیمه‌ای.",
        ingredients: ["لوبیا سبز", "برنج", "گوشت", "ادویه"],
        price: "190,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 210,
        rating: 4.3,
      },
      {
        id: 20,
        name: "ته‌چین زعفرانی",
        description: "ته‌چین مجلسی با مرغ و زعفران.",
        ingredients: ["برنج", "مرغ", "ماست", "زعفران"],
        price: "250,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 310,
        rating: 4.7,
      },
    ],
  },
  {
    id: "desserts",
    name: "دسر",
    items: [
      {
        id: 21,
        name: "تیرامیسو",
        description: "دسر ایتالیایی محبوب با بیسکویت لیدی‌فینگر و ماسکارپونه.",
        ingredients: ["بیسکویت", "قهوه", "پنیر ماسکارپونه", "کاکائو"],
        price: "95,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 270,
        rating: 4.9,
      },
      {
        id: 22,
        name: "فرنی وگان با شیر بادام",
        description: "دسر ایرانی سنتی با شیر بادام، مناسب برای گیاه‌خواران.",
        ingredients: ["شیر بادام", "برنج", "گلاب", "پودر دارچین"],
        price: "80,000 تومان",
        discount: 10,
        isVegan: true,
        sold: 150,
        rating: 4.3,
      },
      {
        id: 23,
        name: "کیک شکلاتی",
        description: "کیک تازه شکلاتی با لایه خامه و گاناش.",
        ingredients: ["آرد", "شکلات", "خامه", "تخم‌مرغ"],
        price: "110,000 تومان",
        discount: 5,
        isVegan: false,
        sold: 220,
        rating: 4.6,
      },
      {
        id: 24,
        name: "باقلوا",
        description: "شیرینی سنتی با مغز پسته و شربت شیرین.",
        ingredients: ["خمیر یوفکا", "پسته", "شکر", "گلاب"],
        price: "100,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 310,
        rating: 4.8,
      },
      {
        id: 25,
        name: "اسموتی توت‌فرنگی",
        description: "نوشیدنی خنک با توت‌فرنگی تازه و شیر نارگیل.",
        ingredients: ["توت‌فرنگی", "شیر نارگیل", "یخ"],
        price: "70,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 180,
        rating: 4.4,
      },
    ],
  },
  {
    id: "appetizer",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
  {
    id: "appetizers2",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
  {
    id: "appetizers3",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
  {
    id: "appetizers4",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
  {
    id: "appetizers5",
    name: "پیش‌غذا",
    items: [
      {
        id: 1,
        name: "سالاد سزار",
        description:
          "سالادی خوشمزه با مرغ گریل‌شده، نان کروتان و سس مخصوص سزار.",
        ingredients: [
          "کاهو",
          "مرغ گریل‌شده",
          "پنیر پارمسان",
          "کروتان",
          "سس سزار",
        ],
        price: "120,000 تومان",
        discount: 10,
        isVegan: false,
        sold: 240,
        rating: 4.5,
      },
      {
        id: 2,
        name: "سوپ قارچ",
        description: "سوپ خامه‌ای با قارچ تازه و سبزیجات معطر.",
        ingredients: ["قارچ", "پیاز", "هویج", "خامه", "جعفری"],
        price: "85,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 180,
        rating: 4.2,
      },
      {
        id: 3,
        name: "حمص لبنانی",
        description: "پوره نخود با ارده و روغن زیتون، سرو شده با نان پیتا.",
        ingredients: ["نخود", "ارده", "روغن زیتون", "سیر", "لیمو"],
        price: "70,000 تومان",
        discount: 15,
        isVegan: true,
        sold: 300,
        rating: 4.7,
      },
      {
        id: 4,
        name: "بروسکتا",
        description: "نان تست‌شده با گوجه، ریحان و روغن زیتون.",
        ingredients: ["نان", "گوجه", "ریحان", "روغن زیتون"],
        price: "65,000 تومان",
        discount: 0,
        isVegan: true,
        sold: 120,
        rating: 4.1,
      },
      {
        id: 5,
        name: "دلمه برگ مو",
        description: "دلمه سنتی پر شده با برنج و سبزیجات.",
        ingredients: ["برگ مو", "برنج", "پیاز", "سبزیجات معطر"],
        price: "95,000 تومان",
        discount: 5,
        isVegan: true,
        sold: 210,
        rating: 4.4,
      },
      {
        id: 6,
        name: "میگو سوخاری",
        description: "میگوهای تازه سوخاری‌شده با سس تارتار.",
        ingredients: ["میگو", "آرد", "تخم‌مرغ", "ادویه"],
        price: "150,000 تومان",
        discount: 0,
        isVegan: false,
        sold: 340,
        rating: 4.6,
      },
    ],
  },
];
export default function Menu() {
  const [categories, setCategories] = useState(eternalCategories);
  const categoryRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [isItemDescriptionOpen, setIsItemDescriptionOpen] = useState(false);
  const cartRef = useRef(null);
  function handleItemClick(item) {
    setClickedItem(item);
    setIsItemDescriptionOpen(true);
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found. Login first!");
  //     return;
  //   }

  //   fetch("http://localhost:3001/api/menu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       name: "چلوکباب",
  //       category: "main",
  //       price: 50000,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("Added item:", data))
  //     .catch((err) => console.error("POST failed:", err));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/menu", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu items");
        return res.json();
      })
      .then((data) => console.log("Menu items:", data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    function mouseClickToClose(e) {
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(e.target)
      ) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", mouseClickToClose);
    return () => document.removeEventListener("mousedown", mouseClickToClose);
  }, [isCartOpen]);

  const scrollToCategory = (id) => {
    const el = categoryRefs.current[id];
    if (!el) return;
    const navHeight = document.querySelector(".navBar")?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === itemToAdd.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === itemToAdd.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };
  const handleDeleteFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };
  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === itemId);
      if (item.quantity > 1) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevCart.filter((i) => i.id !== itemId);
      }
    });
  };

  const handleSortChange = (sortType) => {
    const sortedCategories = eternalCategories.map((category) => {
      const sortedItems = [...category.items].sort((a, b) => {
        switch (sortType) {
          case "priceHighest": {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
            return priceB - priceA;
          }
          case "priceLowest": {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));

            return priceA - priceB;
          }

          case "rating":
            return b.rating - a.rating;

          case "sold":
            return b.sold - a.sold;

          case "discount":
            return b.discount - a.discount;

          case "vegan":
            if (a.isVegan && !b.isVegan) return -1;
            if (!a.isVegan && b.isVegan) return 1;
            return 0;

          default:
            return 0;
        }
      });

      return {
        ...category,
        items: sortedItems,
      };
    });

    setCategories(sortedCategories);
  };
  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-[#1b1e22] text-gray-200"
      dir="rtl"
    >
      <div className="flex-1 flex flex-col lg:w-3/4">
        <div className="navBar sticky top-0 z-40 bg-[#212529] shadow-md p-2">
          {/* دسته بندی ها */}
          <div className="flex-1 w-full overflow-x-auto mb-3">
            <NavBar
              categories={categories}
              activeCategory={activeCategory}
              scrollToCategory={scrollToCategory}
            />
          </div>

          {/* مرتب سازی */}
          <div className="flex justify-end">
            <SortItems onSortChange={handleSortChange} />
          </div>
        </div>

        {/* منو */}
        <div className="p-2 lg:p-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              ref={(el) => (categoryRefs.current[cat.id] = el)}
              id={cat.id}
              className="mb-12 lg:mb-16"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 border-b-2 border-[#1e88e5] pb-2">
                {cat.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {cat.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onItemClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* سبد خرید */}
      <div
        className={`${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0
        fixed lg:sticky top-0 right-0 z-50
        w-full max-w-md lg:w-1/4 lg:max-w-none
        h-screen lg:h-screen
        transition-transform duration-300 ease-in-out`}
      >
        <ShopingCart
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
          handleDeleteFromCart={handleDeleteFromCart} // Add this line
          isMobile={true}
          onClose={() => setIsCartOpen(false)}
        />
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50  lg:hidden"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 bg-[#1e88e5] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1565c0] transition"
      >
        🛒 سبد خرید ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </button>
      {isItemDescriptionOpen && clickedItem && (
        <ItemDescription
          item={clickedItem}
          onClose={() => {
            setIsItemDescriptionOpen(false);
            setClickedItem(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
