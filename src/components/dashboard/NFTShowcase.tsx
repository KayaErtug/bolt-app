import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Star, 
  Calendar, 
  Users,
  Coins,
  ExternalLink,
  Grid,
  List,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  totalSupply: number;
  mintPrice: string;
  launchDate: string;
  status: 'upcoming' | 'minting' | 'sold-out' | 'completed';
  category: 'genesis' | 'special' | 'community' | 'limited';
}

const NFTShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'minting' | 'completed'>('all');

  const collections: NFTCollection[] = [
    {
      id: '1',
      name: 'Maris Genesis Collection',
      description: 'The first and most exclusive NFT collection from Maris Coin, featuring unique digital art pieces that represent the early days of our community.',
      image: 'https://images.pexels.com/photos/3419753/pexels-photo-3419753.jpeg?auto=compress&cs=tinysrgb&w=800',
      totalSupply: 1000,
      mintPrice: '0.05 ETH',
      launchDate: '2026-03-06',
      status: 'upcoming',
      category: 'genesis'
    },
    {
      id: '2',
      name: 'Community Heroes',
      description: 'Celebrating our most active community members with special NFT rewards featuring heroic characters and exclusive perks.',
      image: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=800',
      totalSupply: 500,
      mintPrice: '0.03 ETH',
      launchDate: '2026-04-01',
      status: 'upcoming',
      category: 'community'
    },
    {
      id: '3',
      name: 'Digital Artifacts',
      description: 'Limited edition digital artifacts that showcase the evolution of blockchain technology and decentralized finance.',
      image: 'https://images.pexels.com/photos/8290687/pexels-photo-8290687.jpeg?auto=compress&cs=tinysrgb&w=800',
      totalSupply: 250,
      mintPrice: '0.1 ETH',
      launchDate: '2026-05-15',
      status: 'upcoming',
      category: 'limited'
    },
    {
      id: '4',
      name: 'Maris Cosmos',
      description: 'Explore the vast Maris universe with these cosmic-themed NFTs featuring planets, stars, and celestial bodies.',
      image: 'https://images.pexels.com/photos/12935080/pexels-photo-12935080.jpeg?auto=compress&cs=tinysrgb&w=800',
      totalSupply: 750,
      mintPrice: '0.04 ETH',
      launchDate: '2026-06-20',
      status: 'upcoming',
      category: 'special'
    }
  ];

  const filteredCollections = filter === 'all' ? collections : collections.filter(c => c.status === filter);

  const statusClasses = {
    upcoming: 'bg-sky-500/20 text-sky-300',
    minting: 'bg-emerald-500/20 text-emerald-300',
    'sold-out': 'bg-red-500/20 text-red-300',
    completed: 'bg-white/20 text-white/70'
  };

  const categoryGradients = {
    genesis: 'from-yellow-500 to-orange-500',
    special: 'from-purple-500 to-pink-500',
    community: 'from-emerald-500 to-sky-500',
    limited: 'from-red-500 to-red-600'
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 backdrop-blur-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-emerald-400" />
            NFT Collections
          </h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total Collections</p>
                  <p className="text-2xl font-bold">{collections.length}</p>
                </div>
                <ImageIcon className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Total NFTs</p>
                  <p className="text-2xl font-bold">
                    {collections.reduce((s, c) => s + c.totalSupply, 0)}
                  </p>
                </div>
                <Star className="w-7 h-7 text-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Upcoming</p>
                  <p className="text-2xl font-bold">
                    {collections.filter(c => c.status === 'upcoming').length}
                  </p>
                </div>
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Community</p>
                  <p className="text-2xl font-bold">50K+</p>
                </div>
                <Users className="w-7 h-7 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Filter + View Mode */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <div className="flex gap-1">
                {[
                  { key: 'all', label: 'All Collections' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'minting', label: 'Minting' },
                  { key: 'completed', label: 'Completed' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key as any)}
                    className={`px-6 py-3 rounded-lg transition ${
                      filter === opt.key
                        ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition ${
                    viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${
                    viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className={`rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition hover:border-emerald-500/40 backdrop-blur-md group ${
                  viewMode === 'grid' ? '' : 'flex gap-6'
                }`}
              >
                <div className={viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48 flex-shrink-0'}>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{collection.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusClasses[collection.status]}`}>
                          {collection.status.replace('-', ' ')}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full text-white font-medium capitalize bg-gradient-to-r ${categoryGradients[collection.category]}`}>
                          {collection.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm mb-4 line-clamp-3">{collection.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Total Supply</span>
                      <span className="font-semibold">{collection.totalSupply.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Mint Price</span>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">{collection.mintPrice}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Launch Date</span>
                      <span className="font-semibold">{collection.launchDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg hover:from-emerald-600 hover:to-sky-600 transition">
                      {collection.status === 'upcoming' ? 'Notify Me' : 'View Collection'}
                    </button>
                    <button className="p-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full grid place-items-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-semibold text-white/80 mb-2">No collections found</h3>
              <p className="text-white/60">Try selecting a different filter</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NFTShowcase;
