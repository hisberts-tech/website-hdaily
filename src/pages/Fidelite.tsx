import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoyalty, TIERS, REWARDS, LoyaltyReward } from '../context/LoyaltyContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

const RewardCard: React.FC<{ reward: LoyaltyReward; available: number; onRedeem: (r: LoyaltyReward) => void }> = ({
  reward,
  available,
  onRedeem,
}) => {
  const { t } = useLanguage();
  const canAfford = available >= reward.pointsCost;
  const pct = Math.min(100, Math.round((available / reward.pointsCost) * 100));

  return (
    <div className={`bg-hd-surface rounded-2xl border p-6 flex flex-col gap-4 transition-all ${
      canAfford ? 'border-hd-primary/30 shadow-md hover:shadow-lg hover:-translate-y-0.5' : 'border-hd-border opacity-75'
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        reward.category === 'discount' ? 'bg-green-100' :
        reward.category === 'delivery' ? 'bg-blue-100' : 'bg-purple-100'
      }`}>
        <i className={`fas ${reward.icon} text-xl ${
          reward.category === 'discount' ? 'text-green-600' :
          reward.category === 'delivery' ? 'text-blue-600' : 'text-purple-600'
        }`}></i>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-hd-secondary text-lg">{reward.name}</h3>
        <p className="text-sm text-hd-text mt-1">{reward.description}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5 text-sm">
          <span className="font-bold text-hd-primary">{reward.pointsCost} pts</span>
          {!canAfford && (
            <span className="text-xs text-hd-muted">
              {t('fidelite.remaining')} {reward.pointsCost - available} {t('fidelite.remainingPts')}
            </span>
          )}
        </div>
        {!canAfford && (
          <div className="w-full bg-hd-light rounded-full h-1.5 mb-3">
            <div
              className="bg-hd-primary h-1.5 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            ></div>
          </div>
        )}
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canAfford}
          className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
            canAfford
              ? 'bg-hd-primary text-white hover:bg-hd-primary/90 shadow-sm hover:shadow-md'
              : 'bg-hd-light text-hd-muted cursor-not-allowed'
          }`}
        >
          {canAfford ? t('fidelite.redeemBtn') : t('fidelite.noPoints')}
        </button>
      </div>
    </div>
  );
};

const Fidelite: React.FC = () => {
  const {
    totalEarned,
    availablePoints,
    history,
    tierInfo,
    nextTier,
    pointsToNextTier,
    tierProgressPct,
    redeemReward,
  } = useLoyalty();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');

  const earningMethods = [
    { icon: 'fa-shopping-cart', title: t('fidelite.earn1Title'), description: t('fidelite.earn1Desc'), color: 'bg-hd-primary/10 text-hd-primary',   highlight: t('fidelite.earn1Highlight') },
    { icon: 'fa-crown',         title: t('fidelite.earn2Title'), description: t('fidelite.earn2Desc'), color: 'bg-yellow-100 text-yellow-700',         highlight: t('fidelite.earn2Highlight') },
    { icon: 'fa-star',          title: t('fidelite.earn3Title'), description: t('fidelite.earn3Desc'), color: 'bg-purple-100 text-purple-700',         highlight: t('fidelite.earn3Highlight') },
    { icon: 'fa-bolt',          title: t('fidelite.earn4Title'), description: t('fidelite.earn4Desc'), color: 'bg-blue-100 text-blue-700',             highlight: t('fidelite.earn4Highlight') },
  ];

  const handleRedeem = (reward: LoyaltyReward) => {
    const success = redeemReward(reward);
    if (success) {
      addNotification(
        `${reward.name} échangé ! Notre équipe vous contactera pour appliquer votre récompense.`,
        'success'
      );
    } else {
      addNotification('Points insuffisants pour cet échange.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-hd-cream">

      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('fidelite.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-hd-secondary leading-[1.1]">
            {t('fidelite.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('fidelite.title2')}</span>
          </h1>
          <p className="text-hd-text text-lg xl:text-xl max-w-2xl mx-auto mt-6 leading-relaxed font-light">
            {t('fidelite.subtitle')}
          </p>
        </div>
      </section>

      {/* Current Status */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 -mt-6 pb-16">
        <div className={`bg-hd-surface rounded-3xl shadow-xl border-2 ${tierInfo.borderColor} overflow-hidden max-w-3xl mx-auto`}>
          {/* Tier banner */}
          <div className={`${tierInfo.bgColor} px-8 py-5 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${tierInfo.bgColor} border-2 ${tierInfo.borderColor} flex items-center justify-center shadow-sm`}>
                <i className={`fas ${tierInfo.icon} text-2xl ${tierInfo.color}`}></i>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${tierInfo.color}`}>{t('fidelite.yourLevel')}</p>
                <p className={`text-2xl font-bold ${tierInfo.color}`}>{tierInfo.label}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-hd-muted uppercase tracking-wider">{t('fidelite.pointsAvailable')}</p>
              <p className={`text-3xl font-bold ${tierInfo.color}`}>{availablePoints.toLocaleString()}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-hd-border px-2">
            <div className="py-5 text-center">
              <p className="text-2xl font-bold text-hd-secondary">{totalEarned.toLocaleString()}</p>
              <p className="text-xs text-hd-muted mt-0.5">{t('fidelite.totalEarned')}</p>
            </div>
            <div className="py-5 text-center">
              <p className="text-2xl font-bold text-hd-secondary">{availablePoints.toLocaleString()}</p>
              <p className="text-xs text-hd-muted mt-0.5">{t('fidelite.toExchange')}</p>
            </div>
            <div className="py-5 text-center">
              <p className="text-2xl font-bold text-hd-secondary">{history.length}</p>
              <p className="text-xs text-hd-muted mt-0.5">{t('fidelite.transactions')}</p>
            </div>
          </div>

          {/* Progress to next tier */}
          <div className="px-8 pb-7">
            {nextTier ? (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span className={`font-semibold ${tierInfo.color}`}>{tierInfo.label}</span>
                  <span className={`font-semibold ${nextTier.color}`}>{nextTier.label}</span>
                </div>
                <div className="w-full bg-hd-light rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-700 bg-gradient-to-r from-hd-primary to-emerald-500"
                    style={{ width: `${tierProgressPct}%` }}
                  ></div>
                </div>
                <p className="text-xs text-hd-muted mt-2 text-center">
                  {t('fidelite.progressTo')} <strong className="text-hd-secondary">{pointsToNextTier.toLocaleString()} {t('fidelite.progressPts')}</strong> <strong className={nextTier.color}>{nextTier.label}</strong>
                </p>
              </>
            ) : (
              <div className="text-center">
                <i className="fas fa-gem text-purple-500 text-xl mb-1"></i>
                <p className="text-sm font-semibold text-purple-600">{t('fidelite.maxLevel')}</p>
              </div>
            )}
          </div>

          {/* Current tier benefit */}
          <div className="bg-hd-cream border-t border-hd-border px-8 py-4 flex items-center gap-3">
            <i className="fas fa-check-circle text-hd-primary text-lg flex-shrink-0"></i>
            <p className="text-sm text-hd-secondary">
              <span className="font-semibold">{t('fidelite.currentBenefit')}</span> {tierInfo.benefit}
            </p>
          </div>
        </div>
      </section>

      {/* How to earn */}
      <section className="py-16 bg-hd-surface">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-hd-primary font-bold">{t('fidelite.howBadge')}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-hd-secondary mt-3">{t('fidelite.howTitle')}</h2>
            <div className="w-20 h-1 bg-hd-primary mx-auto my-5 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningMethods.map((method, i) => (
              <div key={i} className="bg-hd-cream rounded-2xl p-6 text-center border border-hd-border/50">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${method.color}`}>
                  <i className={`fas ${method.icon} text-xl`}></i>
                </div>
                <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${method.color}`}>
                  {method.highlight}
                </div>
                <h3 className="font-semibold text-hd-secondary mb-1">{method.title}</h3>
                <p className="text-sm text-hd-text">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier overview */}
      <section className="py-16 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-[0.3em] text-hd-primary font-bold">{t('fidelite.tiersLabel')}</span>
          <h2 className="text-3xl md:text-4xl font-serif text-hd-secondary mt-3">{t('fidelite.tiersTitle')}</h2>
          <div className="w-20 h-1 bg-hd-primary mx-auto my-5 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => {
            const isCurrentTier = tier.tier === tierInfo.tier;
            return (
              <div
                key={tier.tier}
                className={`rounded-2xl border-2 p-6 text-center transition-all ${
                  isCurrentTier
                    ? `${tier.borderColor} ${tier.bgColor} shadow-lg ring-2 ${tier.ringColor} ring-offset-2`
                    : 'border-hd-border bg-hd-surface'
                }`}
              >
                {isCurrentTier && (
                  <span className="inline-block bg-hd-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">
                    {t('fidelite.yourLevel')}
                  </span>
                )}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${tier.bgColor} border-2 ${tier.borderColor}`}>
                  <i className={`fas ${tier.icon} text-2xl ${tier.color}`}></i>
                </div>
                <h3 className={`text-xl font-bold mb-1 ${tier.color}`}>{tier.label}</h3>
                <p className="text-xs text-hd-muted mb-4">
                  {tier.maxPoints
                    ? `${tier.minPoints.toLocaleString()} – ${tier.maxPoints.toLocaleString()} pts`
                    : `${tier.minPoints.toLocaleString()}+ pts`}
                </p>
                <p className={`text-sm font-medium ${tier.color}`}>{tier.discountPct}% de réduction</p>
                <p className="text-xs text-hd-text mt-2 leading-relaxed">{tier.benefit}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rewards & History tabs */}
      <section className="py-16 bg-hd-surface">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-hd-primary font-bold">{t('fidelite.rewardsLabel')}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-hd-secondary mt-1">{t('fidelite.rewardsTitle')}</h2>
            </div>
            <div className="flex gap-2 bg-hd-cream p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'rewards' ? 'bg-hd-surface shadow text-hd-secondary' : 'text-hd-muted hover:text-hd-secondary'
                }`}
              >
                <i className="fas fa-gift mr-2"></i>{t('fidelite.tabRewards')}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'history' ? 'bg-hd-surface shadow text-hd-secondary' : 'text-hd-muted hover:text-hd-secondary'
                }`}
              >
                <i className="fas fa-history mr-2"></i>{t('fidelite.tabHistory')}
              </button>
            </div>
          </div>

          {/* Rewards catalog */}
          {activeTab === 'rewards' && (
            <>
              <div className="bg-hd-primary/5 border border-hd-primary/20 rounded-xl px-5 py-3 mb-8 flex items-center gap-3">
                <i className="fas fa-info-circle text-hd-primary flex-shrink-0"></i>
                <p className="text-sm text-hd-secondary">
                  {t('fidelite.redeemInfo')} <strong>{availablePoints.toLocaleString()} points</strong> {t('fidelite.redeemInfo2')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {REWARDS.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    available={availablePoints}
                    onRedeem={handleRedeem}
                  />
                ))}
              </div>
              {availablePoints === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-hd-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shopping-bag text-3xl text-hd-muted"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-hd-secondary mb-2">{t('fidelite.emptyRewards')}</h3>
                  <p className="text-hd-text mb-6">{t('fidelite.emptyRewardsDesc')}</p>
                  <Link to="/boutique" className="btn-primary inline-flex items-center gap-2">
                    <i className="fas fa-shopping-cart"></i> {t('fidelite.shopBtn')}
                  </Link>
                </div>
              )}
            </>
          )}

          {/* History */}
          {activeTab === 'history' && (
            <>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-hd-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-history text-3xl text-hd-muted"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-hd-secondary mb-2">{t('fidelite.emptyHistory')}</h3>
                  <p className="text-hd-text">{t('fidelite.emptyHistoryDesc')}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-hd-border overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-hd-cream border-b border-hd-border">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-bold text-hd-muted uppercase tracking-wider">{t('fidelite.histDate')}</th>
                        <th className="text-left px-6 py-3 text-xs font-bold text-hd-muted uppercase tracking-wider">{t('fidelite.histDesc')}</th>
                        <th className="text-right px-6 py-3 text-xs font-bold text-hd-muted uppercase tracking-wider">{t('fidelite.histPts')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hd-border">
                      {history.map((entry) => (
                        <tr key={entry.id} className="bg-hd-surface hover:bg-hd-cream transition-colors">
                          <td className="px-6 py-4 text-hd-muted whitespace-nowrap">{entry.date}</td>
                          <td className="px-6 py-4 text-hd-secondary font-medium">{entry.description}</td>
                          <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${
                            entry.type === 'earn' ? 'text-green-600' : 'text-red-500'
                          }`}>
                            {entry.type === 'earn' ? '+' : ''}{entry.points.toLocaleString()} pts
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-hd-cream to-hd-surface border-t border-hd-border">
        <div className="text-center max-w-2xl mx-auto">
          <i className="fas fa-gem text-4xl text-purple-500 mb-4 block"></i>
          <h2 className="font-serif text-3xl md:text-4xl text-hd-secondary mb-4">{t('fidelite.ctaTitle')}</h2>
          <p className="text-hd-text text-lg mb-8 leading-relaxed">{t('fidelite.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/boutique" className="btn-primary flex justify-center items-center gap-2 px-8 py-4 text-lg">
              <i className="fas fa-shopping-cart"></i> {t('fidelite.ctaShop')}
            </Link>
            <Link to="/abonnement" className="btn-secondary flex justify-center items-center gap-2 px-8 py-4 text-lg">
              <i className="fas fa-crown"></i> {t('fidelite.ctaSub')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fidelite;
