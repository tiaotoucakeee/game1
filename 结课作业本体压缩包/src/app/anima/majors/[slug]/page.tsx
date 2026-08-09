import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMajorGroupBySlug, majorGroupSlugs } from "@/data/cuc-anima-majors";

export function generateStaticParams() {
  return majorGroupSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getMajorGroupBySlug(slug);
  if (!group) return { title: "专业群介绍" };
  return { title: group.title };
}

export default async function MajorGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getMajorGroupBySlug(slug);
  if (!group) notFound();

  return (
    <div className="major-group-page">
      <div className="major-group-page-inner">
        <Link href="/anima" className="major-group-back">
          ← 返回学院主页
        </Link>

        <div className="major-group-hero">
          <Image
            src={group.image}
            alt={group.title}
            width={900}
            height={420}
            className="major-group-hero-image"
            priority
          />
        </div>

        <h1 className="major-group-title">{group.title}</h1>
        <p className="major-group-intro">{group.intro}</p>

        <div className="major-group-blocks">
          <section>
            <h2 className="major-group-section-title">包含方向</h2>
            <ul className="major-group-direction-list">
              {group.directions.map((direction) => (
                <li key={direction.label}>{direction.label}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="major-group-section-title">培养侧重</h2>
            <ul className="major-group-highlight-list">
              {group.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
