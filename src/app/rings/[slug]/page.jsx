"use client"

import { useParams } from "next/navigation"
import ProductDetail from "@/components/product-details"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug

  console.log("🚀 ProductPage component mounted")
  console.log("📍 URL params:", params)
  console.log("🎯 Extracted slug:", slug)
  console.log("📍 Current URL:", typeof window !== "undefined" ? window.location.href : "SSR")

  return <ProductDetail slug={slug} />
}
