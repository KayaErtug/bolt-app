import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone,
  Book,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Users,
  FileText,
  Lightbulb
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I earn points on Maris Coin?',
      answer: 'You can earn points through various activities: daily login (10 points), completing tasks (15-100 points), referring friends (100 points each), participating in quizzes (25-75 points), and social media activities (15-50 points). The more active you are, the more points you can accumulate!',
      category: 'earning'
    },
    {
      id: '2',
      question: 'When will Maris Coin launch?',
      answer: 'Maris Coin is scheduled to launch on March 6, 2026. This is our official launch date when the token will become available. Until then, you can participate in our community activities and earn points that will be converted to tokens upon launch.',
      category: 'general'
    },
    {
      id: '3',
      question: 'How does the referral system work?',
      answer: 'Share your unique referral code with friends. When they sign up and complete their first task, you earn 100 points and they receive a welcome bonus. There are different reward tiers: Bronze (1-4 referrals), Silver (5-9 referrals), and Gold (10+ referrals) with increasing bonuses.',
      category: 'referrals'
    },
    {
      id: '4',
      question: 'What are NFT collections and how can I get them?',
      answer: 'Our NFT collections are exclusive digital art pieces that represent different aspects of the Maris Coin ecosystem. You can participate in upcoming drops by earning points, being active in the community, or purchasing them during mint events. Each collection has unique utilities and benefits.',
      category: 'nft'
    },
    {
      id: '5',
      question: 'How do I level up my account?',
      answer: 'Your level increases based on your total points accumulated. Each level requires 500 points (Level 1: 0-499 points, Level 2: 500-999 points, etc.). Higher levels unlock exclusive features, better rewards, and special privileges in the community.',
      category: 'account'
    },
    {
      id: '6',
      question: 'Can I connect multiple wallets to my account?',
      answer: 'Currently, you can connect one primary wallet address per account. We support MetaMask, WalletConnect, and other major Web3 wallets. You can update your wallet address in your profile settings if needed.',
      category: 'account'
    },
    {
      id: '7',
      question: 'What happens to my points after the token launch?',
      answer: 'Your accumulated points will be converted to Maris Coin tokens at a predetermined conversion rate announced closer to the launch date. The exact ratio will be communicated to all users well in advance of the March 6, 2026 launch.',
      category: 'general'
    },
    {
      id: '8',
      question: 'How can I track my progress and achievements?',
      answer: 'Visit the Portfolio section to see your detailed progress, including points history, achievements unlocked, level progression, and ranking. The Dashboard also provides a quick overview of your recent activities and upcoming tasks.',
      category: 'account'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Topics', count: faqData.length },
    { key: 'general', label: 'General', count: faqData.filter(faq => faq.category === 'general').length },
    { key: 'earning', label: 'Earning Points', count: faqData.filter(faq => faq.category === 'earning').length },
    { key: 'referrals', label: 'Referrals', count: faqData.filter(faq => faq.category === 'referrals').length },
    { key: 'account', label: 'Account', count: faqData.filter(faq => faq.category === 'account').length },
    { key: 'nft', label: 'NFTs', count: faqData.filter(faq => faq.category === 'nft').length }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Help Center</h1>
        <p className="text-gray-400 mt-1">Find answers to common questions and get support</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
              <MessageCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Live Chat</h3>
              <p className="text-gray-400 text-sm">Get instant help from our team</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Email Support</h3>
              <p className="text-gray-400 text-sm">Send us a detailed message</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Community</h3>
              <p className="text-gray-400 text-sm">Join our Telegram or Discord</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Book className="w-5 h-5 mr-2 text-emerald-500" />
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category.label}</span>
                  <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Frequently Asked Questions
            </h2>
            <span className="text-gray-400 text-sm">
              {filteredFAQs.length} article{filteredFAQs.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <h3 className="text-white font-medium">{faq.question}</h3>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6 border-t border-gray-700">
                      <div className="pt-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-white">Still need help?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-white font-medium">Email</span>
            </div>
            <p className="text-gray-400 text-sm">support@mariscoin.com</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-white font-medium">Telegram</span>
            </div>
            <p className="text-gray-400 text-sm">@MarisCoinSupport</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-white font-medium">Discord</span>
            </div>
            <p className="text-gray-400 text-sm">MarisCommunity</p>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <span className="text-white font-medium">Documentation</span>
            </div>
            <p className="text-gray-400 text-sm">docs.mariscoin.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;