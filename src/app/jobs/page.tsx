'use client';
import { JobsList } from '@/app/jobs/components/JobsList/JobsList';

export default function Home() {
  return (
    <main className="min-h-fit p-4 wrapper-content">
      <JobsList />
    </main>
  );
}
