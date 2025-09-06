// src/components/dashboard/NFTShowcase.tsx
import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  ExternalLink,
  Home,
  Users,
  Coins,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { getApp } from "firebase/app";
import emailjs from "@emailjs/browser";

// 🔹 Firestore reference
const db = getFirestore(getApp());

interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  totalSupply: number;
  mintPrice: string;
  launchDate: string;
  status: "upcoming" | "minting" | "sold-out" | "completed";
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
}

const NFTShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "minting" | "completed"
  >("all");
  const [submitting, setSubmitting] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);

  // 🔹 NFT Collections
  const collections: NFTCollection[] = [
    {
      id: "1",
      name: "Cybernetic Souls",
      description:
        "A futuristic NFT series depicting human-machine hybrids that explore the boundaries of consciousness and AI evolution.",
      image: "/nft/cybernetic-souls.png",
      totalSupply: 5000,
      mintPrice: "23.99 USDT",
      launchDate: "2026-Q1",
      status: "upcoming",
      rarity: "common",
    },
    {
      id: "2",
      name: "Pixel Paladins",
      description:
        "Retro-inspired pixel warriors fighting for justice in the digital frontier, representing the roots of gaming culture.",
      image: "/nft/pixel-paladins.png",
      totalSupply: 3000,
      mintPrice: "119.99 USDT",
      launchDate: "2026-Q1",
      status: "upcoming",
      rarity: "rare",
    },
    {
      id: "3",
      name: "Mechanical Titans",
      description:
        "Massive robotic giants forged from steel and energy, showcasing the raw power of mechanized evolution.",
      image: "/nft/mechanical-titans.png",
      totalSupply: 1500,
      mintPrice: "249.99 USDT",
      launchDate: "2026-Q1",
      status: "upcoming",
      rarity: "epic",
    },
    {
      id: "4",
      name: "The Genesis Code",
      description:
        "The first secret key collection in MarisCoin, symbolizing the foundation of our blockchain legacy.",
      image: "/nft/the-genesis-code.png",
      totalSupply: 400,
      mintPrice: "1200 USDT",
      launchDate: "2026-Q1",
      status: "upcoming",
      rarity: "legendary",
    },
    {
      id: "5",
      name: "Quantum Vanguard",
      description:
        "Cutting-edge warriors of the quantum realm, representing the ultimate fusion of science and imagination.",
      image: "/nft/quantum-vanguard.png",
      totalSupply: 100,
      mintPrice: "2400 USDT",
      launchDate: "2026-Q1",
      status: "upcoming",
      rarity: "mythic",
    },
  ];

  const filteredCollections =
    filter === "all"
      ? collections
      : collections.filter((c) => c.status === filter);

  // 🔹 Status styles
  const statusClasses = {
    upcoming: "bg-sky-500/20 text-sky-300",
    minting: "bg-emerald-500/20 text-emerald-300",
    "sold-out": "bg-red-500/20 text-red-300",
    completed: "bg-white/20 text-white/70",
  };

  // 🔹 Rarity gradients
  const rarityGradients = {
    common: "from-gray-500 to-gray-700",
    rare: "from-blue-500 to-indigo-500",
    epic: "from-purple-500 to-pink-500",
    legendary: "from-amber-500 to-orange-600",
    mythic: "from-red-600 to-red-800",
  };

  // Scroll to form
  const handleNotifyClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Basit email doğrulama
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // 🔹 Submit Handler (DÜZELTİLMİŞ)
  const handlePreOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const nftName = (formData.get("nftName") as string)?.trim();
    const quantity = Number(formData.get("quantity"));
    const email = (formData.get("email") as string)?.trim();

    if (!nftName || !email || !isValidEmail(email) || !quantity || quantity < 1) {
      alert("Please provide a valid NFT, quantity and email.");
      setSubmitting(false);
      return;
    }

    const selectedNFT = collections.find((n) => n.name === nftName);

    // 🔹 Email'de görünecek görsel için tam URL
    const baseURL = "https://app.mariscoin.com";
    const nftImageURL = selectedNFT?.image?.startsWith("http")
      ? selectedNFT.image
      : `${baseURL}${selectedNFT?.image ?? ""}`;

    const serviceID = "service_2gagejf";
    const templateID = "template_em090ut";
    const publicKey = "_JXB9BbdlHA2IARH3";

    try {
      // Firestore kaydı
      await addDoc(collection(db, "pre-orders"), {
        nftName,
        quantity,
        email,
        createdAt: Timestamp.now(),
      });

      // EmailJS gönderim
      await emailjs.send(
        serviceID,
        templateID,
        {
          nft_name: nftName,
          nft_image: nftImageURL,
          quantity: quantity,
          user_email: email, // ✅ Şablonda {{user_email}} ile eşleşiyor
        },
        publicKey
      );

      alert("✅ Pre-order submitted successfully! Please check your email.");

      formRef.current?.querySelector("form")?.reset();
    } catch (err: any) {
      console.error("❌ Pre-order error:", err);
      const msg = err?.text || "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
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
          {/* Collections */}
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition hover:border-emerald-500/40 backdrop-blur-md group`}
              >
                <div
                  className={
                    viewMode === "grid"
                      ? "aspect-square"
                      : "w-48 h-48 flex-shrink-0"
                  }
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {collection.name}
                    </h3>
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${statusClasses[collection.status]}`}
                      >
                        {collection.status.replace("-", " ")}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full text-white font-medium capitalize bg-gradient-to-r ${rarityGradients[collection.rarity]}`}
                      >
                        {collection.rarity}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      {collection.description}
                    </p>

                    {/* NFT Extra Info */}
                    <div className="space-y-1 text-sm text-white/70 mb-4">
                      <div className="flex justify-center gap-2 items-center">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>Supply: {collection.totalSupply}</span>
                      </div>
                      <div className="flex justify-center gap-2 items-center">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span>Price: {collection.mintPrice}</span>
                      </div>
                      <div className="flex justify-center gap-2 items-center">
                        <Calendar className="w-4 h-4 text-sky-400" />
                        <span>Launch: {collection.launchDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={handleNotifyClick}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-lg hover:from-emerald-600 hover:to-sky-600 transition"
                    >
                      {collection.status === "upcoming"
                        ? "Notify Me"
                        : "View Collection"}
                    </button>
                    <button className="p-2 border border-white/20 text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition">
                      <ExternalLink className="w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pre-order form */}
          <div
            ref={formRef}
            className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Pre-Order Form
            </h2>
            <form
              onSubmit={handlePreOrderSubmit}
              className="space-y-4 max-w-lg mx-auto"
            >
              <div>
                <label className="block text-sm mb-1">Select NFT</label>
                <select
                  name="nftName"
                  className="w-full p-2 rounded bg-black/40 border border-white/20"
                  required
                >
                  <option value="">-- Choose NFT --</option>
                  {collections.map((nft) => (
                    <option key={nft.id} value={nft.name}>
                      {nft.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  defaultValue="1"
                  className="w-full p-2 rounded bg-black/40 border border-white/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 rounded bg-black/40 border border-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 rounded bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Submitting..." : "Submit Pre-Order"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NFTShowcase;
