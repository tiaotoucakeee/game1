import Image from "next/image";
import Link from "next/link";
import { majorGroups, siteAssets } from "@/data/cuc-anima";

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="relative mx-auto mb-10 flex flex-col items-center md:mb-6">
      <div className="relative flex flex-col items-center md:flex-row">
        <Image
          src={siteAssets.logoBgRed}
          alt=""
          width={75}
          height={75}
          className="relative mb-1 h-14 w-14 md:absolute md:-left-[72px] md:mb-0 md:mt-0.5 md:h-16 md:w-16"
        />
        <h2 className="m-0 text-[28px] font-black capitalize text-cuc-text md:text-[32px]">
          {title}
        </h2>
      </div>
    </div>
  );
}

export function MajorsSection() {
  return (
    <section className="px-5 py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle title="专业介绍" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
          {majorGroups.map((group) => (
            <Link
              key={group.slug}
              href={`/anima/majors/${group.slug}`}
              className="major-card"
            >
              <Image
                src={group.image}
                alt={group.title}
                width={400}
                height={240}
                className="major-card-img"
              />
              <div className="major-card-body">
                <h4 className="major-card-title">{group.title}</h4>
                <div className="major-card-directions-wrap">
                  <ul className="major-card-directions">
                    {group.directions.map((direction) => (
                      <li key={direction.label}>{direction.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
