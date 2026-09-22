import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { AppSiteHeader } from '../components/AppSiteHeader'
import { MobileAppNav } from '../components/MobileAppNav'
import { HomeDesktopFooter } from '../features/candidates/home/components/HomeDesktopFooter'
import { PoliticalQuiz } from '../features/quiz/components/PoliticalQuiz'
import { decodeAnswers } from '../features/quiz/quizEngine'
import { QUIZ_UPDATED_AT, quizQuestions } from '../data/quizData.js'
import { appNavItems } from '../navigation/appNavItems'
import { quizRouteSeo } from '../seo/appRoutesSeo.js'
import { SeoHead } from '../seo/SeoHead'
import { buildCanonicalUrl } from '../seo/site'

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const { candidateId } = useParams<{ candidateId?: string }>()
  const initialAnswers = useMemo(() => decodeAnswers(searchParams.get('r')), [searchParams])
  const isSharedResult = initialAnswers !== null && Boolean(candidateId)

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <SeoHead
        title={quizRouteSeo.title}
        description={quizRouteSeo.description}
        path={isSharedResult ? `/quiz/resultat/${candidateId}/` : quizRouteSeo.path}
        keywords={quizRouteSeo.keywords}
        noindex={isSharedResult}
        image={isSharedResult ? `/quiz/cards/${candidateId}.jpg` : '/quiz/cards/quiz.jpg'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Quiz présidentielle 2027',
          description: quizRouteSeo.description,
          url: buildCanonicalUrl(quizRouteSeo.path),
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web',
          inLanguage: 'fr-FR',
          dateModified: QUIZ_UPDATED_AT,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        }}
      />

      <AppSiteHeader containerClassName="w-full" />

      <main className="w-full space-y-8 px-4 py-8 pb-28 md:pb-16">
        <section id="quiz" className="scroll-mt-24">
          <PoliticalQuiz variant="page" initialAnswers={initialAnswers} />
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Méthode</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Quiz présidentielle 2027 : quel candidat vous correspond ?</h1>
          <div className="mt-4 grid gap-6 text-sm leading-relaxed text-slate-600 lg:grid-cols-2">
            <div>
              <p>
                Le quiz vous soumet {quizQuestions.length} affirmations sur les grands clivages de la campagne : immigration, retraites, énergie, fiscalité,
                Europe, sécurité, institutions, budget, salaires, laïcité, défense, écologie et services publics. Vous répondez sur une échelle en quatre
                niveaux, ou passez la question.
              </p>
              <p className="mt-3">
                Chaque candidat déclaré est positionné sur la même échelle (de -2 à +2) à partir de son programme, de ses votes et de ses déclarations
                publiques, documentés dans sa fiche. La compatibilité est la proximité moyenne entre vos réponses et ses positions : 100 % signifie que vous
                êtes exactement sur la même ligne partout, 50 % que vous êtes à mi-chemin en moyenne.
              </p>
            </div>
            <div>
              <p>
                Le profil affiché (« Souverainiste social », « Libéral décontracté »…) est un clin d’œil : il résume votre position sur deux axes,
                économique (redistribution ou rigueur) et sociétal (ouverture ou ordre). Il ne prétend pas vous classer définitivement.
              </p>
              <p className="mt-3">
                Aucune réponse n’est enregistrée sur nos serveurs : votre résultat est encodé dans le lien de partage, que vous seul décidez de diffuser.
                Positions mises à jour le {new Date(`${QUIZ_UPDATED_AT}T12:00:00Z`).toLocaleDateString('fr-FR')}. Une erreur ? Signalez-la, elle sera
                corrigée avec sa source.
              </p>
            </div>
          </div>
          <h2 className="mt-8 text-lg font-black tracking-tight text-slate-950">Les {quizQuestions.length} affirmations du quiz</h2>
          <ol className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {quizQuestions.map((question, index) => (
              <li key={question.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                <span className="mr-2 text-xs font-black text-primary">{index + 1}.</span>
                <span className="font-semibold text-slate-500">{question.theme} — </span>
                {question.statement}
              </li>
            ))}
          </ol>
        </section>
      </main>

      <MobileAppNav items={appNavItems} />
      <HomeDesktopFooter />
    </div>
  )
}
