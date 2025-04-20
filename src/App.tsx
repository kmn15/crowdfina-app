import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TrendingUp, ChevronRight, DollarSign, Cloud, Headphones, Menu } from 'lucide-react';
import Properties from './components/Properties';
import WaitlistModal from './components/WaitlistModal';
import PropertyDetail from './components/PropertyDetail';
import MobileDrawer from './components/MobileDrawer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HowItWorks from './components/HowItWorks';
import ContactUs from './components/ContactUs';
import ChatBubble from './components/ChatBubble';
import Dashboard from './components/Dashboard';
import MyInvestments from './components/MyInvestments';
import SupportTicket from './components/SupportTicket';
import ProfitHistory from './components/ProfitHistory';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transactions from './components/Transactions';
import Referrals from './components/Referrals';
import ProfileSettings from './components/ProfileSettings';
import ChangePassword from './components/ChangePassword';
import TwoFactorAuth from './components/TwoFactorAuth';
import Logout from './components/Logout';
import AboutPage from './components/AboutPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('hasSeenWaitlistModal');
    if (!hasSeenModal) {
      setShowWaitlist(true);
      localStorage.setItem('hasSeenWaitlistModal', 'true');
    }
  }, []);

  const cities = [
    {
      name: 'New York',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'London',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const properties = [
    {
      title: 'Luxury Condominium',
      location: 'Manhattan, New York',
      price: '$2,500,000',
      yield: '8.5%',
      image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Modern Heritage Townhouse',
      location: 'Chelsea, London',
      price: '$4,200,000',
      yield: '7.2%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Beachfront Residence',
      location: 'Palm Jumeirah, Dubai',
      price: '$3,800,000',
      yield: '9.1%',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <WaitlistModal 
          isOpen={showWaitlist} 
          onClose={() => setShowWaitlist(false)} 
        />
        
        {/* Mobile Drawer */}
        <MobileDrawer 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 py-4 px-6 shadow-sm fixed w-full z-40">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.svg" 
                alt="CrowdFina Logo" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                CrowdFina
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
                {t('navigation.home')}
              </Link>
              <Link to="/properties" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
                {t('navigation.properties')}
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
                {t('navigation.howItWorks')}
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
                {t('navigation.contact')}
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
                {t('navigation.about')}
              </Link>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4 dark:text-white">
              <Link 
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-orange-500 font-medium dark:text-gray-300 dark:hover:text-orange-500"
              >
                {t('navigation.login')}
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                {t('navigation.signUp')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investments" element={<MyInvestments />} />
          <Route path="/support" element={<SupportTicket />} />
          <Route path="/profit-history" element={<ProfitHistory />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <section className="pt-32 pb-20 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                        {t('home.hero.title')}
                      </h1>
                      <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                        {t('home.hero.description')}
                      </p>
                      <div className="mt-8 flex gap-4">
                        <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600">
                          {t('common.startInvesting')}
                        </button>
                        <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-orange-500 hover:text-orange-500 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-500">
                          {t('common.learnMore')}
                        </button>
                      </div>
                      <div className="mt-12 grid grid-cols-3 gap-8">
                        <div>
                          <p className="text-3xl font-bold text-orange-500">8%</p>
                          <p className="text-gray-600 dark:text-gray-300">{t('home.stats.averageReturns')}</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-orange-500">3k+</p>
                          <p className="text-gray-600 dark:text-gray-300">{t('home.stats.activeInvestors')}</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-orange-500">20+</p>
                          <p className="text-gray-600 dark:text-gray-300">{t('home.stats.globalMarkets')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                        alt="Lighthouse"
                        className="rounded-2xl shadow-lg"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
                        alt="Luxury Interior"
                        className="rounded-2xl shadow-lg mt-8"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Invest Section */}
              <section className="py-20 px-6 bg-white dark:bg-gray-900">
                <div className="container mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    {t('home.whyInvest.title')}
                  </h2>
                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <DollarSign className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('home.whyInvest.passiveIncome.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('home.whyInvest.passiveIncome.description')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrendingUp className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('home.whyInvest.capitalGrowth.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('home.whyInvest.capitalGrowth.description')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Cloud className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('home.whyInvest.portfolioDiversity.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('home.whyInvest.portfolioDiversity.description')}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Headphones className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('home.whyInvest.expertSupport.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('home.whyInvest.expertSupport.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Latest Properties */}
              <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('home.properties.title')}</h2>
                    <Link to="/properties" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 flex items-center gap-2">
                      {t('common.viewAll')} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {properties.map((property, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{property.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{property.location}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">{t('home.properties.price')}</p>
                              <p className="text-xl font-bold text-gray-900 dark:text-white">{property.price}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">{t('home.properties.expectedYield')}</p>
                              <p className="text-xl font-bold text-orange-500 dark:text-orange-400">{property.yield}</p>
                            </div>
                          </div>
                          <Link 
                            to="/properties" 
                            className="block w-full mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-center dark:bg-orange-600 dark:hover:bg-orange-700"
                          >
                            {t('common.investNow')}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Explore Cities */}
              <section className="py-20 px-6">
                <div className="container mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('home.cities.title')}</h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    {cities.map((city, index) => (
                      <div key={index} className="relative group cursor-pointer overflow-hidden rounded-xl">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <h3 className="text-white text-xl font-bold p-6">{city.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900">
                <div className="container mx-auto max-w-4xl text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                    {t('common.stayUpdated')}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
                    {t('common.newsletterText')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder={t('common.enterEmail')}
                      className="w-full flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                      {t('common.subscribe')}
                    </button>
                  </div>
                </div>
              </section>
            </>
          } />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-6 md:pl-72">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">{t('common.footer.invest')}</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.signUp')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.browseProperties')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.contactUs')}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">{t('common.footer.learn')}</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.learningCenter')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.helpFaq')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.howItWorks')}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">{t('common.footer.links')}</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.aboutUs')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.privacyPolicy')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-green-500" />
                      <span>{t('common.footer.termsConditions')}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-center">
                © {new Date().getFullYear()} CrowdFina. {t('common.footer.allRightsReserved')}
              </p>
            </div>
          </div>
        </footer>

        {/* Chat Support Bubble */}
        <ChatBubble />
      </div>
    </Router>
  );
}

export default App;