interface FactCardProps {
  badgeLabel: string
  badgeClassName: string
  reliability: string
  reliabilityClassName: string
  statement: string
  noteIcon: string
  noteText: string
}

function FactCard({
  badgeLabel,
  badgeClassName,
  reliability,
  reliabilityClassName,
  statement,
  noteIcon,
  noteText,
}: FactCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${badgeClassName}`}>{badgeLabel}</span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Fiabilité</span>
            <span className={`text-sm font-bold ${reliabilityClassName}`}>{reliability}</span>
          </div>
        </div>

        <p className="text-sm font-medium mb-3">{statement}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="material-symbols-outlined text-xs">{noteIcon}</span>
          <span>{noteText}</span>
        </div>
      </div>
    </div>
  )
}

export function FactCheckSection() {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold mb-3">Vérification des Faits</h2>

      <div className="grid gap-3 lg:grid-cols-2">
        <FactCard
          badgeLabel="Affirmation"
          badgeClassName="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          reliability="8.5/10"
          reliabilityClassName="text-emerald-600"
          statement={`"Le taux de chômage a baissé de 2% dans notre région l'an dernier."`}
          noteIcon="verified"
          noteText="Confirmé par l'INSEE"
        />

        <FactCard
          badgeLabel="Opinion"
          badgeClassName="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          reliability="N/A"
          reliabilityClassName="text-slate-400"
          statement={`"Nous sommes le seul rempart contre le déclin industriel."`}
          noteIcon="info"
          noteText="Subjectif - Rhétorique de campagne"
        />
      </div>
    </section>
  )
}
