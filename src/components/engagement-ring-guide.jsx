"use client";

import React from "react";
import Image from "next/image";

const EngagementRingGuide = () => {
  const ringStyles = [
    {
      name: "Solitaire",
      image: "https://assets.ajio.com/medias/sys_master/root/20210918/eiy7/6144e20caeb269a26896cc2d/-473Wx593H-462975711-gold-MODEL.jpg", 
      description:
        "The solitaire is the most classic engagement ring design, featuring a single center diamond that takes the spotlight. With no distractions, the beauty of the stone truly shines. Ideal for someone who appreciates simplicity, tradition, and timeless elegance.",
      bestFor: "Minimalists, classic romantics, or anyone who wants their diamond to do all the talking.",
    },
    {
      name: "Nature Inspired",
      image: "https://assets.ajio.com/medias/sys_master/root/20210918/eiy7/6144e20caeb269a26896cc2d/-473Wx593H-462975711-gold-MODEL.jpg", 
      description:
        "Nature-inspired rings bring the beauty of the outdoors to your finger with floral motifs, vine-like bands, leaf patterns, or petals embracing the center stone. These rings blend artistry with natural elements — perfect for the dreamers and nature lovers.",
      bestFor: "Nature enthusiasts, free spirits, or anyone drawn to elegance and detail.",
    },
    {
      name: "Three-Stone",
      image: "https://assets.ajio.com/medias/sys_master/root/20210918/eiy7/6144e20caeb269a26896cc2d/-473Wx593H-462975711-gold-MODEL.jpg", 
      description:
        "The three-stone ring symbolizes the past, present, and future, featuring three diamonds that represent a lifelong journey. This design offers a balanced elegance with a touch of sophistication.",
      bestFor: "Those who value symbolism and a meaningful representation of their relationship.",
    },
    {
      name: "Accented",
      image: "https://assets.ajio.com/medias/sys_master/root/20210918/eiy7/6144e20caeb269a26896cc2d/-473Wx593H-462975711-gold-MODEL.jpg", 
      description:
        "Accented rings feature a center stone enhanced by smaller surrounding diamonds, adding sparkle and intricacy. This style combines boldness with delicate detailing for a stunning effect.",
      bestFor: "Those who love a mix of boldness and refinement in their jewelry.",
    },
    {
      name: "Bezel",
      image: "https://assets.ajio.com/medias/sys_master/root/20210918/eiy7/6144e20caeb269a26896cc2d/-473Wx593H-462975711-gold-MODEL.jpg", 
      description:
        "The bezel ring features a sleek metal rim that secures the center stone, offering a modern and secure design. Its clean lines make it both stylish and durable.",
      bestFor: "Modern minimalists or those seeking a contemporary, low-profile look.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-stone-100 to-white text-black">
      {/* Header Section */}
      <div className="relative w-full h-96 bg-blue-100">
        <img
          src="https://images.pexels.com/photos/6632216/pexels-photo-6632216.jpeg" 
          alt="Engagement Ring Guide Header"
          
          
          className="h-96 w-full object-center object-cover "
        />
        {/* <Image
          src="https://example.com/engagement-guide-header.jpg" 
          alt="Engagement Ring Guide Header"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-serif text-white font-bold drop-shadow-lg">
            GUIDE TO <span className="text-yellow-300">ENGAGEMENT RINGS</span>
          </h1>
        </div>
      </div>

      {/* Ring Styles Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-5 gap-6 mb-12">
          {ringStyles.map((style) => (
            <div key={style.name} className="text-center">
              <img
                  src={style.image}
                  alt={`${style.name} Ring`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover shadow-2xl"
                />
              <p className="text-sm font-medium">{style.name}</p>
            </div>
          ))}
        </div>
          <hr className="m-10"/>
        {/* Detailed Descriptions */}
        <div className="grid grid-cols-1  gap-12">
          {ringStyles.map((style, index) => (
            <div
              key={style.name}
              className={`flex w-full flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-6`}
            >
              <div className="w-full md:w-1/3">
                <img
                  src={style.image}
                  alt={`${style.name} Ring`}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-2xl object-cover"
                />
                {/* <Image
                  src={style.image}
                  alt={`${style.name} Ring`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                /> */}
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-5xl font-serif font-bold mb-2">{style.name}</h2>
                <p className="text-gray-600 mb-4 text-2xl">{style.description}</p>
                <p className="text-sm text-gray-500 italic">Best for: {style.bestFor}</p>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngagementRingGuide;