import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const StudentInfographic = lazy(() => import("@/components/student/StudentInfographic"));

export const StudentSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="studenti"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
      aria-labelledby="student-section-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background pointer-events-none" />
      
      <div className="container relative mx-auto px-4">
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <StudentInfographic />
        </Suspense>
      </div>
    </section>
  );
};

export default StudentSection;
