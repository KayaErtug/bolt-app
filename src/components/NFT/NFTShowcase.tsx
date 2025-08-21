import React, { useState } from 'react';
import { 
  Image, 
  Star, 
  Calendar, 
  Users,
  Coins,
  ExternalLink,
  Filter,
  Grid,
  List
} from 'lucide-react';

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

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(collection => collection.status === filter);

  const statusColors = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    minting: 'bg-green-500/20 text-green-400',
    'sold-out': 'bg-red-500/20 text-red-400',
    completed: 'bg-gray-500/20 text-gray-400'
  };

  const categoryColors = {
    genesis: 'from-yellow-500 to-orange-500',
    special: 'from-purple-500 to-pink-500',
    community: 'from-emerald-500 to-blue-500',
    limited: 'from-red-500 to-red-600'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">NFT Collections</h1>
          <p className="text-gray-400 mt-1">Discover and collect exclusive Maris Coin NFTs</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Collections</p>
              <p className="text-2xl font-bold text-white">{collections.length}</p>
            </div>
            <Image className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total NFTs</p>
              <p className="text-2xl font-bold text-white">
                {collections.reduce((sum, col) => sum + col.totalSupply, 0)}
              </p>
            </div>
            <Star className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-white">
                {collections.filter(col => col.status === 'upcoming').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Community</p>
              <p className="text-2xl font-bold text-white">50K+</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-1">
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All Collections' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'minting', label: 'Minting' },
            { key: 'completed', label: 'Completed' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collections Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-6'
      }>
        {filteredCollections.map((collection) => (
          <div
            key={collection.id}
            className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all group ${
              viewMode === 'grid' ? '' : 'flex space-x-6'
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
                  <h3 className="text-xl font-semibold text-white mb-1">{collection.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[collection.status]}`}>
                      {collection.status.replace('-', ' ')}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r text-white font-medium capitalize" 
                          style={{ background: `linear-gradient(to right, ${categoryColors[collection.category].split(' ')[0].replace('from-', '')}, ${categoryColors[collection.category].split(' ')[2].replace('to-', '')})` }}>
                      {collection.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{collection.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Supply</span>
                  <span className="text-white font-semibold">{collection.totalSupply.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Mint Price</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-400 font-semibold">{collection.mintPrice}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Launch Date</span>
                  <span className="text-white font-semibold">{collection.launchDate}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all">
                  {collection.status === 'upcoming' ? 'Notify Me' : 'View Collection'}
                </button>
                <button className="p-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No collections found</h3>
          <p className="text-gray-500">Try selecting a different filter</p>
        </div>
      )}
    </div>
  );
};

export default NFTShowcase;