interface ProfileSectionHeadingProps {
  icon: string
  title: string
}

export function ProfileSectionHeading({ icon, title }: ProfileSectionHeadingProps) {
  return (
    <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      {title}
    </h3>
  )
}
