function SectionCard({ title, children, extraClass = '' }) {
  return (
    <section className={`section-card ${extraClass}`.trim()}>
      <h2 className="section-card__title">{title}</h2>
      {children}
    </section>
  )
}

export default SectionCard
