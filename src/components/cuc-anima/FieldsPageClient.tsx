"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fieldAudienceFilters,
  fieldImage,
  fieldTypeFilters,
  fieldWorks,
} from "@/data/cuc-anima-fields";
import { siteAssets } from "@/data/cuc-anima";
import type { FieldWork } from "@/types/cuc-anima";

function matchesFilter(work: FieldWork, activeFilter: string | null) {
  if (!activeFilter) return true;
  return work.audienceTag === activeFilter || work.typeTag === activeFilter;
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cuc-fields-filter-pill${active ? " is-active" : ""}`}
    >
      {label}
    </button>
  );
}

export function FieldsPageClient() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<FieldWork | null>(null);

  const visibleWorks = useMemo(
    () => fieldWorks.filter((work) => matchesFilter(work, activeFilter)),
    [activeFilter],
  );

  const closeModal = useCallback(() => setSelectedWork(null), []);

  useEffect(() => {
    if (!selectedWork) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, selectedWork]);

  const toggleFilter = (value: string) => {
    setActiveFilter((current) => (current === value ? null : value));
  };

  return (
    <div
      className="relative min-h-screen text-[#343a40]"
      style={{
        backgroundImage: `url('${siteAssets.logoBg}')`,
        backgroundPosition: "50%",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="cuc-fields-title-section">
        <div className="cuc-fields-inner">
          <h2 className="cuc-fields-heading">领域成果</h2>
        </div>
      </section>

      <section className="cuc-fields-body-section">
        <div className="cuc-fields-inner">
          <div className="cuc-fields-filters">
            <div className="cuc-fields-filter-row">
              <div className="cuc-fields-filter-label">作品分类：</div>
              <div className="cuc-fields-filter-options">
                {fieldAudienceFilters.map((filter) => (
                  <FilterPill
                    key={filter.value}
                    label={filter.label}
                    active={activeFilter === filter.value}
                    onClick={() => toggleFilter(filter.value)}
                  />
                ))}
              </div>
            </div>

            <div className="cuc-fields-filter-row">
              <div className="cuc-fields-filter-label">作品类型：</div>
              <div className="cuc-fields-filter-options">
                {fieldTypeFilters.map((filter) => (
                  <FilterPill
                    key={filter.value}
                    label={filter.label}
                    active={activeFilter === filter.value}
                    onClick={() => toggleFilter(filter.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="cuc-fields-grid">
            {visibleWorks.map((work) => (
              <button
                key={`${work.id}-${work.typeTag}`}
                type="button"
                className="cuc-fields-card"
                onClick={() => setSelectedWork(work)}
              >
                <div className="cuc-fields-card-media">
                  <img
                    src={fieldImage(work.cardImage)}
                    alt={work.title}
                    loading="lazy"
                  />
                </div>
                <div className="cuc-fields-card-tags">
                  <span className="cuc-fields-tag cuc-fields-tag-audience">
                    {work.category1}
                  </span>
                  <span className="cuc-fields-tag cuc-fields-tag-type">
                    {work.category2}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedWork ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
          onClick={closeModal}
        >
          <button
            type="button"
            className="fixed right-[6vw] top-[10vh] z-[130] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-none bg-white text-[22px] font-semibold leading-none"
            aria-label="关闭"
            onClick={closeModal}
          >
            X
          </button>

          <div
            className="relative flex h-[min(80vh,900px)] w-[min(80vw,1400px)] flex-col overflow-auto rounded-xl bg-white p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid h-full grid-cols-1 items-start gap-8 lg:grid-cols-[auto_1fr]">
              <img
                src={fieldImage(selectedWork.popupImage)}
                alt={selectedWork.title}
                className="mx-auto max-h-[min(70vh,720px)] w-auto max-w-full object-contain lg:sticky lg:top-0"
              />
              <div className="min-w-0 text-left">
                <h2 className="mb-2.5 text-[32px] font-black">{selectedWork.title}</h2>
                <div className="mb-10 text-2xl font-bold">{selectedWork.year}</div>

                {selectedWork.credits.length > 0 ? (
                  <div className="mb-5 space-y-3">
                    {selectedWork.credits.map((line) => (
                      <p key={line} className="m-0 text-lg font-medium leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : null}

                {selectedWork.sections.map((section) => (
                  <div key={section.title} className="mb-5">
                    <h4 className="mb-2 text-lg font-bold">{section.title}：</h4>
                    {section.body ? (
                      <div className="space-y-3">
                        {section.body.split("\n").map((line, index) =>
                          line.trim() ? (
                            <p
                              key={`${section.title}-${index}`}
                              className="m-0 text-lg font-medium leading-relaxed"
                            >
                              {line.trim()}
                            </p>
                          ) : null,
                        )}
                      </div>
                    ) : null}
                    {section.qrImage ? (
                      <img
                        src={fieldImage(section.qrImage)}
                        alt={`${selectedWork.title} 播放二维码`}
                        className="mt-2 block max-w-[180px]"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
