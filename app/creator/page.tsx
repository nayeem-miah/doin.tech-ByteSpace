import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseCard } from "@/components/ui/CourseCard";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/icons";
import { StarRating } from "@/components/ui/StarRating";
import { courses } from "@/lib/data";

export const metadata: Metadata = { title: "Creator" };

const creatorStats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "4.7", label: "Rating" },
];

export default function CreatorPage() {
  return (
    <>
      <PageHeader title="Inspired Creator" />

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-20">
          {/* Profile card */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="flex flex-col items-center gap-5 lg:w-[320px]">
              <Avatar
                src="/assets/avatar-15.png"
                size={180}
                alt="PurePearl Studio"
                className="border-4 border-white shadow-e3"
              />
              <div className="text-center">
                <h1 className="t-display-md text-ink">PurePearl Studio</h1>
                <p className="t-body-l mt-1 text-body">by purepearl studio</p>
                <div className="mt-3 flex justify-center">
                  <StarRating value={4.7} tone="dark" />
                </div>
              </div>
              <a
                href="#"
                className="press t-h-s inline-flex items-center gap-2 rounded-full border border-brand px-6 py-2.5 text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
              >
                <Icon name="users" size={18} />
                Follow
              </a>
            </div>

            <div className="flex-1">
              <h2 className="t-h-l text-ink">About</h2>
              <p className="t-body-l mt-4 max-w-[70ch] text-body">
                At ByteSpace, we believe in empowering individuals and
                organisations through knowledge. We ignite opportunity by setting
                the world on fire with inspiration, empowering creators, and
                building tools that make learning and teaching on the internet
                more accessible than ever before.
              </p>

              <dl className="mt-10 flex gap-14">
                {creatorStats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="t-display-md block text-brand">
                        {s.value}
                      </span>
                      <span className="t-body-l mt-1 block text-body">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <h2 className="t-h-l mt-14 text-ink">Published Courses</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {courses.slice(0, 3).map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
