interface HomeAlertProps {
  message: string
  tone: 'error' | 'warning'
}

const toneStyles: Record<HomeAlertProps['tone'], string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
}

export function HomeAlert({ message, tone }: HomeAlertProps) {
  return (
    <section className="py-6">
      <div className={`rounded-xl border p-4 text-sm ${toneStyles[tone]}`}>{message}</div>
    </section>
  )
}
