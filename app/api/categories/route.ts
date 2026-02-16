import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CATEGORY_CONFIG: Record<
  string,
  { slug: string; label: string; badge: string; icon: string }
> = {
  MTN: { slug: 'mtn', label: 'MTN Data Bundle', badge: 'BEST SELLING', icon: '📱' },
  Telecel: { slug: 'telecel', label: 'Telecel Data', badge: 'FAST DELIVERY', icon: '📱' },
  AT: { slug: 'at', label: 'AT Data Bundle', badge: 'FAST DELIVERY', icon: '📱' },
  AFA: { slug: 'afa', label: 'AFA Registration', badge: 'Register to unlock AFA', icon: '📱' },
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'bundles.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    const bundles = JSON.parse(data) as { network: string }[]
    const networks = [...new Set(bundles.map((b) => b.network))]
    const categories = networks.map((network) => {
      const config = CATEGORY_CONFIG[network] ?? {
        slug: network.toLowerCase(),
        label: network,
        badge: '',
        icon: '📱',
      }
      return { network, slug: config.slug, label: config.label, badge: config.badge, icon: config.icon }
    })
    return NextResponse.json(categories)
  } catch (err) {
    console.error('Categories API error:', err)
    return NextResponse.json(
      { error: 'Failed to load categories' },
      { status: 500 }
    )
  }
}
