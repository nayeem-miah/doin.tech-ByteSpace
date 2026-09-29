import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { StarRating } from "@/components/ui/StarRating";
import type { Course } from "@/lib/types";

/**
 * Course artwork and its meta pill row.
 *
 * The thumbnail is shown at its natural 341x195 rather than stretched
 * across the full 1200px: the exported assets are sized for the card,
 * and upscaling them to a banner reads as blur.
 */
export function CourseHero({ course }: { course: Course }) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
      <div className="relative aspect-[341/195] w-full overflow-hidden rounded-sm">
        <Image
          src={course.thumb}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
        <ul className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <li>
            <Badge tone="surface">{course.lessons} Lessons</Badge>
          </li>
          <li>
            <Badge tone="surface">{course.duration}</Badge>
          </li>
          <li>
            <Badge tone="surface">{course.comments} Comments</Badge>
          </li>
        </ul>
      </div>
      <CourseIntro course={course} />
    </div>
  );
}

/** Title / rating / author block that opens the course body. */
export function CourseIntro({ course }: { course: Course }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="t-display-lg max-w-[720px] text-ink">{course.title}</h1>
        <StarRating value={course.rating} size={20} tone="dark" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar src="/assets/avatar-11.png" size={43} alt="purepearl studio" />
        <div>
          <p className="t-body-l text-ink">by {course.author}</p>
          <p className="t-body-s text-subtle">
            {course.students} students  •  {course.reviews} reviews
          </p>
        </div>
      </div>
    </div>
  );
}

/** Price block and the feature list beside the purchase button. */
export function EnrolCard({ course }: { course: Course }) {
  const features = [
    `${course.lessons} lessons and quizzes`,
    `${course.duration} of on-demand video`,
    "Certificate of completion",
    "Lifetime access",
  ];
  return (
    <aside className="rounded-lg border border-line bg-white p-7">
      <p className="flex items-baseline gap-2">
        <span className="t-display-md text-brand">{course.price}</span>
        <span className="t-body-s text-body">{course.period}</span>
      </p>
      <Button href="#" variant="primary" size="lg" className="mt-6 w-full">
        Enroll Now
      </Button>
      <p className="t-body-s mt-3 text-center text-subtle">
        30-day money-back guarantee
      </p>
      <h2 className="t-h-m mt-7 text-ink">This course include</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Icon
              name="check-circle"
              size={20}
              className="mt-0.5 shrink-0 text-brand"
            />
            <span className="t-body-m text-body">{f}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
