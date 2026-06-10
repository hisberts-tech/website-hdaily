import { PrismaClient, Category } from '@prisma/client';

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
}[] = [
  // Produits Frais
  { name: 'Tomates Fraîches', category: Category.frais, price: 150, unit: 'kg', image: '/images/sac du riz.webp', description: 'Tomates rouges juteuses, cultivées localement', stock: 50, badge: 'Bio' },
  { name: 'Laitues Romaines', category: Category.frais, price: 80, unit: 'pièce', image: '/images/sac du riz.webp', description: 'Laitues fraîches et croquantes pour vos salades', stock: 30, badge: 'Nouveau' },
  { name: 'Carottes Bio', category: Category.frais, price: 120, unit: 'kg', image: '/images/sac du riz.webp', description: 'Carottes douces et colorées, riches en vitamines', stock: 45 },
  { name: 'Bananes Locales', category: Category.frais, price: 100, unit: 'douzaine', image: '/images/sac du riz.webp', description: 'Bananes sucrées cultivées en Haïti', stock: 100, badge: 'Local' },

  // Produits Alimentaires
  { name: 'Riz Premium', category: Category.alimentaires, price: 350, unit: 'kg', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Riz de haute qualité, grain long', stock: 200, badge: 'Best-seller' },
  { name: 'Pâtes Italiennes', category: Category.alimentaires, price: 280, unit: '500g', image: '/images/pexels-bertellifotografia-30893333.jpg', description: "Pâtes authentiques importées d'Italie", stock: 80 },
  { name: "Huile d'Olive Extra Vierge", category: Category.alimentaires, price: 850, unit: 'L', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Huile d\'olive premium, première pression à froid', stock: 40, badge: 'Premium' },
  { name: 'Farine de Blé', category: Category.alimentaires, price: 180, unit: 'kg', image: '/images/pexels-bertellifotografia-30893333.jpg', description: 'Farine de blé de qualité supérieure', stock: 150 },

  // Produits Quotidiens
  { name: 'Savon Liquide', category: Category.quotidiens, price: 250, unit: 'L', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Savon liquide doux pour les mains', stock: 60, badge: 'Écologique' },
  { name: 'Essuie-tout', category: Category.quotidiens, price: 120, unit: 'paquet', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Essuie-tout de haute qualité, 3 rouleaux', stock: 100 },
  { name: 'Détergent Écologique', category: Category.quotidiens, price: 450, unit: 'L', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Détergent biodegradable pour sols', stock: 35, badge: 'Bio' },
  { name: 'Sacs Poubelle', category: Category.quotidiens, price: 150, unit: 'paquet', image: '/images/pexels-david-iloba-28486424-14881644.jpg', description: 'Sacs poubelle résistants, 30 unités', stock: 120 },
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

  // Products: reset so ids stay deterministic (1..12)
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
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
