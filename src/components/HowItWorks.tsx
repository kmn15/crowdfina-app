import React from 'react';
import { 
  UserPlus, 
  Search, 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  BarChart, 
  Building2, 
  Banknote 
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: t('howItWorks.steps.signup.title'),
      description: t('howItWorks.steps.signup.description')
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: t('howItWorks.steps.browse.title'),
      description: t('howItWorks.steps.browse.description')
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: t('howItWorks.steps.invest.title'),
      description: t('howItWorks.steps.invest.description')
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('howItWorks.steps.earn.title'),
      description: t('howItWorks.steps.earn.description')
    }
  ];

  const benefits = [
    {
      icon: <PiggyBank className="h-12 w-12" />,
      title: t('howItWorks.benefits.minimumInvestment.title'),
      description: t('howItWorks.benefits.minimumInvestment.description')
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: t('howItWorks.benefits.premiumProperties.title'),
      description: t('howItWorks.benefits.premiumProperties.description')
    },
    {
      icon: <BarChart className="h-12 w-12" />,
      title: t('howItWorks.benefits.diversification.title'),
      description: t('howItWorks.benefits.diversification.description')
    },
    {
      icon: <Banknote className="h-12 w-12" />,
      title: t('howItWorks.benefits.returns.title'),
      description: t('howItWorks.benefits.returns.description')
    }
  ];

  const faqs = [
    {
      question: t('howItWorks.faq.questions.minimumInvestment.question'),
      answer: t('howItWorks.faq.questions.minimumInvestment.answer')
    },
    {
      question: t('howItWorks.faq.questions.returns.question'),
      answer: t('howItWorks.faq.questions.returns.answer')
    },
    {
      question: t('howItWorks.faq.questions.security.question'),
      answer: t('howItWorks.faq.questions.security.answer')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 dark:text-white">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('howItWorks.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('howItWorks.subtitle')}
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
                  <div className="text-orange-500 dark:text-orange-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t('howItWorks.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-orange-500 dark:text-orange-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('howItWorks.faq.title')}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 dark:bg-orange-600 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('howItWorks.cta.title')}
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            {t('howItWorks.cta.subtitle')}
          </p>
          <button className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {t('howItWorks.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
} 