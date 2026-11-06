import { Link } from 'react-router-dom'
import {
  Shield,
  HeartHandshake,
  Compass,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  PackageSearch
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/common/Button'

export default function About() {
  const values = [
    {
      title: 'Decentralized Student Trust',
      desc: 'Removing bureaucratic friction and administrative bottlenecks. Students help students recover critical academic essentials directly and safely.',
      icon: HeartHandshake,
    },
    {
      title: 'Zero Friction Reporting',
      desc: 'No account creation or multi-factor barrier required. Publish an incident report or search the catalog in under 60 seconds.',
      icon: Clock,
    },
    {
      title: 'Verification Protocols',
      desc: 'Encouraging safety-first handovers at verified campus information desks, libraries, and security outposts with unique trait validation.',
      icon: Shield,
    },
  ]

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
        {/* Header Block */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/25 bg-[#C6F36B]/[0.08] px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C6F36B]">
            <Compass size={13} />
            <span>Campus Mission</span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#F4F4F5] sm:text-5xl">
            Reconnecting Campus Life<span className="text-[#C6F36B]">.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#92929D]">
            CampusFind is an open recovery network engineered to solve the everyday headache of lost belongings across lecture halls, dining areas, study pods, and research labs.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((val, idx) => {
            const Icon = val.icon
            return (
              <div
                key={idx}
                className="rounded-3xl border border-white/[0.08] bg-[#141418] p-7 transition hover:border-[#C6F36B]/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C6F36B]/10 text-[#C6F36B]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-[#F4F4F5]">
                  {val.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#92929D]">
                  {val.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* How The Protocol Operates */}
        <div className="mt-16 rounded-3xl border border-white/[0.08] bg-[#141418] p-8 sm:p-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6F36B]">
              Handover Framework
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-[#F4F4F5] sm:text-3xl">
              Safe & Transparent Campus Return Protocol
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#92929D]">
              To protect both item finders and claimants, our protocol adheres to three basic tenets:
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                bold: '1. Trait Proofing:',
                text: 'Claimants should provide partial serial numbers, lock screen imagery, internal bag contents, or receipts before meeting.',
              },
              {
                bold: '2. Neutral Ground:',
                text: 'Always schedule physical handovers in high-visibility campus spots—such as the Central Library Front Desk or Student Union Lounge.',
              },
              {
                bold: '3. Status Resolution:',
                text: 'Once the exchange is made, update the listing status to Resolved in your dashboard so peers know the item is recovered.',
              },
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-[#1C1C22]/50 p-4 text-xs text-[#92929D]">
                <CheckCircle2 size={16} className="text-[#C6F36B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F4F4F5]">{rule.bold}</strong> {rule.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact & Support */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-[#141418] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-[#C6F36B]">
              <Mail size={18} />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#F4F4F5]">
              Campus Security Liaison
            </h3>
            <p className="mt-1 text-xs text-[#92929D]">
              For high-value recoveries (government IDs, credit cards, or registered keys), notify security directly.
            </p>
            <p className="mt-4 font-mono text-xs text-[#C6F36B]">
              safety@campus.university.edu
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#141418] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-[#C6F36B]">
              <MapPin size={18} />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#F4F4F5]">
              Central Lost & Found Desk
            </h3>
            <p className="mt-1 text-xs text-[#92929D]">
              Physical items can be deposited at the Student Union Concierge desk during normal operating hours.
            </p>
            <p className="mt-4 text-xs text-[#92929D]">
              Mon - Fri • 08:00 AM – 08:00 PM
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/browse">
            <Button variant="primary" size="md" icon={ArrowRight}>
              Explore Campus Directory
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}