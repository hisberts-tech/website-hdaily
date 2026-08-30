import { PrismaClient, Category } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Mirrors the original hardcoded products from src/context/ProductContext.tsx
const products: {
  name: string;
  category: Category;
  price: number;
  unit: string;
  image: string;
  description: string;
  stock: number;
  badge?: string;
  bulkUnit?: string;
  bulkPrice?: number;
  bulkMinQty?: number;
}[] = [
  // Produits Frais
  { name: 'Tomates Fraîches', category: Category.frais, price: 150, unit: 'kg', image: '/images/sac du riz.webp', description: 'Tomates rouges juteuses, cultivées localement', stock: 50, badge: 'Bio', bulkUnit: 'caisse ~20 kg', bulkPrice: 2500, bulkMinQty: 1 },
  { name: 'Laitues Romaines', category: Category.frais, price: 80, unit: 'pièce', image: '/images/sac du riz.webp', description: 'Laitues fraîches et croquantes pour vos salades', stock: 30, badge: 'Nouveau', bulkUnit: 'caisse x24', bulkPrice: 1600, bulkMinQty: 1 },
  { name: 'Carottes Bio', category: Category.frais, price: 120, unit: 'kg', image: '/images/sac du riz.webp', description: 'Carottes douces et colorées, riches en vitamines', stock: 45, bulkUnit: 'sac 10 kg', bulkPrice: 1000, bulkMinQty: 1 },
  { name: 'Bananes Locales', category: Category.frais, price: 100, unit: 'douzaine', image: '/images/sac du riz.webp', description: 'Bananes sucrées cultivées en Haïti', stock: 100, badge: 'Local', bulkUnit: 'régime (~10 douzaines)', bulkPrice: 850, bulkMinQty: 1 },

  // Produits Alimentaires
  { name: 'Riz Premium', category: Category.alimentaires, price: 350, unit: 'marmite', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Riz de haute qualité, grain long', stock: 200, badge: 'Best-seller', bulkUnit: 'sac 25 kg', bulkPrice: 2800, bulkMinQty: 1 },
  { name: 'Pâtes Italiennes', category: Category.alimentaires, price: 280, unit: '500g', image: '/images/pexels-bertellifotografia-30893333.jpg', description: "Pâtes authentiques importées d'Italie", stock: 80, bulkUnit: 'carton x20', bulkPrice: 4800, bulkMinQty: 1 },
  { name: "Huile d'Olive Extra Vierge", category: Category.alimentaires, price: 850, unit: 'L', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Huile d\'olive premium, première pression à froid', stock: 40, badge: 'Premium', bulkUnit: 'carton 12 x 1 L', bulkPrice: 9000, bulkMinQty: 1 },
  { name: 'Farine de Blé', category: Category.alimentaires, price: 180, unit: 'marmite', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Farine de blé de qualité supérieure', stock: 150, bulkUnit: 'sac 25 kg', bulkPrice: 3800, bulkMinQty: 1 },

  // Produits Quotidiens
  { name: 'Savon Liquide', category: Category.quotidiens, price: 250, unit: 'L', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Savon liquide doux pour les mains', stock: 60, badge: 'Écologique', bulkUnit: 'carton 12 x 1 L', bulkPrice: 2500, bulkMinQty: 1 },
  { name: 'Essuie-tout', category: Category.quotidiens, price: 120, unit: 'paquet', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Essuie-tout de haute qualité, 3 rouleaux', stock: 100, bulkUnit: 'carton x24', bulkPrice: 2400, bulkMinQty: 1 },
  { name: 'Détergent Écologique', category: Category.quotidiens, price: 450, unit: 'L', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Détergent biodegradable pour sols', stock: 35, badge: 'Bio', bulkUnit: 'bidon 20 L', bulkPrice: 7800, bulkMinQty: 1 },
  { name: 'Sacs Poubelle', category: Category.quotidiens, price: 150, unit: 'paquet', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Sacs poubelle résistants, 30 unités', stock: 120, bulkUnit: 'carton x30', bulkPrice: 3600, bulkMinQty: 1 },
];

// Mirrors subscriptionPlans from src/pages/Abonnement.tsx
const plans = [
  {
    id: 'basic',
    name: 'Abonnement Basic',
    price: 2500,
    originalPrice: 3000,
    frequency: 'par semaine',
    description: 'Idéal pour les besoins essentiels',
    features: [
      'Livraison hebdomadaire',
      'Panier Basic personnalisé',
      '10% de réduction sur tous les produits',
      'Accès au crédit Express (jusqu\'à 5000 HTG)',
      'Support client prioritaire',
    ],
    popular: false,
  },
  {
    id: 'family',
    name: 'Abonnement Family',
    price: 4500,
    originalPrice: 5500,
    frequency: 'par semaine',
    description: 'Parfait pour toute la famille',
    features: [
      'Livraison hebdomadaire ou mensuelle',
      'Panier Family sur mesure',
      '15% de réduction sur tous les produits',
      'Accès au crédit Standard (jusqu\'à 15000 HTG)',
      'Livraison prioritaire',
      'Produits exclusifs',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Abonnement Premium',
    price: 7500,
    originalPrice: 9000,
    frequency: 'par semaine',
    description: "L'excellence H-Daily",
    features: [
      'Livraison flexible (hebdomadaire/mensuelle)',
      'Panier Premium ultra-personnalisé',
      '20% de réduction sur tous les produits',
      'Accès au crédit Premium (jusqu\'à 30000 HTG)',
      'Livraison express en moins de 12h',
      'Produits bio et rares',
      'Conseiller personnel dédié',
    ],
    popular: false,
  },
];

async function main() {
  console.log('Seeding database...');

  // Products: TRUNCATE with identity reset so IDs are always 1..12
  await prisma.$executeRaw`TRUNCATE "OrderItem", "Product" RESTART IDENTITY CASCADE`;
  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`  ${products.length} products seeded`);

  // Subscription plans (idempotent upsert by id)
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: plan,
      create: plan,
    });
  }
  console.log(`  ${plans.length} subscription plans seeded`);

  // Admin user (idempotent)
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@hdaily.ht';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'HdailyAdmin2024!';
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      fullName: 'H-Daily Admin',
      password: await bcrypt.hash(adminPassword, 10),
      role: 'admin',
    },
  });
  console.log(`  Admin user seeded (${adminEmail})`);

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
