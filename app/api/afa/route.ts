import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const AFA_REGISTRATIONS_FILE = path.join(process.cwd(), 'data', 'afa-registrations.json')

/** Normalize Ghana MTN number to 10 digits (05xxxxxxxx) */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').trim()
  if (digits.length === 10 && digits.startsWith('05')) return digits
  if (digits.length === 9 && digits.startsWith('5')) return '0' + digits
  return digits.slice(-10).replace(/^(\d{9})$/, '0$1')
}

function ensureFile() {
  const dir = path.dirname(AFA_REGISTRATIONS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(AFA_REGISTRATIONS_FILE)) {
    fs.writeFileSync(AFA_REGISTRATIONS_FILE, JSON.stringify([], null, 2))
  }
}

interface AfaRegistration {
  phone: string
  registeredAt: string
  name?: string
}

function readRegistrations(): AfaRegistration[] {
  ensureFile()
  const data = fs.readFileSync(AFA_REGISTRATIONS_FILE, 'utf-8')
  try {
    return JSON.parse(data || '[]')
  } catch {
    return []
  }
}

function writeRegistrations(registrations: AfaRegistration[]) {
  ensureFile()
  fs.writeFileSync(AFA_REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2))
}

/** GET ?phone=05XXXXXXXX - check if number is already registered for AFA */
export async function GET(request: NextRequest) {
  try {
    const phone = request.nextUrl.searchParams.get('phone')?.trim()
    if (!phone) {
      return NextResponse.json(
        { error: 'Missing phone number' },
        { status: 400 }
      )
    }
    const normalized = normalizePhone(phone)
    if (normalized.length !== 10 || !normalized.startsWith('05')) {
      return NextResponse.json(
        { error: 'Invalid Ghana MTN number. Use 05 followed by 8 digits.' },
        { status: 400 }
      )
    }

    const registrations = readRegistrations()
    const existing = registrations.find((r) => r.phone === normalized)

    return NextResponse.json({
      registered: !!existing,
      phone: normalized,
      registeredAt: existing?.registeredAt ?? null,
    })
  } catch (err) {
    console.error('AFA status check error:', err)
    return NextResponse.json(
      { error: 'Failed to check AFA status' },
      { status: 500 }
    )
  }
}

/** POST { phone, name? } - register number for AFA (no duplicate) */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const phone = (body.phone as string)?.trim()
    const name = (body.name as string)?.trim() || undefined

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const normalized = normalizePhone(phone)
    if (normalized.length !== 10 || !normalized.startsWith('05')) {
      return NextResponse.json(
        { error: 'Invalid Ghana MTN number. Use 05 followed by 8 digits.' },
        { status: 400 }
      )
    }

    const registrations = readRegistrations()
    const existing = registrations.find((r) => r.phone === normalized)

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        message: 'Already registered for MTN AFA.',
        phone: normalized,
        registeredAt: existing.registeredAt,
      })
    }

    const entry: AfaRegistration = {
      phone: normalized,
      registeredAt: new Date().toISOString(),
      name: name || undefined,
    }
    registrations.push(entry)
    writeRegistrations(registrations)

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      message: 'Successfully registered for MTN AFA.',
      phone: normalized,
      registeredAt: entry.registeredAt,
    })
  } catch (err) {
    console.error('AFA register error:', err)
    return NextResponse.json(
      { error: 'Failed to register for AFA' },
      { status: 500 }
    )
  }
}

