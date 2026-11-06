import { Link } from 'react-router-dom'
import { ArrowLeft, PackageSearch } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-28 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C6F36B]/10 text-[#C6F36B]">
          <PackageSearch size={32} />
        </div>
        <span className="mt-6 font-mono text-xs font-bold text-[#C6F36B]">404 ERROR</span>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#F4F4F5]">
          Page Not Found
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[#92929D]">
          The route you navigated to doesn't exist or has moved. Return to the campus directory or check your active dashboard.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" size="sm" icon={ArrowLeft} iconPosition="left">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}