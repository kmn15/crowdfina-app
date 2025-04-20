import React from 'react';
import { Shield, Users, TrendingUp, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '50K+', label: t('about.stats.activeInvestors') },
    { icon: <Globe className="h-6 w-6" />, value: '20+', label: t('about.stats.countries') },
    { icon: <TrendingUp className="h-6 w-6" />, value: '$100M+', label: t('about.stats.totalInvestments') },
    { icon: <Shield className="h-6 w-6" />, value: '99.9%', label: t('about.stats.successRate') },
  ];

  const milestones = [
    {
      year: '2018',
      title: t('about.journey.milestones.founded.title'),
      description: t('about.journey.milestones.founded.description')
    },
    {
      year: '2019',
      title: t('about.journey.milestones.firstProperty.title'),
      description: t('about.journey.milestones.firstProperty.description')
    },
    {
      year: '2020',
      title: t('about.journey.milestones.expansion.title'),
      description: t('about.journey.milestones.expansion.description')
    },
    {
      year: '2023',
      title: t('about.journey.milestones.milestone.title'),
      description: t('about.journey.milestones.milestone.description')
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Sarah Johnson',
      role: t('about.team.roles.ceo'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Michael Chen',
      role: t('about.team.roles.cio'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: t('about.team.roles.operations'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'David Kim',
      role: t('about.team.roles.tech'),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            {t('about.hero.description')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-orange-500 dark:text-orange-400">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t('about.journey.title')}
          </h2>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-24 flex-shrink-0 text-right">
                  <div className="text-xl font-bold text-orange-500 dark:text-orange-400">{milestone.year}</div>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-gray-200 dark:border-gray-700 pl-8 relative">
                  <div className="absolute w-4 h-4 bg-orange-500 dark:bg-orange-400 rounded-full -left-[9px] top-1" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t('about.team.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-16 text-gray-900 dark:text-white">
            {t('about.values.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('about.values.trust.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.trust.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('about.values.community.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.community.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('about.values.innovation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.innovation.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 