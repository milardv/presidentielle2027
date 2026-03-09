import { MobileAppNav } from '../../../components/MobileAppNav'
import { appNavItems } from '../../../navigation/appNavItems'

export function AnalysisMobileNav() {
  return <MobileAppNav items={appNavItems} className="bg-white dark:bg-slate-900 px-4" />
}
