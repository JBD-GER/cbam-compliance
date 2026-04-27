import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/content";
import { formatArticleDate } from "@/lib/content";
import { getArticleImage } from "@/lib/articleImages";

export function ArticleCard({ article }: { article: Article }) {
  const image = getArticleImage(article);

  return (
    <article className="glass flex h-full flex-col overflow-hidden p-0">
      <Link href={`/ratgeber/${article.slug}`} aria-label={article.title}>
        <Image
          src={image.src}
          alt={image.alt}
          width={1920}
          height={1080}
          className="aspect-[16/9] w-full object-cover transition duration-300 hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <span>{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-tight text-navy">
          <Link href={`/ratgeber/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 flex-1 leading-7 text-slate-600">{article.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm">
          <span className="font-medium text-slate-500">{article.readingTime} Lesezeit</span>
          <Link href={`/ratgeber/${article.slug}`} className="font-semibold text-accent hover:text-[#35685b]">
            Artikel lesen
          </Link>
        </div>
      </div>
    </article>
  );
}
