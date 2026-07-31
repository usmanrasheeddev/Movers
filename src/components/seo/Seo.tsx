import { Helmet } from 'react-helmet-async'

type SeoProps = {
  title: string
  description?: string
  canonicalPath?: string
}

export function Seo({ title, description, canonicalPath }: SeoProps) {
  const canonical = canonicalPath
    ? `${window.location.origin}${canonicalPath}`
    : undefined

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </Helmet>
  )
}
