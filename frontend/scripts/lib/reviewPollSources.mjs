// Source reviewed on 2026-10-12: the report documents fieldwork on September
// 22–24, not October 6–8. Do not import the misdated duplicate from Wikipedia.
const SEPTEMBER_HARRIS_REPORT = 'https://tolunacorporate.com/wp-content/uploads/2026/09/Rapport-Toluna-Barometre-Presidentielle-2027-Vague-6-M6-RTL-28-septembre-2026.pdf'

export function reviewPollSources(studies) {
  return studies.filter((study) => {
    const valid = study.sourceUrl !== SEPTEMBER_HARRIS_REPORT
      || (study.fieldworkStart === '2026-09-22' && study.fieldworkEnd === '2026-09-24')
    if (!valid) console.warn(`Excluded ${study.id}: fieldwork dates do not match the source report.`)
    return valid
  })
}
