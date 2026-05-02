# H-Daily Premium - React Application

Une application React premium pour l'épicerie H-Daily en Haïti, offrant une expérience utilisateur moderne avec gestion du panier, abonnements, et services de crédit.

## 🚀 Fonctionnalités

- **Catalogue de produits** avec filtrage par catégorie
- **Panier d'achat** avec gestion en temps réel
- **Paniers pré-faits** personnalisables
- **Services d'abonnement** (Basic, Premium, VIP)
- **Service de crédit** avec demande en ligne
- **Design responsive** pour mobile et desktop
- **Intégration WhatsApp** pour les commandes
- **Système de notifications** élégant

## 🛠️ Stack Technique

- **React 18** avec TypeScript
- **Vite** pour le développement rapide
- **Tailwind CSS** pour le styling premium
- **React Router** pour la navigation
- **Context API** pour la gestion d'état
- **Font Awesome** pour les icônes
- **Google Fonts** (Inter, Cormorant Garamond)

## 📁 Structure du Projet

```
website-hdaily/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/          # Images du site
│   │   └── styles/          # Styles globaux
│   ├── components/         # Composants réutilisables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Cart.tsx
│   │   ├── Layout.tsx
│   │   ├── Notifications.tsx
│   │   ├── SubscriptionModal.tsx
│   │   └── CreditModal.tsx
│   ├── context/           # Gestion d'état global
│   │   ├── CartContext.tsx
│   │   ├── ProductContext.tsx
│   │   └── NotificationContext.tsx
│   ├── pages/             # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── Boutique.tsx
│   │   ├── Paniers.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   ├── types/             # Définitions TypeScript
│   │   └── index.ts
│   ├── utils/             # Fonctions utilitaires
│   ├── hooks/             # Hooks personnalisés
│   ├── App.tsx            # Composant principal
│   ├── main.tsx           # Point d'entrée
│   └── assets/styles/globals.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Couleurs
- **Primary**: `#10b981` (Vert H-Daily)
- **Secondary**: `#1F2A2E` (Gris foncé)
- **Cream**: `#FDF9F2` (Arrière-plan premium)
- **Light**: `#F5F0E8` (Variant clair)
- **Border**: `#E8DFD3` (Bordures subtiles)

### Typographie
- **Serif**: Cormorant Garamond (titres, branding)
- **Sans**: Inter (texte, interfaces)

### Composants UI
- **Boutons**: `btn-primary`, `btn-secondary`, `btn-outline`
- **Cartes**: `card-premium` avec effets hover
- **Badges**: `badge-popular`, `badge-new`
- **Animations**: `animate-fade-in`, `animate-slide-up`, `animate-bounce-in`

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   cd "c:\Users\Hp\new hdaily\website-hdaily"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir le navigateur**
   - L'application sera disponible sur `http://localhost:3000`

## 📦 Build de Production

```bash
# Build pour production
npm run build

# Vérifier le build
npm run preview
```

## 🎯 Fonctionnalités Clés

### Gestion du Panier
- Ajout/suppression de produits
- Modification des quantités
- Calcul automatique du total
- Persistance dans localStorage
- Export WhatsApp pour commande

### Catalogue de Produits
- 12 produits par défaut (frais, alimentaires, quotidiens)
- Filtrage par catégorie
- Recherche en temps réel
- Gestion des stocks
- Badges (Bio, Nouveau, Local, Premium)

### Paniers Pré-faits
- 6 paniers prédéfinis
- Personnalisation sur demande
- Prix dégressifs
- Livraison prioritaire

### Services Premium
- **Abonnements**: 3 niveaux (Basic: 1500 HTG/semaine, Premium: 2500 HTG/semaine, VIP: 4000 HTG/semaine)
- **Crédit**: 3 options (Express: 5000 HTG, Standard: 15000 HTG, Premium: 30000 HTG)
- Demande en ligne avec validation

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env.local` pour la configuration:
```env
VITE_WHATSAPP_NUMBER=50939134651
VITE_EMAIL_CONTACT=hisberts@gmail.com
VITE_COMPANY_NAME=H-Daily
```

### Personnalisation
- **Couleurs**: Modifier `tailwind.config.js`
- **Polices**: Mettre à jour `index.html`
- **Produits**: Éditer `src/context/ProductContext.tsx`
- **Routes**: Configurer dans `src/App.tsx`

## 📱 Responsive Design

- **Mobile**: Navigation inférieure, design optimisé pour tactile
- **Tablet**: Adaptation automatique des grilles
- **Desktop**: Expérience complète avec tous les composants

## 🔄 État de l'Application

### Context Providers
- **CartContext**: Gestion du panier et des commandes
- **ProductContext**: Catalogue et filtrage des produits
- **NotificationContext**: Système de notifications toast

### Persistance
- **LocalStorage**: Panier, préférences utilisateur
- **SessionStorage**: Données temporaires de session

## 🚀 Déploiement

### Build Optimisé
```bash
npm run build
```

Le build génère:
- Bundle JavaScript optimisé
- CSS minifié avec Tailwind
- Assets optimisés
- Source maps pour debugging

### Déploiement sur Vercel/Netlify
1. Connecter le repository Git
2. Configurer les variables d'environnement
3. Déployer automatiquement sur `main`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE pour les détails.

## 🆘 Support

- **Email**: hisberts@gmail.com
- **Téléphone**: +509 3913 4651
- **WhatsApp**: https://wa.me/50939134651

---

**H-Daily Premium** - L'élégance du goût, livrée chez vous.
